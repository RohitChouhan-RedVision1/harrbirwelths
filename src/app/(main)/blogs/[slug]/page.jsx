import BlogCards from "@/components/blogcards";
import formatDate from "@/lib/formatDate";
import axios from "axios";
import Image from "next/image";
import Loading from "../loading";
import { getBlogBySlug, getBlogs } from "@/lib/functions";

// FETCH DATA WITH AN API
  



const SinglePostPage = async ({ params }) => {
    const { slug } = await params;
    // console.log(slug)
  
    let post, recentPost;
  
    try {
      post=await getBlogBySlug(slug)
      // console.log(post)
     recentPost=await getBlogs()
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return <div className="text-red-500">Failed to load blog post.</div>;
    }
  
    function createMarkup() {
      return { __html: post?.content };
    }
  
    return (
      <div className="max-w-screen-xl mx-auto">
        <div className="flex  py-10 flex-col">
          <div className="text-left">
            <div className="mb-16">
              <h1 className="text-5xl font-bold text-gray-800 mb-5">{post?.posttitle}</h1>
              <span className=" text-gray-800">Published </span>
              <span className=" text-purple-800">{formatDate(post?.createdAt)}</span>
            </div>
  
            {post?.image?.url && (
              <Image
                src={post.image.url}
                alt={post.image.url}
                width={900}
                height={600}
                className="rounded"
              />
            )}
  
            <div className="mb-10">
              <div className="my-5" dangerouslySetInnerHTML={createMarkup()} />
            </div>
          </div>
  
          <div>
            <h1 className="font-bold text-2xl mb-4">Recent Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recentPost?.slice(0, 6).map((item, index) => (
                <BlogCards key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default SinglePostPage;