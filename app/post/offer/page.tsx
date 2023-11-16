"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

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
export default function Offer() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const offersCollectionRef = collection(db, "offers");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_a, setImage_a] = useState<any | null>(null);
  const [image_b, setImage_b] = useState<any | null>(null);
  const [image_c, setImage_c] = useState<any | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [delivery, setDelivery] = useState(false);
  const [city, setCity] = useState("");
  const [addressProvinsi, setAddressProvinsi] = useState("");
  const [addressKabupaten, setAddressKabupaten] = useState("");
  const [addressKecamatan, setAddressKecamatan] = useState("");
  const [addressKodePos, setAddressKodePos] = useState("");
  const [addressJalan, setAddressJalan] = useState("");
  const [categori, setCategori] = useState("");
  const [isGratis, setIsGratis] = useState(false);
  const [proses, setProses] = useState(false);

  function generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }


  const uploadImage = async (image: any) => {
    return new Promise((resolve, reject) => {
      if (image != null) {
        const fileref = ref(
          storage,
          `offers/${generateRandomString(15)}${image[0].name}`
          // `offers/${generateRandomString(15)}}`
        );

        uploadBytes(fileref, image[0])
          .then((data) => getDownloadURL(data.ref))
          .then((url) => {
            // console.log("url", url);
            resolve(url);
          })
          .catch((error) => alert(error));
      } else {
        alert("Masukkan Gambar");
      }
    });
  };
  const onSubmitOffer = async () => {
    setProses(true)
    const urlImageA = await uploadImage(image_a);
    const urlImageB = await uploadImage(image_b);
    const urlImageC = await uploadImage(image_c);
    if(isGratis == true){
      setPrice(null)
    }
    try {
      await addDoc(offersCollectionRef, {
        title: title,
        description: description,
        images: [urlImageA, urlImageB, urlImageC],
        price: price,
        delivery: delivery,
        city: city,
        address: [
          addressProvinsi,
          addressKabupaten,
          addressKecamatan,
          addressJalan,
          addressKodePos,
        ],
        posting_user_id: session.data?.user.email,
        posting_time: serverTimestamp(),
        categori: categori,
      });
    } catch (err) {
      alert(err);
    }
    MySwal.fire("Posting Telah Selesai", "", "success");
  };

  return (
    <>
      <Navbar />
      <main className="md:px-20 px-5 md:pb-10 pt-20 bg-slate-100">
        <div>
          <div className="flex justify-between items-center my-5">
            <h1 className="text-xl text font-semibold">Tambah Sampah</h1>
            <div className="flex flex-row">
         
              <Link href={`/`}><button className="btn btn-outline m-2 sm:w-32">Batal</button></Link>
              {proses ? (
                <button
                  className="btn btn-primary m-2 sm:w-32 btn-disabled"
             
                
                >
                  Proses
                </button>
              ) : (
                <button
                  className="btn btn-primary m-2 sm:w-32"
                  onClick={onSubmitOffer}
                  type="submit"
                >
                  Posting
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
            <div className="  bg-white h-auto w-full lg:col-span-3 rounded-xl p-5">
              <div className="grid grid-cols-1">
                <h1 className="text-lg text font-semibold mb-2">
                  Informasi Dasar
                </h1>
                <div>
                  <label className="label">
                    <span className="label-text text-lg text font-semibold">
                      Judul
                    </span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full  input-sm"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-lg text font-semibold">
                      Deskripsi
                    </span>
                  </label>
                  <textarea
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea textarea-bordered w-full py-0 px-2 leading-none h-28 textarea-lg"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-lg text font-semibold">
                      Harga
                    </span>
                  </label>
                  <div className="grid grid-cols-2">
                    <input
                      type="number"
                      disabled={isGratis}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="input input-bordered w-32 sm:w-60 input-sm"
                    />
                    <label className="label cursor-pointer m-0  p-0 w-24">
                      <span className="label-text text-lg text font-semibold">
                        Gratis
                      </span>
                      <input
                        type="checkbox"
                        checked={isGratis}
                        onChange={(e) => setIsGratis(e.target.checked)}
                        className="checkbox checkbox-primary ml-5"
                      />
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-circle btn-ghost btn-xs text-info"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </label>
                        <div
                          tabIndex={0}
                          className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
                        >
                          <div className="card-body">
                            <h2 className="card-title">Gratis</h2>
                            <p>
                              Jika gratis, maka pencari tidak perlu membayar
                              saat bertemu
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="form-control w-full">
                  <span className="label-text text-lg text font-semibold my-3">
                    Kategori
                  </span>
                  <select
                    className="select select-bordered select-sm"
                    onChange={(e) => setCategori(e.target.value)}
                  >
                    <option disabled selected>
                      Pilih
                    </option>
                    <option value="Plastik">Plastik</option>
                    <option value="Kertas">Kertas</option>
                    <option value="Kayu">Kayu</option>
                    <option value="Besi">Besi</option>
                    <option value="Kaca">Kaca</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Kain">Kain</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <label className="label cursor-pointer mt-5  p-0  w-52">
                  <span className="label-text text-lg text font-semibold">
                    Alamat Bawaan
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary ml-5"
                  />

                  <div className="dropdown dropdown-end ">
                    <label
                      tabIndex={0}
                      className="btn btn-circle btn-ghost btn-xs text-info"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </label>
                    <div
                      tabIndex={0}
                      className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-52"
                    >
                      <div className="card-body">
                        <h2 className="card-title">Alamat Bawaan</h2>
                        <p>
                          Alamat bawaan adalah alamat yang terdapat pada profile
                          kamu
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
                <div className="grid lg:grid-cols-2 grid-cols-1 my-3  gap-x-10">
                  <div className="lg:col-span-2">
                    <label className="label">
                      <span className="label-text text-lg text font-semibold">
                        Alamat
                      </span>
                    </label>
                    <input
                      onChange={(e) => setAddressJalan(e.target.value)}
                      type="text"
                      className="input input-bordered w-full  input-sm"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-lg text font-semibold">
                        Provinsi
                      </span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setAddressProvinsi(e.target.value)}
                      className="input input-bordered w-full  input-sm"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-lg text font-semibold">
                        Kota
                      </span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                      className="input input-bordered w-full  input-sm"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-lg text font-semibold">
                        Kabupaten
                      </span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setAddressKabupaten(e.target.value)}
                      className="input input-bordered w-full  input-sm"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-lg text font-semibold">
                        Kecamatan
                      </span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setAddressKecamatan(e.target.value)}
                      className="input input-bordered w-full  input-sm"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-lg text font-semibold">
                        Kode Pos
                      </span>
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setAddressKodePos(e.target.value)}
                      className="input input-bordered w-full  input-sm"
                    />
                  </div>
                </div>
                <label className="label cursor-pointer m-0  p-0 w-24">
                  <span className="label-text text-lg text font-semibold">
                    Diantar
                  </span>
                  <input
                    type="checkbox"
                    name="delivery"
                    onChange={(e) => setDelivery(Boolean(e.target.checked))}
                    className="checkbox checkbox-primary ml-5"
                  />

                  <div className="dropdown dropdown-start ">
                    <label
                      tabIndex={0}
                      className="btn btn-circle btn-ghost btn-xs text-info"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </label>
                    <div
                      tabIndex={0}
                      className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-52"
                    >
                      <div className="card-body">
                        <h2 className="card-title">Diantar</h2>
                        <p>
                          Jika diantar maka kamu akan mengantarkan sampah kamu
                          ke lokasi pencari
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className=" bg-white h-auto w-full lg:col-span-2 rounded-xl flex flex-col p-5">
              <h1 className="text-lg text font-semibold mb-5">Unggah Gambar</h1>
              <div className="grid grid-cols-2 gap-5">
                {/* {/* <div className=" aspect-square w-full  grid grid-cols-1 col-span-2 relative overflow-hidden border-dashed border-2 border-neutral-400">
                  <DropzoneUploader setImage={setImage_a}/>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <p className=" text-neutral-400 text-lg font-semibold">
                      Unggah Gambar di sini
                    </p>
                  </div>
                </div>
                <div className=" aspect-square w-full  grid grid-cols-1 relative overflow-hidden border-dashed border-2 border-neutral-400">
                  <DropzoneUploader setImage={setImage_b} />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <p className=" text-neutral-400 text-lg font-semibold text-center">
                      Unggah Gambar di sini
                    </p>
                  </div>
                </div> */}
                {/* <div className=" aspect-square w-full  grid grid-cols-1 relative overflow-hidden border-dashed border-2 border-neutral-400">
                  <DropzoneUploader setImage={(e) => setImage_ab(e.target.files)} />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <p className=" text-neutral-400 text-lg font-semibold text-center">
                      Unggah Gambar di sini
                    </p>
                  </div>
                </div>  */}
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  onChange={(e) => setImage_a(e.target.files)}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  onChange={(e) => setImage_b(e.target.files)}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  onChange={(e) => setImage_c(e.target.files)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

Offer.requireAuth = true;
