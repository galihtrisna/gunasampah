// "use client";
"use client";
import { db } from "@/app/config/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import BlankProfil from "@/app/assets/blank-profile-circle.png";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Delivery from "./delivery";
import Address from "./address";
import Name from "./name";

interface DataModel {
  id: string;
  booking_date: string;
  created_at: string;
  id_offer: string;
  note: string;
  reason: string;
  sender: string;
  status: string;
  to: string;
}

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

export default function MyMeet() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const [avatar, setAvatar] = useState<any | null>(null);
  const getEmailUser = async () => {
    try {
      const emailUser = await session.data?.user.email;
      if (!emailUser) {
        console.error("User email is undefined");
      }
      return emailUser;
    } catch (error) {
      console.error("Error getting user email:", error);
    }
  };

  const [data, setData] = useState<DataModel[]>([]);
  const [dataReason, setReason] = useState("");
  const getData = async (): Promise<void> => {
    try {
      const emailUser = await getEmailUser();
      if (!emailUser) {
        console.error("User email is undefined");
        return;
      }

      const q = query(collection(db, "booking"), where("to", "==", emailUser));
      const querySnapshot = await getDocs(q);

      const newData: DataModel[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DataModel;
        return {
          ...data,
          id: doc.id,
        };
      });

      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSetuju = async (id: any) => {
    const Ref = doc(db, "booking", id);
    await updateDoc(Ref, {
      status: "Disetujui",
    });
    MySwal.fire("Telah Disetujui", "", "success");
  };

  const onBatal = async (id: any, reason_user: String) => {
    const Ref = doc(db, "booking", id);
    await updateDoc(Ref, {
      status: "Dibatalkan",
      reason: reason_user,
    });
    MySwal.fire("Telah Dibatalkan", "", "success");
  };

  useEffect(() => {
    getData();
  });
  return (
    <>
      <Navbar />
      <main className="  md:px-32 px-5 md:pb-10 pt-28 h-full bg-slate-100 min-h-screen ">
        <div className="bg-white border border-black/25 ">
          <p className=" font-semibold p-7 text-xl ">
            AjakTemu ({data.length})
          </p>
          {data.map((item, index) => (
            <div key={index}>
              <div className="collapse  rounded-none border-y border-black/25">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium  items-center flex">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar m-5"
                  >
                    <div className=" w-52 rounded-full">
                      {avatar ? (
                        <img src={avatar}></img>
                      ) : (
                        <Image src={BlankProfil} alt="" />
                      )}
                    </div>
                  </label>
                  
                  <b className="sm:text-base  text-xs">
                    <Name id={item.sender} />
                  </b>
                  <p className=" pl-3 sm:text-base  text-xs">Ingin Bertemu Anda</p>
                  <div className=" w-auto border-2">
                    {item.status === "Belum Disetujui" ? <div className={`badge badge-error absolute right-12 bottom-11 badge-xs sm:badge-md`}>{item.status}</div> : <div className={` badge-xs sm:badge-md badge badge-success absolute right-12 bottom-11`}>{item.status}</div>}
                  </div>
                </div>
                <div className="collapse-content bg-white">
                  <div className=" px-5">
                    <h2 className="text-xl font-semibold mb-4">
                      Judul Postingan
                    </h2>
                    <p className="text-gray-700 mb-6">{item.id_offer}</p>
                    <h2 className="text-xl font-semibold mb-4">Waktu Temu</h2>
                    <p className="text-gray-700 mb-6">{item.booking_date}</p>

                    <h2 className="text-xl font-semibold mb-4">
                      Tipe Pengiriman
                    </h2>
                    <p className="text-gray-700 mb-6">
                      <Delivery id={item.id_offer} />
                    </p>

                    <h2 className="text-xl font-semibold mb-4">Catatan</h2>
                    <p className="text-gray-700">{item.note}</p>
                  </div>
                  <br />
                  {item.status === "Belum Disetujui" ? (
                    <div className="flex flex-row gap-5 justify-center">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => onSetuju(item.id)}
                      >
                        Terima
                      </button>

                      {/* The button to open modal */}
                      <label
                        htmlFor={`${index}`}
                        className="btn btn-outline btn-sm"
                      >
                        Tolak
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`${index}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box">
                          <h3 className="text-lg font-bold">
                            Alasan Pembatalan
                          </h3>
                          <form
                            action={() => onBatal(item.id, dataReason)}
                            method="post"
                          >
                            <textarea
                              className="textarea textarea-bordered h-24 w-full"
                              placeholder="Bio"
                              onChange={(e) => setReason(e.target.value)}
                              required
                            ></textarea>
                            <button type="submit" className="btn btn-warning">
                              Batalkan
                            </button>
                          </form>
                        </div>
                        <label className="modal-backdrop" htmlFor={`${index}`}>
                          Close
                        </label>
                      </div>
                    </div>
                  ) : item.status === "Disetujui" ? (
                    <div className="px-5">
                      <h2 className="text-xl font-semibold mb-4">Alamat</h2>
                      <Address id={item.id_offer} />
                      <br />
                      
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

MyMeet.requireAuth = true;
