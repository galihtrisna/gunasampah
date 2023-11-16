"use client";

import React, { useEffect, useState } from "react";
import BlankProfil from "../assets/blank-profile-circle.png";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { db, storage } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface DataModel {
  avatar: string;
}
export default function NavbarEnd() {
  const session = useSession()

  const getDataByEmail = async () => {
    try {
      // const dataQuery = query(collection(db, 'profile'), where("email", "==", emailAseli));
      // const dataQuery = collection(db, 'profile').where("email", "==", emailAseli);
      const q = query(
        collection(db, "profile"),
        where("email", "==", emailAseli)
      );
      const dataSnapshot = await getDocs(q);
      if (!dataSnapshot.empty) {
        const data = dataSnapshot.docs[0].data() as DataModel;
        return data;
      } else {
        console.log("gagal hehe");
        return null;
      }
    } catch (err: any) {
      console.log(err);
      return null;
    }
  };
  const [avatar, setAvatar] = useState<any | null>(null);
  const emailAseli = session.data?.user.email;
  const [data, setData] = useState<DataModel | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataByEmail();
      setData(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setAvatar(data?.avatar ?? "");
  }, [
    data?.avatar,

  ]);
  return (
    <>
      <div className="navbar-end md:gap-5">
        {/* Tampilkan konten berdasarkan status login */}
        {emailAseli ? (
          <>
            {/* The button to open modal */}
            <label
              htmlFor="my_modal_posting"
              className="sm:btn sm:btn-outline sm:btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="hidden sm:block">Posting</span>
            </label>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_posting" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h1 className="font-bold text-2xl text-center">
                  Posting Sebagai
                </h1>

                <div className="modal-action flex justify-center">
                  <button className="btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                    Pencari
                  </button>
                  <Link href={`/post/offer`}>
                    <button className="btn col">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                      Penawar
                    </button>
                  </Link>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_posting">
                Close
              </label>
            </div>
            <Link href={'/my/meet'}><button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button></Link>
            
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  { avatar ? (<img src={avatar}></img>) : (<Image src={BlankProfil} alt="" />)}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              ><li>
              <Link href={'/'}>
            
                Beranda
                {/* <span className="badge">New</span> */}
             </Link>
            </li>
                <li>
                  <Link href={'/my/profile'}>
                
                    Profile
                    {/* <span className="badge">New</span> */}
                 </Link>
                </li>
                <li>
                 <Link href={'/my/offer'}>Penawaran Saya</Link>
                </li>
                <li>
                  <Link href={'/my/search'}>Pencarian Saya</Link>
                </li>
                <li>
                  <Link href={'/my/meet'}>Ajak Temu</Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
            <Link href={`/signin`}><label className="sm:btn sm:btn-outline sm:btn-primary">
            <span className="hidden sm:block">Masuk</span>
          </label></Link>
          
        )}
      </div>
    </>
  );
}
