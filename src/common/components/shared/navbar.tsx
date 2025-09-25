'use client'
import { SanityLogo } from '@/common/assets/images';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`sticky top-0 w-full z-20 transition-all duration-300 ${scrolled
            ? 'bg-white backdrop-blur-3xl shadow-lg'
            : 'bg-transparent'
            }`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={SanityLogo} width={92} height={32} className={`h-8 px-5 py-2 rounded-xl  ${scrolled ? 'bg-black' : 'bg-transparent'}`} alt="Flowbite Logo" />
                    <span className={`self-center text-2xl font-semibold whitespace-nowrap transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'
                        }`}></span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className={`hidden md:block font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 ${scrolled
                            ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                            : 'text-blue-600 bg-white hover:bg-white/90'
                            }`}
                    >
                        Get started
                    </button>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 transition-colors duration-300 ${scrolled ? 'bg-white/90 md:bg-transparent' : 'bg-transparent'
                        }`}>
                        <li>
                            <a href="#" className={`block py-2 px-3 rounded-sm md:p-0 transition-colors duration-300 ${scrolled
                                ? 'text-blue-600 hover:text-blue-700'
                                : 'text-white hover:text-blue-200'
                                }`} aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className={`block py-2 px-3 rounded-sm md:p-0 transition-colors duration-300 ${scrolled
                                ? 'text-gray-800 hover:text-blue-600'
                                : 'text-white/90 hover:text-white'
                                }`}>About</a>
                        </li>
                        <li>
                            <a href="#" className={`block py-2 px-3 rounded-sm md:p-0 transition-colors duration-300 ${scrolled
                                ? 'text-gray-800 hover:text-blue-600'
                                : 'text-white/90 hover:text-white'
                                }`}>Services</a>
                        </li>
                        <li>
                            <a href="#" className={`block py-2 px-3 rounded-sm md:p-0 transition-colors duration-300 ${scrolled
                                ? 'text-gray-800 hover:text-blue-600'
                                : 'text-white/90 hover:text-white'
                                }`}>Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
