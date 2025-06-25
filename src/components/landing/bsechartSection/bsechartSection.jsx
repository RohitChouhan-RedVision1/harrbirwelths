"use client";
import React, { useEffect, useState } from "react";
import styles from './bsechartSection.module.css'
import SectionHeading from "../sectionHeading";
import axios from "axios";
import { BseReturnChart } from "@/components/charts/bseReturnChart";

export default function BseChartSection() {
    const [graphData, setGraphData] = useState([]);

    const fetchGraphData = async () => {
        try {
            const response = await axios.post("https://wealthelite.in/eliteN/bse-schemes/get-sensex-data", {
                startDate: "1997-01-01",
                endDate: "2025-03-19",
            });
            console.log("Response:", response.data);
            if (response.status === 200) {
                const data = response.data.data;
                setGraphData(data);
            }
        } catch (error) {
            console.error("Error fetching graph data:", error);
        }
    };

    useEffect(() => {
        fetchGraphData();
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto md:mt-20 mt-10 px-3 md:px-0">
            <div className={styles.consultationContainer}>
                {/* Heading and Description */}
                <div className={styles.imageContainer}>
    <SectionHeading title="What Early Investing Can Do" variant="light" align="center" />
    <p className="mt-3 max-w-4xl text-lg mx-auto text-center">
        Starting your investment journey early allows your money to grow over time through the power of compounding. Even small contributions made consistently can lead to significant wealth creation, helping you achieve long-term financial goals with greater ease.
    </p>
</div>

                {/* Chart and Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
                    <div className="col-span-1 md:col-span-2">
                        <BseReturnChart data={graphData} />
                    </div>
                    <div className="col-span-1 bg-gradient-to-br from-[var(--rv-secondary)] via-[var(--rv-secondary)] to-[#0260435c] rounded-xl p-6 md:p-8 text-white">
                        <div className="grid grid-cols-6 items-center gap-2 mb-3">
                            <svg
                                version="1.1"
                                id="fi_190411_3"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 507.2 507.2"
                                style={{ fill: 'var(--rv-primary)' }}
                                xmlSpace="preserve"
                                className="w-7 col-span-1"
                            >
                                <circle cx="253.6" cy="253.6" r="253.6" />
                                <g>
                                    <path
                                        style={{ fill: "#FFFFFF" }}
                                        d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                                            c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
                                    />
                                    <path
                                        style={{ fill: "#FFFFFF" }}
                                        d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                                            c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
                                    />
                                </g>
                            </svg>
                            <p className="mt-4 col-span-5 text-2xl">Here is the BSE data from initial to current date.</p>
                        </div>
                        <div className="grid grid-cols-6 items-center gap-2 mb-3">
                            <svg
                                version="1.1"
                                id="fi_190411_3"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 507.2 507.2"
                                style={{ fill: 'var(--rv-primary)' }}
                                xmlSpace="preserve"
                                className="w-7 max-w-1/2"
                            >
                                <circle cx="253.6" cy="253.6" r="253.6" />
                                <g>
                                    <path
                                        style={{ fill: "#FFFFFF" }}
                                        d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                                            c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
                                    />
                                    <path
                                        style={{ fill: "#FFFFFF" }}
                                        d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                                            c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
                                    />
                                </g>
                            </svg>
                            <p className="mt-2 col-span-5 text-2xl">If you invested ₹1,00,000 10 years ago, its present value would be ₹9,93,993.</p>
                        </div>
                        <div className="grid grid-cols-6 items-center gap-2">
                            <svg
                                version="1.1"
                                id="fi_190411_3"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 507.2 507.2"
                                style={{ fill: 'var(--rv-primary)' }}
                                xmlSpace="preserve"
                                className="w-7"
                            >
                                <circle cx="253.6" cy="253.6" r="253.6" />
                                <g>
                                    <path
                                        style={{ fill: "#FFFFFF" }}
                                        d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                                            c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
                                    />
                                    <path
                                        style={{ fill: "#FFFFFF" }}
                                        d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                                            c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
                                    />
                                </g>
                            </svg>
                            <p className="mt-2 col-span-5 text-2xl">The above calculation is made using the Lumpsum Calculator below.</p>
                        </div>
                    </div>
                </div>
                <h4 className="text-center my-8 text-[var(--rv-secondary)]">Sensex Data from Inception to Present Date: A Comprehensive Overview </h4>
            </div>
        </div>
    );
}