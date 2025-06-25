"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const UsefulLinksPage = () => {
  const [usefulLink, setUsefulLink] = useState([]);
  const fetchLinks = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/useful-links?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (res.ok) {
      const data = await res.json();
      setUsefulLink(data);
    }
  };
  // useEffect(() => { fetchservice(); }, []);
  useEffect(() => {
    fetchLinks();
  }, []);
  return (
    <div className="">
      <div className="flex bg-center bg-no-repeat bg-cover bg-[url('/images/pay-premium/pay-premium.webp')] bg-gray-500 overflow-hidden text-center justify-center items-center h-64">
                <h1 className="text-gray-900 text-3xl md:text-5xl font-bold">Useful Links</h1>
            </div>
    <div className="">
      <div className="container mx-auto md:px-20 px-4 pt-5">
        <div className="py-[30px] md:py-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usefulLink.map((link, index) => (
            <Link href={link.link} key={index} legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--rv-secondary)] text-white border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition hover:bg-[var(--rv-primary)] hover:text-white duration-300 flex flex-col justify-center items-center"
              >
                <h3 className="text-xl font-semibold">{link.title}</h3>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UsefulLinksPage;
