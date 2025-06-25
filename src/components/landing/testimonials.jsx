"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import SectionHeading from "./sectionHeading";
import { Dialog } from "@radix-ui/react-dialog";

export default function Testimonials({testimonials,sitedata}) {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function createMarkup(item) {
    return { __html: item };
  }

  const handleReadMore = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsOpen(true);
  };

  return (
    <section className="py-[30px] lg:py-[60px]">
      <div className="max-w-screen-xl mx-auto md:px-1 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <SectionHeading
              heading="Testimonials"
              title="Discover What Clients Say About Us"
              align="start"
            />
            <p className="text-lg mt-4">
              Hear directly from our clients about how {sitedata?.websiteName} has helped them
              achieve their financial goals with ease and confidence.
            </p>
          </div>

          <div className="md:col-span-3">
            <Carousel
              className="lg:max-w-6xl md:max-w-3xl max-w-sm mx-auto"
              plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]} // Auto-slide every 5 seconds
            >
              <CarouselContent className="-ml-1">
                {testimonials?.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/2"
                  >
                    <div className="p-1">
                      <Card className="h-64 flex flex-col justify-between bg-[var(--rv-secondary)] border-0 overflow-hidden">
                        <div className="flex items-center justify-center px-6 py-4 flex-grow relative">
                          <div className="text-white max-h-[4.5rem] overflow-hidden relative line-clamp-3">
                            <div
                              dangerouslySetInnerHTML={createMarkup(
                                item?.content
                              )}
                            />
                          </div>
                          <button
                            onClick={() => handleReadMore(item)}
                            className="absolute bottom-7 left-6 text-[var(--rv-white)] hover:underlin"
                          >
                            Read More
                          </button>
                        </div>
                        <div className="flex px-6 py-2 items-center">
                          <div className="rounded-full w-16 h-16">
                            <Image
                              src={
                                item?.image?.url || "/images/placeholder.jpg"
                              }
                              alt={item?.author || "Author"}
                              width={120}
                              height={100}
                              className="rounded-full object-cover w-full h-full"
                            />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-semibold text-white">
                              {item?.author}
                            </h4>
                            <p className="text-sm text-gray-300">{item?.designation}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Modal for full testimonial */}
      {selectedTestimonial && isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="relative bg-white w-full max-w-xl mx-auto p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-2">
                {selectedTestimonial?.author}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {selectedTestimonial?.designation}
              </p>
              <div
                dangerouslySetInnerHTML={createMarkup(
                  selectedTestimonial?.content
                )}
                className="text-gray-700"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 bg-[var(--rv-primary)] text-white px-4 py-2 rounded hover:bg-[var(--rv-secondary)]"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
}
