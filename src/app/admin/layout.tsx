'use client';
import React, { MouseEventHandler, useState } from 'react'
import MobileMenu from '@/app/admin/components/menus/MobileMenu';
import SideBarMenu from '@/app/admin/components/menus/SideBarMenu';
import { useRouter } from 'next/navigation';


export enum PageAddress{
    DashBoard="/admin/dashboard",
    Posts="/admin/posts"
}

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const[showSideBar,setShowSideBar] = useState<boolean>(true)

    const mobileMenuHandler:MouseEventHandler<HTMLButtonElement> = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>):void=>{
            setShowSideBar(!showSideBar);
    }
    const closeButtonHandler:MouseEventHandler<HTMLAnchorElement> = (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>):void=>{
        event.preventDefault();
        setShowSideBar(!showSideBar);
    }
    
    return (
        
       <>
        <div className="flex">
        
        <MobileMenu mobileMenuHandler={mobileMenuHandler}/>
            <div className={`w-full h-screen ${ !showSideBar && `ml-52`} `}>
             <div className=" border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                    {children}
                                    
              </div>
            </div>
        </div>
        <SideBarMenu    closeButtonHandler={closeButtonHandler} showSideBar={showSideBar}/>
      
       </>
    );
  }