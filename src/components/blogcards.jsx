import Link from 'next/link';
import React from 'react';

const BlogCards = ({ item }) => {
    return (
        <div className="p-1">
            <Link href={`/blogs/${item.slug}`} >
                <div className="  bg-white border border-gray-200 rounded-lg shadow  overflow-hidden mt-10">
                    <img
                        className="rounded-t-lg w-full h-48 object-cover"
                        src={item?.image?.url}
                        alt={item?.image?.url}
                    />
                    {/* Red date strip */}
                    <div className="bg-[var(--primary)] text-white text-sm font-semibold px-4 py-1 w-1/3">
                        {new Date(item?.createdAt).toLocaleDateString()}
                    </div>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">
                            {item.posttitle}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700  line-clamp-2">
                            {item.description || item.posttitle}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BlogCards;
