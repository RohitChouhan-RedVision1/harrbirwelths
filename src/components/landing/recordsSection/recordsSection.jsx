"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./RecordsSection.module.css";
import SectionHeading from "../sectionHeading";

export default function RecordsSection() {
    const cards = [
        { count: 30, title: "AWARDS From Different Asset Management Companies", link: "", prefix: "" },
        { count: 15, title: "RECOGNITION internationally", link: "", prefix: "" },
        { count: 5, title: "YEARS Consecutive MDRT USA & COT 2023 (2020, 2021, 2022, 2023, 2024)", link: "", prefix: "" },
        { count: 3, title: "YEARS Consecutive SIP Champions Award from Nippon at International Stage (2018, 2019, 2020)", link: "", prefix: "" },
    ];

    const [animatedCounts, setAnimatedCounts] = useState(
        cards.map((card) => ({ ...card, currentCount: 0 }))
    );
    const sectionRef = useRef(null); // Create a ref for the section
    const [hasAnimated, setHasAnimated] = useState(false); // To ensure the animation runs only once

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true); // Set to true to prevent further animations
                        animatedCounts.forEach((item, index) => {
                            const targetCount = item.count;
                            const duration = 2000; // Duration in milliseconds
                            const startTime = performance.now();

                            const animateCount = (timestamp) => {
                                const elapsed = timestamp - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const currentCount = Math.floor(progress * targetCount);
                                setAnimatedCounts((prevCounts) => {
                                    const newCounts = [...prevCounts];
                                    newCounts[index].currentCount = currentCount;
                                    return newCounts;
                                });

                                if (progress < 1) {
                                    requestAnimationFrame(animateCount);
                                }
                            };

                            requestAnimationFrame(animateCount);
                        });
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current); // Start observing the section
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current); // Clean up the observer
            }
        };
    }, [animatedCounts, hasAnimated]);

    return (
        <div className={styles.recordsContainer} ref={sectionRef}>
            <SectionHeading heading="ACHIEVEMENTS" title="Milestones We Achieved" variant="dark" />
            {/* Statistics */}
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-screen-xl mx-auto gap-5"} data-aos="fade-up" data-aos-duration="1000">
                {animatedCounts.map((item, index) => (
                    <div key={index} className={styles.stat}>
                        <p className={styles.number}>
                            {Math.round(item.currentCount)}{item.prefix}+
                        </p>
                        <p className={styles.label}>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}