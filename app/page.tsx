import Carousel from "./components/carousel";
import Navbar from "./components/navbar";
import Offers from "./components/offers";

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
      <Carousel />
      <div className="bg-white">
        <Offers/>
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h2 className="text-[22px] sm:text-2xl font-bold tracking-tight text-gray-900">
              Permintaan Orang
            </h2>
            <span className="text-[18px] sm:text-lg font-bold tracking-tight  text-primary">
              <a href="#">Lihat Semua</a>
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <article
                className="card bg-base-100 shadow-xl group relative"
                key={product.id}
              >
                <figure>
                  <img className=" h-44" src={product.imageSrc} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <div className="badge badge-info z-10">Dicari</div>
                  <h2 className="card-title  text-lg  z-0">{product.title}</h2>
                  <div className=" text-right">
                    <p>
                      {product.price !== null && product.price !== undefined ? `Rp. ${product.price}` : "Gratis"}
            
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">{product.city}</div>
                    <div className="badge badge-outline">
                      {product.delivery}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
    </>
    
  );
}
