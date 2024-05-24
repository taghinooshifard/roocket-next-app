'use client';
import React, { MouseEventHandler } from 'react'
import { PageAddress } from '../../layout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { log } from 'console';
interface Props{
    menuTitle:string;
    children:React.ReactNode;
    clickButtonHandler?:MouseEventHandler<HTMLAnchorElement>;

}
function SideBarMenuItem(props:Props) {
    let currentPath = usePathname();
    
    
  return (
    <li>
    <Link href={props.menuTitle} onClick={props.clickButtonHandler ? props.clickButtonHandler: ()=>{}}  className={`flex items-center w-full text-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${(currentPath.split('/')[2]==props.menuTitle) && `bg-blue-400`}`}>
      {props.children}
      <span  className="ms-3">{props.menuTitle}</span>
    </Link>
    </li>
  )
}

export default SideBarMenuItem