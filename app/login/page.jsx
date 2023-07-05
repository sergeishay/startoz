'use client';

import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from 'next/link';
import Image from 'next/image';

import googleicon from '../../public/assets/icons/google2.svg';
import facebookicon from '../../public/assets/icons/Vector.svg';


const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const router = useRouter()
  const { data: session, status } = useSession();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

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

// const signInUser = async (provider) => {
//     const result =await  signIn(provider);
//     console.log(result)
//     if (result.error) {
//         console.log(result.error);
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


  const userLogin = async (e) => {
    e.preventDefault()
    signIn('credentials', { ...data, redirect: false })
      .then((callback) => {
        console.log(callback)
        if (callback?.error) {
            toast.error(callback.error)
        }
        if (callback?.ok && !callback?.error) {
          setIsUserLoggedIn(true)
          toast.success('logged in successfully')
        }
      })
  }

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/assets/images/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={userLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
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
                Sign in
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


export default Login