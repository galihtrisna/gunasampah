"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../config/firebase";
import { addDoc, collection, doc, getDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Link from "next/link";

import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// Interface untuk mendefinisikan tipe data produk
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
  categori: string;
}

export default function DetailOffer({ params }: { params: { slug: string } }) {
  const [productData, setProductData] = useState<Offer | null>(null);
  const slug = params?.slug;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (slug) {
          const docRef = doc(db, "offers", slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProductData(docSnap.data() as Offer);
          } else {
            console.log("Product not found");
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [slug]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0"); // Bulan dimulai dari 0
    const day = `${now.getDate()}`.padStart(2, "0");
    const hour = `${now.getHours()}`.padStart(2, "0");
    const minute = `${now.getMinutes()}`.padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const session = useSession();
  
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [proses, setProses] = useState(false);
  const onSubmitForm = async () => {
    setProses(true)
    const sender = await session.data?.user.email;
 
    try {
      
      const docRef = await addDoc(collection(db, "booking"), {
      sender: sender,
      to: productData!.posting_user_id,
      id_offer: slug,
      status: 'Belum Disetujui',
      created_at: serverTimestamp(),
      booking_date: date,
      note: note,
      reason: '',
    });

    if(docRef){
      setProses(false)
      MySwal.fire("Posting Telah Selesai", "Buka halaman Ajak Temu untuk temukan detail dan status ajak temu kamu", "success");
    }
    return docRef
    } catch (error) {
      setProses(false)
      MySwal.fire(`${error}`, "", "error");
    }
    
  };

  return (
    <>
      <Navbar />
      <main className="sm:p-20 p-5">
        {productData && (

          <div className="bg-white">
            <div className="pt-6">
              {/* Image gallery */}
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 flex flex-row lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-4 hidden overflow-hidden rounded-lg lg:block max-h-[50vh]">
                  <img
                    src={productData.images[0]}
                    alt={productData.images[0]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-h-[50vh]">
                  <img
                    src={productData.images[1]}
                    alt={productData.images[1]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-h-[50vh]">
                  <img
                    src={productData.images[2]}
                    alt={productData.images[2]}
                    className="h-full w-full object-cover object-center"
                  />
                </div>


              </div>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {productData.title}
                  </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  
                  <p className="text-3xl tracking-tight text-gray-900">
                    {productData.price ? productData.price : "Gratis"}
                  </p>

                  {/* Reviews */}
                  {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}

                  <div className="mt-10">
                  {session.data ? (<label
                      htmlFor="my_modal_book"
                      className="btn-block btn btn-primary"
                    >
                      Atur Jadwal
                    </label>) : (<><Link href={'/signin'}> <button className="btn btn-primary w-full">Login Untuk atur jadwal</button> </Link></>)}
                    

                    <input
                      type="checkbox"
                      id="my_modal_book"
                      className="modal-toggle"
                    
                    />
                    <div className="modal">
                      <div className="modal-box">
                        <h1 className="font-bold text-2xl text-center">
                          Atur Jadwal Temu
                        </h1>
                        <form
                          action={onSubmitForm}
                          method="post"
                          className="flex flex-col space-y-4"
                        >
                          <div className="form-control w-full max-w-xs">
                            <label className="label">
                              <span className="label-text">
                                Tanggal dan Jam
                              </span>
                            </label>
                            <input
                              type="datetime-local"
                              name="datetime"
                              min={getCurrentDateTime()}
                              id="datetime"
                              required
                              onChange={(e) => setDate(e.target.value)}
                              className="input input-bordered w-full max-w-xs"
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Catatan</span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered h-24"
                              placeholder="Bio"
                              onChange={(e) => setNote(e.target.value)}
                              required
                            ></textarea>
                            <label className="label">
                              <span className="label-text-alt">
                                Tambahkan detail yang menjelaskan kebutuhan dan
                                pengambilan barang tersebut
                              </span>
                            </label>
                          </div>

                          <div className="modal-action flex justify-center">
                            {/* Mungkin Anda ingin menambahkan elemen lain di sini */}
                          </div>

                          <button type="submit" className="btn btn-primary">
                            Jadwalkan
                          </button>
                        </form>
                      </div>
                      <label className="modal-backdrop" htmlFor="my_modal_book">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {productData.description}
                      </p>
                      <p>Alamat Barang : Kec.{productData.address[2]}, Kab.{productData.address[1]}, {productData.address[0]}</p>
                    </div>
                  </div>

                  <div className="mt-10 gap-5 flex flex-wrap">
                    <div className="badge badge-outline z-10  text-xl p-4">
                      Ditawarkan
                    </div>
                    <div className="badge badge-outline z-10  text-xl p-4">
                      {productData.categori}
                    </div>
                    <div className="badge badge-outline z-10  text-xl p-4">
                      {productData.city}
                    </div>
                    <div className="badge badge-outline z-10  text-xl p-4">
                      {productData.delivery ? "Diantar" : "Diambil"}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
