
import BlogCards from "@/components/blogcards";
import axios from "axios";
import React from "react";
import Loading from "./loading";
import { getBlogs } from "@/lib/functions";

const Blogs = async () => {
  const data= await getBlogs()
  return (
    <div className="">
      <div className="flex bg-center bg-no-repeat bg-cover bg-[url('/images/pay-premium/pay-premium.webp')] overflow-hidden text-start justify-start items-center h-64">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-gray-900 text-3xl md:text-5xl font-bold">
            Blogs
          </h1>
        </div>
      </div>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-10 py-[30px]">
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {/* <Suspense fallback={<Loading />}> */}
          {data?.map((item, index) => (
            <div key={index} className="mx-auto">
              <BlogCards item={item} />
            </div>
          ))}
        {/* </Suspense> */}
      </div>
    </div>
    </div>
  );
};

export default Blogs;
