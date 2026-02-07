"use client";

import { useState } from "react";
import Logo from "../logo";
import Link from "next/link";

const Header = () => {
    return (
        <header className="navbar top-0 left-0 z-999 w-full sticky bg-white">
            <div className="container">
                <nav className="py-7">
                    <div className="flex items-center gap-4 sm:gap-8">
                        <div>
                            <Link href="#home">
                                <strong>
                                    <h4>Varun Agrawal</h4>
                                </strong>
                            </Link>
                        </div>

                        {/* navbar links */}
                        <div className="flex items-center gap-4">
                            <Link href="#projects">Projects</Link>
                            <Link href="#contact">Contact</Link>
                            <Link href="https://secureaifutureslab.com">SAFL</Link>
                            <Link href="https://indiaaitracker.com">India AI Tracker</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
