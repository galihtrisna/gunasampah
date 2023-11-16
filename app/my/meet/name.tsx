"use client";

import React from "react";
import { db, storage } from "@/app/config/firebase";
import { doc, getDoc, getFirestore, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";

interface NameProps {
    id: string;
  }

const Name: React.FC<NameProps> = ({ id }) => {
    const [name, setName] = useState<string | null>(null);
  
    const fetchProfileData = async (email: string) => {
      try {
        const q = query(collection(db, 'profile'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.size > 0) {
          const docSnap = querySnapshot.docs[0];
          const profileData = docSnap.data();
          setName(profileData.name);
        } else {
          console.log('No document matching the query!');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    useEffect(() => {
      fetchProfileData(id);
    }, [id]);
  
    return <>{name}</>;
  };
  
  export default Name;