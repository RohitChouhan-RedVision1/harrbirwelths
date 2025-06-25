"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRegCheckCircle } from "react-icons/fa";

export async function generatemetadata() {
  return {
    title: "About Book | Ethicus Wealth",
    description: "Learn more about our book on wealth creation and financial planning.",
  };
}

export default async function AboutBook() {
  return (
    <div>
      {/* Hero Section */}
      <div className="flex bg-center bg-no-repeat bg-cover bg-[url('/images/pay-premium/pay-premium.webp')] overflow-hidden text-start justify-start items-center h-64">
        <div className="max-w-screen-xl mx-auto px-4">
         <h1 className="text-gray-900 text-3xl md:text-5xl font-bold">
  About the Book
</h1>

        </div>
      </div>

      {/* Introduction Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="md:my-20 my-10 md:px-0 px-4"
      >
        <h2 className="text-4xl text-[var(--rv-primary)] md:text-5xl font-bold mb-6 text-center">
          Your Guide to Smarter Financial Decisions
        </h2>
        <p className="text-gray-800 max-w-5xl mx-auto text-center mb-10 leading-[30px]">
          Wealth management is more than just numbers—it’s about making smart financial decisions that secure your future. This book is your guide to understanding investments, asset allocation, risk management, and financial planning. Whether you're a beginner or an experienced investor, you’ll find valuable insights to grow and protect your wealth. With practical strategies and expert knowledge, this book empowers you to take control of your financial journey with confidence. It simplifies complex financial concepts, helping you make informed decisions. Start your journey towards financial freedom today!
        </p>

        {/* Book Image */}
        <div className="flex justify-center mb-10">
          <Image
            src="/images/aboutbook.jpg" // Replace with your actual path
            alt="Ethicus Wealth Book"
            width={300}
            height={400}
            className="rounded-lg shadow-lg w-full max-w-xs md:max-w-sm"
          />
        </div>

        {/* Text & Buy Now Button */}
        <div className="text-center">
          <p className="text-lg text-gray-800 mb-4">
            Ready to transform your financial life? Grab your copy now and take the first step toward a wealthier future.
          </p>
          <Link href="https://www.amazon.in/Mera-Wealth-Plan-Creation/dp/9361945912/ref=mp_s_a_1_1?crid=1BOQ22W779UUY&dib=eyJ2IjoiMSJ9.7udFCYcINmjGZG5xvHsdzl_xkrdF3gEMADqugueAXNE.0hpFX-zLkKu855qbLFUn81AGZIoKj4-F2xdg6rJGWAY&dib_tag=se&keywords=mera+wealth+plan&qid=1746859126&sprefix=mera+wealth+plan,aps,364&sr=8-1" target="_blank">
            <button className="primarybutton">
              Buy Now
            </button>
          </Link>
        </div>
      </motion.section>

      
    </div>
  );
}
