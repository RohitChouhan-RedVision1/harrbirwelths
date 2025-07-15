"use client";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useEffect, useState } from "react";

const Footer = ({ sitedata, servicedata, arn, socialmedialinks }) => {
  // console.log(socialmedialinks)
  const iconMap = {
    Facebook: <FaFacebookF className="text-[var(--rv-primary)]" />,
    Instagram: <FaInstagram className="text-[var(--rv-primary)]" />,
    Youtube: <FaYoutube className="text-[var(--rv-primary)]" />,
    Linkedln: <FaLinkedin className="text-[var(--rv-primary)]" />,
    Twitter: <FaXTwitter className="text-[var(--rv-primary)]" />,
  };
  const quicklinks = [
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "Contact Us",
      link: "/contact-us",
    },
    {
      title: "Blogs",
      link: "/blogs",
    },
    {
      title: "Financial Calculator",
      link: "/tools/calculators",
    },
    {
      title: "Financial Health",
      link: "/tools/financial-health",
    },
    {
      title: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      title: "Commission Disclosures",
      link: "/commission-disclosures",
    },
    {
      title: "Code of Conduct",
      link: "/AMFI_Code-of-Conduct1.pdf", // Put the actual path where your PDF is stored
      download: true, // custom flag for download
    },
  ];
  return (
    <footer className="bg-[var(--rv-secondary)]  bg-blend-overlay border-t-2 md:mt-88 sm:mt-88">
      <div className="mx-auto w-full max-w-screen-xl ">
        <div className="grid grid-cols-1  gap-3 py-6 md:grid-cols-2 lg:grid-cols-4 md:px-0 px-4">
          <div className="">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={200}
              className="p-4 bg-white rounded-[10px]"
            />
            <p className="mt-2 text-gray-50 py-4">
              {sitedata?.description?.slice(0, 435)}
            </p>
          </div>
          <div className="text-gray-50 md:pl-10">
            <h4 className="mb-5 font-bold">Services</h4>
            <ul className="">
              {servicedata?.map((sub, index) => (
                <li className="mb-4" key={index}>
                  {!sub.children || sub.children.length === 0 ? (
                    <Link
                      href={`/services/${sub.link}`}
                      className="hover:text-[var(--rv-primary)]"
                    >
                      <p>{sub.name}</p>
                    </Link>
                  ) : (
                    <ul className="">
                      {sub.children.map((child, childIndex) => (
                        <li key={childIndex} className="mb-1">
                          <Link
                            href={child.link}
                            className="hover:text-[var(--rv-primary)]"
                          >
                            <p>{child.name}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-gray-50">
            <h4 className="mb-5 text-md font-bold">Quick Links</h4>
            <ul className="">
              {quicklinks?.map((sub, index) => (
                <li className="mb-3" key={index}>
                  {sub.download ? (
                    <a
                      href={sub.link}
                      download
                      className="hover:text-[var(--rv-primary)]"
                    >
                      <p>{sub.title}</p>
                    </a>
                  ) : (
                    <Link
                      href={sub.link}

                      className="hover:text-[var(--rv-primary)]"
                    >
                      <p>{sub.title}</p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-gray-50">
            <h4 className="mb-5 text-md font-bold">Contact Us</h4>
            <ul className="font-medium">
              <li className="mb-5">
                <div className="text-gray-50 font-medium">
                  <div className="mb-4 flex items-center">
                    <p className="text-2xl font-semibold uppercase w-9 h-9 bg-white rounded-full flex items-center justify-center">
                      <IoCall className="text-[var(--rv-primary)]" />
                    </p>
                    <Link
                      href={`tel:${sitedata?.mobile}`}
                      className="hover:underline ml-3"
                    >
                      {sitedata?.mobile}
                    </Link>
                    {/* ,
                    <Link
                      href={`tel:${sitedata?.mobile?.slice(12)}`}
                      className="hover:underline ml-3"
                    >
                      {sitedata?.mobile?.slice(12)}
                    </Link> */}
                  </div>
                  <div className="mb-4 flex items-center">
                    <p className="text-2xl font-semibold uppercase w-9 h-9 bg-white rounded-full flex items-center justify-center">
                      <IoMail className="text-[var(--rv-primary)]" />
                    </p>
                    <Link
                      href={`mailto:${sitedata?.email}`}
                      className="hover:underline ml-3"
                    >
                      {sitedata?.email}
                    </Link>
                  </div>
                  <div className="mb-4 flex  items-center">
                    <p className="text-2xl font-semibold uppercase w-9 h-9 bg-white rounded-full flex items-center justify-center">
                      <IoLocationSharp className="text-[var(--rv-primary)]" />
                    </p>
                    <Link
                      href={`mailto:${sitedata?.address}`}
                      className="hover:underline w-48 ml-3"
                    >
                      {sitedata?.address}
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */}
        <div className="text-gray-50 py-3 md:px-1 px-4 text-center">
          <p className="py-1 text-center">
            {sitedata?.websiteName} is an AMFI Registered Mutual Fund
            Distributor.
          </p>
          <p className="py-2 text-center">
            Disclaimer: Mutual Fund investments are subject to market risks,
            read all scheme related documents carefully. The NAVs of the schemes
            may go up or down depending upon the factors and forces affecting
            the securities market including the fluctuations in the interest
            rates. The past performance of the mutual funds is not necessarily
            indicative of future performance of the schemes. The Mutual Fund is
            not guaranteeing or assuring any dividend under any of the schemes
            and the same is subject to the availability and adequacy
            distributable surplus.
          </p>
          <p className="py-2 text-center">
            {sitedata?.websiteName} makes no warranties or representations,
            express or implied, on products offered through the platform of{" "}
            {sitedata?.websiteName}. It accepts no liability for any damages or
            losses, however, caused, in connection with the use of, or on the
            reliance of its product or related services. Terms and conditions of
            the website are applicable. Investments in Securities markets are
            subject to market risks, read all the related documents carefully
            before investing.
          </p>
        </div>
        <div className="text-gray-50 py-3 flex gap-x-3 justify-center">
          <div className="flex gap-x-8 justify-center">
            <div className="flex gap-x-3 justify-center">
              <Image
                src={"/images/amfi-logo.jpg"}
                width={100}
                height={100}
                alt="image"
                className="rounded"
              />
              <div>
                <p>ARN - {arn[0]?.arn}</p>
                <p>EUIN - {arn[0]?.euins[0]?.euin}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-50 w-full mx-auto max-w-screen-xl p-4 md:flex md:justify-between border-t border-gray-300">
          <p className="sm:text-center">
            © 2025{" "}
            <Link href="/" className="hover:underline">
              {sitedata?.websiteName}
            </Link>
            . All Rights Reserved.
          </p>
          <div className="flex gap-x-3 justify-center">
          {socialmedialinks
            .filter((link) => !link.isHidden)
            .map((link, index) => (
              <Link key={index} target="_blank" href={link.url}>
                <div
                  className={`text-2xl font-semibold uppercase w-9 h-9 border bg-white rounded-full flex items-center justify-center `}
                >
                  {iconMap[link.title] || (
                    <FaXTwitter className="text-[var(--rv-primary)]" />
                  )}
                </div>
              </Link>
            ))}
        </div>
          <ul className="flex flex-wrap items-center mt-3  sm:mt-0  hidden">
            <li>
              <Link
                target="_blank"
                href="https://www.redvisiontechnologies.com/"
                className="hover:underline me-4 md:me-6"
              >
                <p>Designed & Developed by REDVision Global Technologies Pvt. Ltd.</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
