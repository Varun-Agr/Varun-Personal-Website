"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const NODE_COUNT = 90;
const CONNECT_DIST = 2.5;
const DRIFT_SPEED = 0.003;
const SPREAD_X = 16;
const SPREAD_Y = 5;

export default function NetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Node data
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * SPREAD_X;
      positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
      positions[i3 + 2] = (Math.random() - 0.5) * 1.5;
      velocities[i3] = (Math.random() - 0.5) * DRIFT_SPEED;
      velocities[i3 + 1] = (Math.random() - 0.5) * DRIFT_SPEED;
      velocities[i3 + 2] = (Math.random() - 0.5) * DRIFT_SPEED * 0.2;
    }

    // Nodes as small spheres for visibility
    const nodeGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.2,
    });
    const nodeMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      const i3 = i * 3;
      mesh.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    }
    scene.add(nodeGroup);

    // Larger glow points on top
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0x4ade80,
      size: 0.15,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });
    const glowPoints = new THREE.Points(pointsGeo, pointsMat);
    scene.add(glowPoints);

    // Edges
    const MAX_EDGES = NODE_COUNT * 10;
    const linePositions = new Float32Array(MAX_EDGES * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Drift
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        if (Math.abs(positions[i3]) > SPREAD_X * 0.5) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > SPREAD_Y * 0.5) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 1.5) velocities[i3 + 2] *= -1;

        nodeMeshes[i].position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      }

      // Update glow points
      const gpArr = glowPoints.geometry.attributes.position.array as Float32Array;
      gpArr.set(positions);
      glowPoints.geometry.attributes.position.needsUpdate = true;

      // Build edges
      let edgeCount = 0;
      const lp = lineGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < NODE_COUNT && edgeCount < MAX_EDGES; i++) {
        for (let j = i + 1; j < NODE_COUNT && edgeCount < MAX_EDGES; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECT_DIST) {
            const off = edgeCount * 6;
            lp[off] = positions[i3];
            lp[off + 1] = positions[i3 + 1];
            lp[off + 2] = positions[i3 + 2];
            lp[off + 3] = positions[j3];
            lp[off + 4] = positions[j3 + 1];
            lp[off + 5] = positions[j3 + 2];
            edgeCount++;
          }
        }
      }

      // Clear remaining
      for (let i = edgeCount * 6; i < lp.length; i++) lp[i] = 0;

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, edgeCount * 2);

      // Slow rotation for depth feel
      nodeGroup.rotation.y += 0.0003;
      glowPoints.rotation.y += 0.0003;
      lines.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
