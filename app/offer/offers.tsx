"use client";

import React from "react";
import { db, storage } from "../config/firebase";
import { getFirestore, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";

interface Offer {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  delivery: boolean;
  city: string;
  address: string;
  posting_user_id: string;
  posting_time: Timestamp; 
  category: string;
}

export default function Offers() {
  const [offerList, setOfferList] = useState<Offer[]>([]);
  const offersCollectionRef = collection(db, "offers");

  const getOfferList = async () => {
    try {
      const data = await getDocs(offersCollectionRef);
      const filteredData: Offer[] = data.docs.map((doc) => {
        const { id, ...rest } = doc.data() as Offer;
        return {
          id: doc.id,
          ...rest,
          posting_time: doc.data().posting_time as Timestamp,
        };
      });
      setOfferList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getOfferList();
  }, []);

 
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {offerList.map((offer, index) => (
            <Link href={`./offer/${offer.id}`} key={index}>
            <article
              className="card bg-base-100 shadow-xl group relative h-96"
            >
              <figure className=" h-44 overflow-hidden ">
                <img className=" max-h-44 min-w-full"  src={offer.images[0]} alt="Shoes" />
              </figure>
              <div className="card-body">
                <div className="badge badge-secondary z-10">Ditawarkan</div>
                <h2 className="card-title  text-lg  z-0 text-ellipsis ... line-clamp-3">{offer.title}</h2>
                <div className=" text-right">
                  <p>
                    {offer.price !== null && offer.price !== undefined
                      ? `Rp. ${offer.price}`
                      : "Gratis"}
                  </p>
                </div>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{offer.city}</div>
                  <div className="badge badge-outline">
                    {offer.delivery ? "Diantar" : "Diambil"}
                  </div>
                </div>
              </div>
            </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
