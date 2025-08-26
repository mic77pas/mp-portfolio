import React from "react";

export default function CarouselItem({ imgUrl, imgTitle }) {
  return (
    <div className="carousel-card">
      <img src={imgUrl} alt={imgTitle}></img>
    </div>
  );
}
