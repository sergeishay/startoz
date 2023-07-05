'use client'

import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import Link from 'next/link'



const links = [
    {
        id: 1,
        title: "Co Founders",
        url: "/co-founders",
    },
    {
        id: 2,
        title: "Entrepreneurs",
        url: "/entrepreneurs",
    },
    {
        id: 3,
        title: "Investors",
        url: "/investors",
    },
    {
        id: 4,
        title: "Services",
        url: "/services",
    },
    {
        id: 5,
        title: "About",
        url: "/about",
    },
    {
        id: 6,
        title: "Community",
        url: "/community",
    },
    {
        id: 7,
        title: "Contact Us",
        url: "/contact-us",
    },
];




const SideBar = () => {
    const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    const handleCloseSideBar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false);
        }
    }


    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10" style={{ zIndex: '1000' }}>
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">

                        <button type="button" onClick={() => { setActiveMenu((prevActiveMenu) => !prevActiveMenu) }} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
                            <MdOutlineCancel />
                        </button>

                    </div>
                    <div className="mt-10">
                        {links.map((link) => (
                            <Link key={link.id} href={link.url} className="flex justify-center " >
                                <p className='p-2 text-primary-gray hover:text-primart-turkiz selection:text-primary-turkiz '>
                                    {link.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div >
    )
}

export default SideBar

    // < div className = "ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10" style = {{ zIndex: '1000' }}>
    //     { activeMenu && (
    //         <>
    //             <div className="flex justify-between items-center">

    //                 <button type="button" onClick={() => { setActiveMenu((prevActiveMenu) => !prevActiveMenu) }} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
    //                     <MdOutlineCancel />
    //                 </button>

    //             </div>
    //             <div className="mt-10">
    //                 {links.map((link) => (
    //                     <Link key={link.id} href={link.url} className="flex justify-center " >
    //                         <p className='p-2 text-primary-gray hover:text-primart-turkiz selection:text-primary-turkiz '>
    //                             {link.title}
    //                         </p>
    //                     </Link>
    //                 ))}
    //             </div>
    //         </>
    //     )}
    // </div >