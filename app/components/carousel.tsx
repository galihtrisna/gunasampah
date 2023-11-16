import React from "react";
import Image from "next/image";
import carausel1 from "@/app/assets/c1.png"
import carausel2 from "@/app/assets/c2.png"
import carausel3 from "@/app/assets/c3.png"
export default function Carousel() {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
        <Image src={carausel1} alt='' className="w-full rounded-xl"></Image>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3">
              ❮
            </a>
            <a href="#slide2">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
        <Image src={carausel2} alt='' className="w-full rounded-xl"></Image>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" >
              ❮
            </a>
            <a href="#slide3" >
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
  
          <Image src={carausel3} alt='' className="w-full rounded-xl"></Image>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2">
              ❮
            </a>
            <a href="#slide1">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
