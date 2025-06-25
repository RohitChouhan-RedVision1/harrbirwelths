"use client";
import React, { useState } from "react";
import styles from "./Contact.module.css";
import Image from "next/image";
import SectionHeading from "../sectionHeading";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ContactReusableForm from "./Contactreusableform";

export default function ContactUsFormSection({ sitedata }) {
  return (
    <div className="max-w-screen-xl mx-auto py-[30px] md:py-[60px]">
      <div
        className={`${styles.consultationContainer} grid grid-cols-1 md:grid-cols-2`}
      >
        <div className={styles.imageContainer}>
          <Image
            src="/images/contact-women.webp"
            alt="Person working at desk"
            width={600}
            height={400}
            className={styles.consultationImage}
          />
        </div>

        <div className={styles.formContainer}>
          <SectionHeading
            heading="Let's Talk"
            title="Free Consultation"
            variant="dark"
            align="start"
          />

         <ContactReusableForm sitedata={sitedata}/>
        </div>
      </div>
    </div>
  );
}
