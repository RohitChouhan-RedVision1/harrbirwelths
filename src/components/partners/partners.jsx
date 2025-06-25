"use client";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { motion } from "framer-motion";
const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 }
    })
  };
const SubscribCard = () => {
    const images = [
        "/AMC NEW LOGOS/all/mf1.png",
        "/AMC NEW LOGOS/all/mf2.png",
        "/AMC NEW LOGOS/all/mf5.png",
        "/AMC NEW LOGOS/all/mf4.png",
        "/AMC NEW LOGOS/all/mf6.png",
        "/AMC NEW LOGOS/all/mf7.png",
        "/AMC NEW LOGOS/all/mf8.png",
        "/AMC NEW LOGOS/all/mf10.png",
        "/AMC NEW LOGOS/all/mf11.png",
        "/AMC NEW LOGOS/all/mf12.png",
        "/AMC NEW LOGOS/all/mf14.png",
        "/AMC NEW LOGOS/all/mf15.png",
        "/AMC NEW LOGOS/all/mf18.png",
        "/AMC NEW LOGOS/all/mf19.png",
        "/AMC NEW LOGOS/all/mf20.png",
        "/AMC NEW LOGOS/all/mf24.png",
        "/AMC NEW LOGOS/all/mf25.png",
        "/AMC NEW LOGOS/all/mf31.png",
        "/AMC NEW LOGOS/all/mf32.png",
        "/AMC NEW LOGOS/all/mf33.png",
        "/AMC NEW LOGOS/all/mf34.png",
        "/AMC NEW LOGOS/all/mf35.png",
        "/AMC NEW LOGOS/all/mf36.png",
        "/AMC NEW LOGOS/all/mf37.png",


    ];
    return (
        <div className="bg-[#FFD2D3]">
            <div className="max-w-screen-xl px-10 py-[30px] md:py-[60px] mx-auto text-center border-b-1 text-gray-400 ">
                {/* <motion.h2 initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInVariants}
          custom={0}
           className="topheading  text-[#0E314D] ">PARTNERS</motion.h2> */}
            <Carousel
                className="w-full mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >
                <CarouselContent className="ml-1">
                    {images.map((src, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <div className="px-5 ">
                                <Image
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    width={160}
                                    height={160}
                                    className="opacity-50 hover:opacity-100 transition ease-in-out duration-75"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
        </div>
    );
};

export default SubscribCard;