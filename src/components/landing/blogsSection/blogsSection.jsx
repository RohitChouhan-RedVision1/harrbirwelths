"use client";
import React from "react";
import styles from './BlogsSection.module.css';
import Image from "next/image";
import SectionHeading from "../sectionHeading";
import { CalendarRange, User } from "lucide-react";
import Link from "next/link";

import { format } from 'date-fns';

export default function BlogSection({blogs}) {
    // console.log(blogs)
    return (
        <div className={`${styles.blogContainer}`}>
            <div className=" max-w-screen-xl mx-auto">
                {/* Grid Background */}
                <div className={styles.gridBackground}></div>

                {/* Heading */}
                <SectionHeading heading="Blogs" title="Latest Blog" variant="dark" align="center" />

                {/* Blog Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 z-1 relative mt-10">
                    <Link href={`/blogs/${blogs[0]?.slug}`}>
                    <div className="p-5 bg-white rounded-3xl border">
                        <Image
                            src={blogs[0]?.image.url}
                            alt={blogs[0]?.posttitle}
                            width={200}
                            height={200}
                            className="w-full rounded-[30px]"
                            // className={styles.cardImageLarge}
                        />
                        <div className="flex flex-col justify-between py-1">
                            <h3 className='text-3xl font-semibold mb-2 line-clamp-3'>{blogs[0]?.posttitle}</h3>
                            <div className={styles.cardMeta}>
                                <div className={styles.metaItem}>
                                    <CalendarRange className={styles.metaIcon} />
                                    <p >{format(new Date(blogs[0]?.createdAt), 'dd MMMM yyyy')}</p>
                                </div>
                                <div className={styles.metaItem}>
                                    <User className={styles.metaIcon} />
                                    <p >ADMIN</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                    <div className="grid grid-rows-2 gap-5">
                        {blogs?.slice(1).map((blog, index) => (
                            <Link key={index} href={`/blogs/${blog?.slug}`}>
                            <div key={index} className={styles.cardSmall}>
                                <Image
                                    src={blog?.image?.url}
                                    alt={blog?.posttitle}
                                    width={200}
                                    height={200}
                                    className={`pr-3 ${styles.cardImageSmall}`}
                                />
                                <div className="flex flex-col justify-between py-5">
                                    <h3 className='text-3xl font-semibold mb-5 line-clamp-3'>{blog?.posttitle}</h3>
                                    <div className={styles.cardMeta}>
                                        <div className={styles.metaItem}>
                                            <CalendarRange className={styles.metaIcon} />
                                            <p className="text-lg">{format(new Date(blog?.createdAt), 'dd MMMM yyyy')}</p>
                                        </div>
                                        <div className={styles.metaItem}>
                                            <User className={styles.metaIcon} />
                                            <p className="text-lg">Admin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}