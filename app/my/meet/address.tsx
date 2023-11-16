// "use client";

// import React from "react";
// import { db, storage } from "@/app/config/firebase";
// import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { getDocs, collection } from "firebase/firestore";
// import Link from "next/link";

// interface Offer {
//   id: string;
//   title: string;
//   description: string;
//   images: string[];
//   price: number;
//   delivery: boolean;
//   city: string;
//   address: string;
//   posting_user_id: string;
//   posting_time: Timestamp; 
//   category: string;
// }

// interface DeliveryProps {
//     id: string;
//   }
  
//   const Address: React.FC<DeliveryProps> = ({ id }) => {
 
//     const [delivery, setDelivery] = useState<boolean | null>(null);
//     const [address, setAddress] = useState<any | null>(null);
//   const getTypeDelivery = async (id: any) => {
//     const docRef = doc(db, "offers", id);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const offerData = docSnap.data() as Offer;
//       setDelivery(offerData.delivery)
//       setAddress(offerData.address)
//     //   console.log("Document data:", docSnap.data());
//       console.log("Document data:", offerData.delivery);
//     } else {
//       // docSnap.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   };
//   useEffect(() => {
//     getTypeDelivery(id);
//   }, []);
//   return (
//     <>
//       {delivery ? (<><p>Alamat : {address[3]}, Kec.{address[2]}, Kab.{address[1]}, {address[0]}  {address[4]}</p></>) : 'Diambil sendiri oleh pencari'}
//     </>
//   );
// }

// export default Address;


"use client";

import React from "react";
import { db, storage } from "@/app/config/firebase";
import { doc, getDoc, getFirestore, Timestamp } from "firebase/firestore";
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

interface DeliveryProps {
    id: string;
  }
  
  const Address: React.FC<DeliveryProps> = ({ id }) => {
     const [address, setAddress] = useState<any | null>(null);
    const [delivery, setDelivery] = useState<boolean | null>(null);
  const getTypeDelivery = async (id: any) => {
    const docRef = doc(db, "offers", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const offerData = docSnap.data() as Offer;
      setDelivery(offerData.delivery)
            setAddress(offerData.address)
      // console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
      
  useEffect(() => {
    getTypeDelivery(id);
  }, []);
  return (
    <>
      {delivery ? (<><p>{address[3]}, Kec.{address[2]}, Kab.{address[1]}, {address[0]}  {address[4]}</p></>) : 'Diambil sendiri oleh pencari'}
     
    </>
  );
}

export default Address;