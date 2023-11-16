// "use client";
"use client";
import { db } from "@/app/config/firebase";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import Link from "next/link";
import Navbar from "@/app/components/navbar";

interface DataModel {
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
export default function MyOffer() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

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
  const getData = async (): Promise<void> => {
    try {
      const emailUser = await getEmailUser();
      if (!emailUser) {
        console.error("User email is undefined");
        return;
      }

      const q = query(
        collection(db, "offers"),
        where("posting_user_id", "==", emailUser)
      );
      const querySnapshot = await getDocs(q);

      const newData: DataModel[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DataModel;
        return {
          ...data,
          id: doc.id,
        };
      });

      setData(newData);
      console.log(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  const deleteData = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "offers", id));
      getData();
      MySwal.fire("Postingan telah dihapus", "", "success");
    }catch{
      alert('gagal')
    }
  }

useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <main className=" md:px-20 px-5 md:pb-10 pt-20 bg-slate-100">
        <div className=" flex justify-center flex-col place-content-center">
          <h1 className="text-center  sm:text-3xl font-bold tracking-tight text-gray-900 m-10">
            —— Penawaran Saya ——
          </h1>

          <div className="overflow-x-auto w-full  sm:px-32">
            <div className=" shadow-xl border rounded-xl sm:p-10 overflow-x-auto overflow-hidden bg-white">
              <table className="table max-w-full sm:w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th className=" sm:text-xl text-neutral-800">Gambar</th>
                    <th className="sm:text-xl text-neutral-800">Judul</th>
                    <th className="sm:text-xl text-neutral-800">Pengiriman</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item.images[0]}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-ellipsis ... line-clamp-1 sm:text-base text-xs">
                        {item.title}
                      </td>
                      <td className="sm:text-base text-xs ">
                        {item.delivery ? "Diantar" : "Diambil"}
                      </td>
                      <th>
                        <label
                          htmlFor={item.id}
                          className="btn btn-primary btn-outline btn-xs sm:btn-md"
                        >
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
                              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                            />
                          </svg>
                        </label>
                        <input
                          type="checkbox"
                          id={item.id}
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box flex justify-center gap-5">
                            <button className="btn btn-error" onClick={() => deleteData(item.id)}>
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              Hapus
                            </button>
                            <Link href={`/post/offer/${item.id}`}>
                              <button className="btn btn-secondary col">
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                                Edit
                              </button>
                            </Link>
                          </div>
                          <label
                            className="modal-backdrop"
                            htmlFor={item.id}
                          >
                            Close
                          </label>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
              </table>
            </div>
          </div>
        </div>
        {/* The button to open modal */}

        {/* Put this part before </body> tag */}
      </main>
    </>
  );
}

MyOffer.requireAuth = true;

// interface DataModel {
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
// export default function MyOffer() {

//   const session = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect("/signin");
//     },
//   });

//   const getEmailUser = async () => {
//     try {
//       const emailUser = await session.data?.user.email;
//       if (!emailUser) {
//         console.error("User email is undefined");
//       }
//       return emailUser;
//     } catch (error) {
//       console.error("Error getting user email:", error);
//     }
//   };

//   const [data, setData] = useState<DataModel[]>([]);
//   const getData = async (): Promise<void> => {
//     try {
//       const emailUser = await getEmailUser();
//       if (!emailUser) {
//         console.error("User email is undefined");
//         return;
//       }

//       const q = query(collection(db, "offers"), where('posting_user_id', "==", emailUser));
//       const querySnapshot = await getDocs(q);

//       const newData: DataModel[] = querySnapshot.docs.map((doc) => {
//         const data = doc.data() as DataModel;
//         return {
//           ...data,
//           id: doc.id,
//         };
//       });

//       setData(newData);
//       console.log(newData)
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   return <>
//   <button className="btn btn-primary" onClick={getData}>coba</button>
//   <div>
//       <h2>{session.data?.user.email}</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             {/* Add more headers based on your data structure */}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.title}</td>
//               <td>{item.description}</td>
//               {/* Add more cells based on your data structure */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </>;
// }
// MyOffer.requireAuth = true;
