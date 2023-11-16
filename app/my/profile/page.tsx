"use client";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  DocumentSnapshot,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Link from "next/link";
import BlankProfil from "../../assets/blank-profile-circle.png";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

interface DataModel {
  name: string;
  email: string;
  phone: number;
  address: string[];
  avatar: string;
  city: string;
  gender: string;
}

export default function MyProfile() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const emailAseli = session.data?.user.email;
  const offersCollectionRef = collection(db, "profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<any | null>(null);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState(0);
  const [addressProvinsi, setAddressProvinsi] = useState("");
  const [addressKabupaten, setAddressKabupaten] = useState("");
  const [addressKecamatan, setAddressKecamatan] = useState("");
  const [addressKodePos, setAddressKodePos] = useState("");
  const [addressJalan, setAddressJalan] = useState("");
  const [gender, setGender] = useState("");
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
          `avatar/${generateRandomString(15)}${image[0].name}`
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
        setProses(false);
      }
    });
  };

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
  const [data, setData] = useState<DataModel | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataByEmail();
      setData(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setName(data?.name ?? "");
    setEmail(data?.email ?? "");
    setPhone(data?.phone ?? 0);
    setAvatar(data?.avatar ?? "");
    setCity(data?.city ?? "");
    setGender(data?.gender ?? "");
    setAddressProvinsi(data?.address[0] ?? "");
    setAddressKabupaten(data?.address[1] ?? "");
    setAddressKecamatan(data?.address[2] ?? "");
    setAddressJalan(data?.address[3] ?? "");
    setAddressKodePos(data?.address[4] ?? "");
  }, [
    data?.name,
    data?.email,
    data?.phone,
    data?.avatar,
    data?.city,
    data?.gender,
    data?.address,
  ]);

  const updateProfile = async () => {
    setProses(true);
    const dataProfileGet = query(
      collection(db, "profile"),
      where("email", "==", `${emailAseli}`)
    );
    const dataProfile = await getDocs(dataProfileGet);
    const profileDoc = dataProfile.docs[0];
    const urlAvatar = await uploadImage(avatar);
    if (avatar == null) {
      await updateDoc(profileDoc.ref, {
        name: name,
        city: city,
        address: [
          addressProvinsi,
          addressKabupaten,
          addressKecamatan,
          addressJalan,
          addressKodePos,
        ],
        email: session.data?.user.email,
        gender: gender,
      });
    } else {
      await updateDoc(profileDoc.ref, {
        name: name,
        avatar: urlAvatar,
        city: city,
        address: [
          addressProvinsi,
          addressKabupaten,
          addressKecamatan,
          addressJalan,
          addressKodePos,
        ],
        email: session.data?.user.email,
        gender: gender,
      });
    }

    setProses(false);
    MySwal.fire("Profile telah disimpan", "", "success");
  };

  const onSubmitOffer = async () => {
    setProses(true);
    const urlAvatar = await uploadImage(avatar);
    try {
      await addDoc(offersCollectionRef, {
        name: name,
        avatar: urlAvatar,
        city: city,
        address: [
          addressProvinsi,
          addressKabupaten,
          addressKecamatan,
          addressJalan,
          addressKodePos,
        ],
        email: session.data?.user.email,
        gender: gender,
      });
    } catch (err) {
      alert(err);
      setProses(false);
    }
    setProses(false);
    MySwal.fire("Profile telah disimpan", "", "success");
  };

  const okhSubmit = async () => {
    const cek = await getDataByEmail();
    if (cek == null) {
      onSubmitOffer();
    } else updateProfile();
  };
  return (
    <>
      <Navbar />
      <main className="md:px-20 px-5 md:pb-10 pt-20 bg-slate-100">
        <div className="my-5">
          <div className="grid lg:grid-cols-5 grid-cols-1 gap-10 bg-white rounded-lg p-5">
            <div className="lg:col-span-3">
              <h1 className="text-lg text font-semibold mb-2">
                Informasi Dasar
              </h1>
              <div>
                <label className="label">
                  <span className="label-text text-lg text font-semibold">
                    Nama Lengkap
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full  input-sm"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-lg text font-semibold">
                    Email
                  </span>
                </label>
                <input
                  disabled
                  type="text"
                  name="title"
                  value={emailAseli ? emailAseli : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-disabled input input-bordered w-full  input-sm"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-lg text font-semibold">
                    No Telepon
                  </span>
                </label>
                <input
                  type="number"
                  name="title"
                  value={phone}
                  onChange={(e) => setPhone(Number(e.target.value))}
                  className=" input input-bordered w-full  input-sm"
                />
              </div>
              <div className="form-control w-full">
                <span className="label-text text-lg text font-semibold my-3">
                  Jenis Kelamin
                </span>
                <select
                  className="select select-bordered select-sm"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option disabled selected>
                    Pilih
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-1 my-3  gap-x-10">
                <div className="lg:col-span-2">
                  <label className="label">
                    <span className="label-text text-lg text font-semibold">
                      Alamat
                    </span>
                  </label>
                  <input
                    value={addressJalan}
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
                    value={addressProvinsi}
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
                    value={city}
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
                    value={addressKabupaten}
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
                    value={addressKecamatan}
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
                    value={addressKodePos}
                    type="text"
                    onChange={(e) => setAddressKodePos(e.target.value)}
                    className="input input-bordered w-full  input-sm"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 p-20 ">
              <div className="avatar place-content-center">
                <div className="lg:w-full sm:w-1/4 w-24 rounded-full">
                  <img src={avatar ? avatar : BlankProfil} alt="" />
                </div>
              </div>
              <div className="m-auto">
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  onChange={(e) => {
                    const files = e.target.files;
       
                    const newAvatar = files && files.length > 0 ? files : null;
                    setAvatar(newAvatar);
                  }}
                />
              </div>
            </div>
            <div className="lg:col-span-5  flex justify-end">
              {proses ? (
                <button
                  className=" btn-disabled btn btn-primary m-2 sm:w-32"
                  type="submit"
                >
                  Proses
                </button>
              ) : (
                <button
                  className="btn btn-primary m-2 sm:w-32"
                  onClick={okhSubmit}
                  type="submit"
                >
                  Simpan
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

MyProfile.requireAuth = true;
