"use client";
import React from "react";
import Link from "next/link";
import styles from './FeaturesSection.module.css';
import Image from "next/image";
import SectionHeading from "../sectionHeading";

export default function FeaturesSection({sitedata}) {
    const sectionDescription = "Discover the powerful tools and features we offer to help you manage your investments, track your financial goals, and make informed decisions with ease.";

    const features = [
        {
            title: "Portfolio Analysis",
            icon: "/icons/portfolio-analysis.svg",
            description: "Gain deep insights into your investment portfolio with detailed analytics, performance tracking, and risk assessment to optimize your returns."
        },
        {
            title: "Invest Online",
            icon: "/icons/invest-online.svg",
            description: "Seamlessly invest in a wide range of mutual funds, stocks, and other financial products online with just a few clicks."
        },
        {
            title: "Goal Tracker",
            icon: "/icons/goal tracker.svg",
            description: "Set and monitor your financial goals, such as retirement or education savings, and stay on track with personalized recommendations."
        },
        {
            title: "Research",
            icon: "/icons/research.svg",
            description: "Access in-depth research reports, market trends, and fund performance data to make well-informed investment decisions."
        },
    ];

    return (
        <div className="relative">
            <div className={`${styles.featuresContainer} max-w-screen-xl mx-auto`}>
                <div className={styles.gridBackground}></div>
                <div className={styles.textContent}>
                    <SectionHeading
                        heading="Features"
                        title="Top Features We Provide"
                        variant="light"
                        align="start"
                    />
                    <p className={`${styles.paragraph} mt-2 text-xl max-w-6xl`}>
                        {sectionDescription}
                    </p>
                    <Link href="/login">
                        <button className="primarybutton mt-5">Know More</button>
                    </Link>

                    <div className="flex flex-col md:flex-row items-center">
            <Image
                                src={"/images/mobile.png"}
                                alt={"mobile"}
                                width={300}
                                height={100}

                            />
         <div className="flex flex-col items-center justify-center gap-5">
          <Link  href={sitedata?.appsplaystoreurl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <button
            className="text-white text-2xl font-semibold px-10 py-6 rounded-2xl cursor-pointer"
            style={{
              backgroundImage: `url(/Playstore.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "200px", // Ensures button width increases
            }}
          >
            
          </button>
        </Link>
        <Link  href={sitedata?.appsappleurl} target="_blank" rel="noopener noreferrer" className="cursor-pointer ">
          <button
            className="text-white text-2xl font-semibold px-10 py-6 rounded-2xl cursor-pointer"
            style={{
              backgroundImage: `url(/Appstore.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "200px", // Ensures button width increases
            }}
          >
            
          </button>
        </Link>
         </div>
          </div>

                    
                </div>
                <div className={styles.cardsContainer}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card} data-aos="fade-left" data-aos-duration="1000">
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={60}
                                height={60}
                                className={styles.cardIcon}
                            />
                            <h3 className="font-semibold text-white">{feature.title}</h3>
                            <p className="text-lg text-gray-200">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}