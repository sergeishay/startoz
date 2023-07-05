'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { use } from 'bcrypt/promises';
import { useRouter } from "next/navigation"

import googleicon from '../../public/assets/icons/google2.svg';
import facebookicon from '../../public/assets/icons/Vector.svg';
const Register = () => {
    const router = useRouter()

    const { data: session, status } = useSession();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response);
        }
        setUpProviders()
    }, [])

    
    const submitError = (error) => {
        toast.error(error + " Try to login instead");
    }

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/register', data);
            toast.success("User has been registered");
            console.log(router)
            router.push(`/on-boarding/${res.data.user._id}`);
      } catch (err) {
            console.log(err.response);
            if (err.response && err.response.status === 400) {
                submitError(err.response.data)
            } else {

                toast.error("An error occurred");
            }
        }
    };
    useEffect(() => {
        if (status === "authenticated") {
          // Check if it's the user's first visit
          if (session.user.isFirstVisit) {
            // If it's the user's first visit, redirect to the onboarding page
            router.push(`/on-boarding/`);
          } else {
            // If it's not the user's first visit, redirect to the profile page
            router.push(`/profile/`);
          }
        }
      }, [status, session]);

    // const signInUser = async (provider) => {
    //     const result =await  signIn(provider);
    //     console.log(result)
    //     if (result.error) {
    //         toast.error(result.error);
    //     } else {
    //         // Check if it's the user's first visit
    //         if (result.isFirstVisit) {
    //             // If it's the user's first visit, redirect to the onboarding page
    //             router.push('/on-boarding');
    //         } else {
    //             // If it's not the user's first visit, redirect to the profile page
    //             router.push('/profile');
    //         }
    //     }
    // };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={registerUser} >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={data.username}
                                    onChange={e => setData({ ...data, username: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={e => setData({ ...data, email: e.target.value })}

                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={e => setData({ ...data, password: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        Or Sign in with
                    </p>
                    <div>
                        <button
                            type="button"
                            onClick={() => signIn("google")}
                            className='flex w-full justify-center rounded-xl bg-sky-600 px-3 py-1 text-m font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                        >
                            <Image src={googleicon} alt="gooogle-icon" className='w-5 h-5 mr-2' />
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn("facebook")}
                            className='flex w-full justify-center rounded-xl bg-sky-400 px-3 py-1 mt-2 text-m font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'
                        >
                            <Image src={facebookicon} alt="gooogle-icon" className='w-5 h-5 mr-2' />
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Register




    //     return (
    //         <div>
    //             <>
    //                 {providers && Object.values(providers).map((provider) => (
    //                     provider.name === "Credentials" ?
    //                         <form method="post" key={provider.id}>
    //                             {/* This will try to render the provider object, you may want to render some properties of the provider instead */}
    //                             {/* {provider} */}
    //                             <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
    //                             <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
    //                             <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
    //                             <button
    //                                 type="button"
    //                                 key={provider.id}
    //                                 onClick={() => signInUser(provider.id)}
    //                                 className='black_btn'
    //                             >
    //                                 Sign In
    //                             </button>
    //                         </form>
    //                         :
    //                         <button
    //                             type="button"
    //                             key={provider.id}
    //                             onClick={() => signIn(provider.id)}
    //                             className='black_btn'
    //                         >
    //                             Sign In
    //                         </button>
    //                 ))}
    //             </>
    //         </div>
    //     )
    // }