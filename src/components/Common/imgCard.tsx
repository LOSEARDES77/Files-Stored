import React from "react";

export default function Card({ src, title, lable = "", className }: imageCard) {
  return (
    <div className={className}>
        <img
          src={src}
          alt={title}
          className="rounded-xl"
        />
        <h2 className="card-title">{title}</h2>
        <p>{lable}</p>
    </div>
  );
}
