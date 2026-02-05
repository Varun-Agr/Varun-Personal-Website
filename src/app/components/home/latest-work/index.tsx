"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LatestWork = () => {
  const [workData, setWorkData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/work-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorkData(data?.workData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="projects">
      <div className="bg-softGray">
        <div className="container">
          <div className="py-16 xl:py-32 ">
            <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
              <h2>My Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12 xl:gap-y-16">
              {workData?.map((value: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="group block"
                  >
                    <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden bg-gray-100 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:shadow-2xl">
                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={getImgPath(value?.image)}
                          alt={value?.title}
                          fill
                          className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>

                      {/* Title overlay - always visible */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/70">
                        <div className="p-6">
                          <h5 className="text-white font-bold mb-2">{value?.title}</h5>

                          {/* Description - only visible on hover */}
                          <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-in-out">
                            <p className="text-white text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              {value?.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestWork;
