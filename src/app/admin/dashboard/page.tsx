'use client'
import Image from 'next/image';
import { CookiesName } from '@/app/lib/consts';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export default function DashBoard() {
    const [userMenu,setUserMenu] = useState(false)
    const [cookies, setCookie] = useCookies([CookiesName.roocketToken,CookiesName.roocketUser])
    const router = useRouter()
    const userMenuHandler = ()=>{
        setUserMenu(!userMenu)
    }
    const signoutHandler = ()=>{
        setCookie(CookiesName.roocketToken,null, { path: '/' })
        setCookie(CookiesName.roocketUser,null, { path: '/' })
        router.push("/")
    }
    
     return (
    

        <section className="bg-gradient-to-r from-slate-300 to-slate-500 dark:bg-gray-900 h-screen">
            <nav className="fixed top-0  z-50 w-full h-10 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-start">
                        <div className="flex flex-col items-center justify-start ml-3 mt-1">
                            <div className="flex">
                            <button type="button" onClick={userMenuHandler} className="flex text-sm bg-gray-800 rounded-full  focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                <span className="sr-only">Open user menu</span>
                                <Image width={10} height={10} className="w-8 h-8 rounded-full" src="/profile-picture-5.jpg" alt="user photo"/>
                            </button>

                            </div>
                            <div className={`z-50 ${!userMenu && `hidden`} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} id="dropdown-user">
                            <div className="px-4 py-3" role="none">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                {Cookies.get(CookiesName.roocketUser)}
                                </p>
                            </div>
                            <ul className="py-1" role="none">
                                <li>
                                <a href="#" onClick={signoutHandler} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                </div>
            </nav>
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s programming</h1>
                <p className="mb-8 text-lg font-normal text-gray-800 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here at Roocket we focus on programming training where technology, innovation, and capital can unlock long-term value and drive IT growth.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <a href="https://roocket.ir" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        Get started
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                    <a href="https://roocket.ir" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70">
                        Learn more
                    </a>  
                </div>
            </div>
        </section>
        
          )
}