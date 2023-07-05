'use client';


import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from "next/navigation"

// import logo from '../public/assets'
import Image from 'next/image';
import Button from './Button';
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
const Nav = () => {
    const router = useRouter()
    const { data: session, status } = useSession();
    const isUserLoggedIn = false;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(() => {
        if (status === "authenticated") {
          // Check if it's the user's first visit
          if (session.user.isFirstVisit) {
            // If it's the user's first visit, redirect to the onboarding page
            router.push('/on-boarding');
          } else {
            // If it's not the user's first visit, redirect to the profile page
            router.push('/profile');
          }
        }
      }, [status, session]);
    // useEffect(() => {
    //     const setUpProviders = async () => {
    //       const response = await getProviders()
    //       setProviders(response);
    //     }
    //     setUpProviders()
    //   }, [])



    return (
        <header className="bg-white shadow-[#000000] w-full align-center justify-center z-100" >
            <nav className='flex flex-1 justify-between align-center flex-column bg-white shadow-md p-3'>
                <div className='flex flex-row justify-start'>
                    <div className="logo p-2">
                        <Link href="/" className="flex gap-2 flex-center" >
                            <Image src='/assets/images/logo.png' alt='logo' width={170} height={10} className="object-contain" />
                        </Link>

                    </div>
                    <div className="nav-links flex flex-row justify-center text-center p-1" >
                        {links.map((link) => (
                            <Link key={link.id} href={link.url} className="flex justify-center " >
                                <p className='p-2 text-primary-gray hover:text-primart-turkiz selection:text-primary-turkiz '>
                                    {link.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
                {session?.user ?
                    <>
                        <div className='p-2 text-primary-gray hover:text-primart-turkiz selection:text-primary-turkiz '>
                            <button onClick={() => signOut("google")} >sign out</button>
                        </div>
                        <div className=" text-center flex justify-center " >
                            <Image src={session?.user.image} alt='user logo' width={50} height={10} className="rounded-full" />
                        </div>

                    </>
                    :
                    <>
                        <div className="profile text-center flex justify-center " >
                            <Button
                                text='Sign Up'
                                color="primary-turkiz"
                                link="/register"

                            />
                            <Button
                                text='Log In'
                                color="primary-turkiz"
                                link="/login"

                            />
                        </div>
                    </>
                }

            </nav>
        </header>
    )
}

export default Nav

