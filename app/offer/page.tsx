import Carousel from "../components/carousel";
import Navbar from "../components/navbar";
import Offers from "./offers";

export default function Home() {

  const products = [
    {
      id: 1,
      title: "Galon Le Minerale",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      city: "Purwokerto",
      delivery: "Diambil",
      price: "Gratis",
    },
    {
      id: 2,
      title: "Puing Bongkaran Bangunan 2 truck",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      city: "Purbalingga",
      delivery: "Diantar",
      price: 200000,
    },
    {
      id: 3,
      title: "Galon Le Minerale",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      city: "Purwokerto",
      delivery: "Diambil",
      price: "Gratis",
    },
    {
      id: 4,
      title: "Puing Bongkaran Bangunan 2 truck",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      city: "Purbalingga",
      delivery: "Diantar",
      price: 200000,
    },
    // More products...
  ];

  return (
    <>
    <Navbar/>
    <main className=" md:px-20 px-5 md:pb-10 pt-20">
      <div className="bg-white">
        <h1 className="text-center  sm:text-4xl font-bold tracking-tight text-gray-900 m-10">—— Penawaran ——</h1>
        <Offers/>
      </div>
    </main>
    </>
    
  );
}
