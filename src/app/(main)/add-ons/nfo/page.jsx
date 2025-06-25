// "use client";
// import axios from "axios";
// import React, { Suspense, useState, useEffect } from "react";
// import Loader from "@/components/admin/common/Loader";
// import Link from "next/link";
// import Image from "next/image";
// import formatDate from "@/lib/formatDate";

// // Function to format date to YYYY-MM-DD
// const formatDateToYYYYMMDD = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
// };

// const UpcomingNFO = () => {
//     const [data, setData] = useState([]);
//     const [imageUrl, setImageUrl] = useState("");

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get("https://redvisionweb.com/api/open-apis/upcoming-nfo");
//                 console.log(res.data);
//                 if (res.status) {
//                     setData(res.data.data);
//                     setImageUrl(res.data.imageUrl || "");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch NFO data", error);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <div className="max-w-screen-xl mx-auto px-4 md:px-10 main_section">
//             <div className="text-center mb-10">
//             <h1 className="text-3xl font-bold text-[var(--rv-primary)] mb-4 uppercase">Upcoming New Fund Offers (NFO)</h1>
//             <h2 className="text-4xl font-bold text-[var(--rv-secondary)] mb-8">Explore the latest opportunities to invest in new funds.</h2>
                
//             </div>
//             <div className="space-y-6">
//                 <Suspense fallback={<Loader />}>
//                     {data.length > 0 ? (
//                         data.map((item, index) => (
//                             <Link
//                                 key={index}
//                                 href={`/nfo/${item.slug}`}
//                                 className="block bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-4 hover:bg-gray-50"
//                             >
//                                 <div className="flex items-center justify-between gap-6">
//                                     <div className="flex items-center gap-6">
//                                         <Image
//                                             src={`${imageUrl}/${item.amcLogo}`}
//                                             alt={item.schemeName}
//                                             width={80}
//                                             height={80}
//                                             className="object-cover"
//                                         />
//                                         <div>
//                                             <h3 className="text-lg font-bold text-gray-900">{item.schemeName}</h3>
//                                             <p className="text-sm text-gray-500 font-semibold">{item.schemeType}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-6">
//                                         <div className="flex flex-col items-center gap-2">
//                                             <p className="font-medium">Launch Date</p>
//                                             <p> {formatDateToYYYYMMDD(formatDate(item.startDate))}</p>
//                                         </div>
//                                         <div className="flex flex-col items-center gap-2">
//                                             <p className="font-medium">Close Date</p>
//                                             <p>{formatDateToYYYYMMDD(formatDate(item.endDate))}</p>
//                                         </div>
//                                         <div className="flex flex-col items-center gap-2">
//                                             <p className="font-medium">Min. Sip</p>
//                                             <p>₹{item.minimumPurchaseAmount}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))
//                     ) : (
//                         <div className="text-center text-gray-500 text-xl py-10">
//                             No upcoming NFOs available.
//                         </div>
//                     )}
//                 </Suspense>
//             </div>
//         </div>
//     );
// };

// export default UpcomingNFO;