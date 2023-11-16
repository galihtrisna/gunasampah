'use client';
import { useState } from 'react';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import Logo from "../assets/logo_a.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image src={Logo} alt='' className='mx-auto h-10 w-auto'>

          </Image>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Lupa kata sandi
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Alamat Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => resetEmail()}
                disabled={!email}
                className=" flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Kirim Email Lupa Kata Sandi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <main className="flex flex-col justify-center p-6 pb-12">
      <div className="mx-auto max-w-md">
        <svg
          className="mx-auto h-12 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
          />
        </svg>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">
          Forgot your password?
        </h2>
      </div>
      <div
        className="mt:6 mx-auto w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10"
      >
        <div
          className="flex gap-3 rounded-md border border-green-500 bg-green-50 p-4"
        >
          <svg
            className="h-5 w-5 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>

          <h2 className="text-sm font-medium text-green-800">
            We have emailed your password reset link.
          </h2>
        </div>
        <form action="#" autocomplete="off" className="mt-6 space-y-6">
          <div>
            <label for="email" className="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="email"
                name="email"
                required
                className="w-full rounded-md border-gray-300 pl-10 text-sm focus:border-green-500 focus:ring-green-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <button
              href="#"
              className="flex min-w-full items-center justify-center rounded-md bg-green-600 py-2 px-4 font-semibold text-gray-900 shadow-lg transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send reset link
            </button>
          </div>
        </form>
      </div>
    </main> */}
    </>
  )
}