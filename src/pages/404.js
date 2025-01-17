import React from "react";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col items-center">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/illustration-notfound.jpg`}
        alt="Ooops we lost you"
      />
      <h1 className="text-3xl text-gray-900 mt-12">Opps! Kamu tersesat</h1>
      <p className="text-lg text-gray-600 mt-4 mtb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center">
        Halaman yang kamu cari tidak ada
      </p>
      <Link
        className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5"
        to="/"
      >
        Kembali ke beranda
      </Link>
    </section>
  );
}
