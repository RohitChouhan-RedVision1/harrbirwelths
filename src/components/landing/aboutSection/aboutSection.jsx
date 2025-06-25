"use client";
import React from "react";
import styles from "./AboutSection.module.css";
import Image from "next/image";
import SectionHeading from "../sectionHeading";
import Link from "next/link";

export default function AboutSection({sitedata}) {
  return (
    <div className="py-[30px] md:py-[60px]">
      <div
      className={`${styles.aboutContainer} max-w-screen-xl mx-auto px-3 md:px-0`}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="">
        <div className="flex flex-col">
          <div className="">
            <Image
              src={"/images/aboutus.webp"}
              alt="grid"
              width={500}
              height={500}
              className=""
            />
          </div>

          <div className={`${styles.whitePlaceholder} aniamtion-key-1`}>
                            <h1 className="text-[var(--rv-primary)] font-bold" >20+</h1>
                            <p className="font-medium text-lg">Qualified Team Members</p>
                        </div>
        </div>
      </div>
      <div className={styles.textContent}>
        <h3 className="font-semibold text-white text-anime-style-2">
          ABOUT US
        </h3>
        <h2 className="font-semibold mb-3 text-anime-style-1">
          Empowering Growth Through {sitedata?.websiteName}
        </h2>
        <p className=" mb-3">
          {sitedata?.websiteName} is a Wealth Management/Financial Planning
          Firm. This Firm running by professionals and Experience Management.
          Our Expertise is in "Need Base Financial Planning" which helps our
          customers to achieve their Financial Goals with proper Risk
          Management.
        </p>
        <p className="">
          {sitedata.description}
        </p>

        <div className="mt-4">
          <Link
              href={"/about-us"}
              className=""
            >
              <button className="primarybutton">Read More</button>
            </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
