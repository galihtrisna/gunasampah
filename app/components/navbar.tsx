import Image from "next/image";
import Logo from "../assets/logo.svg";
import Logo_a from "../assets/logo_a.svg";
import BlankProfil from "../assets/blank-profile-circle.png";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import NavbarEnd from "./navbarEnd";

export default function Navbar() {
  
  return (
    <>
      <nav>
        <div className="navbar bg-base-100 sm:p-3 fixed z-50">
          <div className="navbar-start">

            <Image src={Logo_a} alt="Logo" className="visible md:invisible" />
            <div className="flex-1">
              <a className="normal-case text-xl hidden md:block">
                <Image src={Logo} alt="Logo" />
              </a>
            </div>
    
    
         
          </div>
          <div className="navbar-center">
            {" "}
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
          </div>
          <NavbarEnd/>
        </div>
      </nav>
    </>
  );
}


{/* <div className=" flex flex-col" >
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>

        <label>
          Delivery:
          <input
            type="checkbox"
            name="delivery"
            onChange={(e) => setDelivery(Boolean(e.target.checked))}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            placeholder="Provinsi"
            onChange={(e) => setAddressProvinsi(e.target.value)}
          />
          <input
            type="text"
            name="address"
            placeholder="Kabupaten"
            onChange={(e) => setAddressKabupaten(e.target.value)}
          />
          <input
            type="text"
            name="address"
            placeholder="Kecamatan"
            onChange={(e) => setAddressKecamatan(e.target.value)}
          />
          <input
            type="text"
            name="address"
            placeholder="Desa"
            onChange={(e) => setAddressDesa(e.target.value)}
          />
          <input
            type="text"
            name="address"
            placeholder="Jalan"
            onChange={(e) => setAddressJalan(e.target.value)}
          />
          <input
            type="text"
            name="address"
            placeholder="Patokan"
            onChange={(e) => setAddressPatokan(e.target.value)}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            onChange={(e) => setCategori(e.target.value)}
          />
        </label>
        <div>
          <input type="file" onChange={(e) => setImage_a(e.target.files)} />
          <input type="file" onChange={(e) => setImage_b(e.target.files)} />
          <input type="file" onChange={(e) => setImage_c(e.target.files)} />
          
        </div>
        <button type="submit" onClick={onSubmitOffer}>Submit</button>
      </div> */}
