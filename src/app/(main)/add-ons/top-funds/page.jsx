// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";

// export default function AdvisorCategory() {
//     const [categories, setCategories] = useState([]);
//     const [categoriesFunds, setCategoriesFunds] = useState([]);
//     const [selectedCatId, setSelectedCatId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const arnId = "2612"; // Static input 1
//     const schemeCategory = "selectByAdvisor"; // Static input 3

//     // Fetch categories from the first API
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(
//                     "https://redvisionweb.com/api/advisor-scheme-category?apikey=351b03c24a79d2f40796037e0d8c2c49",
//                     {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ arnId: arnId }),
//                     }
//                 );

//                 const result = await response.json();
//                 if (result.status && result.data.length > 0) {
//                     setCategories(result.data);
//                     setSelectedCatId(result.data[0].catId); // Auto-select first category
//                 }
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     // Function to call second API when a category is clicked
//     const handleCategoryClick = async (catId) => {
//         const myId = catId ? catId : selectedCatId;
//         setSelectedCatId(myId);
//         setLoading(true);
//         setCategoriesFunds([]);
//         try {
//             const response = await axios.post(
//                 "https://redvisionweb.com/api/advisor-scheme-category-funds?apikey=351b03c24a79d2f40796037e0d8c2c49",
//                 { arnId: arnId, category: myId, schemeCategory: schemeCategory }
//             );

//             // Assuming response.data.data contains schemeName, fundSize, oneYearReturn, threeYearReturn, fiveYearReturn
//             setCategoriesFunds(response?.data?.data || []);
//         } catch (error) {
//             console.error("Error fetching schemes:", error);
//         }
//         setLoading(false);
//     };

//     useEffect(() => {
//         handleCategoryClick();
//     }, [selectedCatId]);

//     // Helper function to render dynamic stars
//     const renderStars = (rating) => {
//         const totalStars = 5;
//         const filledStars = Math.round(rating) || 0; // Round to nearest integer, default to 0 if undefined
//         const emptyStars = totalStars - filledStars;

//         return (
//             <span className="flex">
//                 {Array(filledStars)
//                     .fill()
//                     .map((_, i) => (
//                         <span key={`filled-${i}`} className="text-yellow-500">★</span>
//                     ))}
//                 {Array(emptyStars)
//                     .fill()
//                     .map((_, i) => (
//                         <span key={`empty-${i}`} className="text-gray-300">☆</span>
//                     ))}
//             </span>
//         );
//     };

//     return (
//         <section className="advisor-category-funds main_section">
//             <div className="container max-w-screen-xl mx-auto px-4">
//                 <h1 className="text-3xl font-bold text-[var(--rv-primary)] mb-4 uppercase">top funds</h1>
//                 <h2 className="text-4xl font-bold text-[var(--rv-secondary)] mb-8">Explore Mutual Fund Collections</h2>
//                 <div className="flex flex-col md:flex-row gap-8">
//                     {/* Left Sidebar for Categories */}
//                     <div className="w-full md:w-1/4 bg-red-50 p-4 rounded-lg">
//                         <div className="space-y-4">
//                             {categories.map((category) => (
//                                 <div key={category.catId} className="flex flex-col items-center gap-2">
//                                     <div
//                                         className={`w-14 h-14 cursor-pointer flex justify-center items-center rounded-full ${selectedCatId !== category.catId ? 'bg-white' : 'bg-gray-100 ring ring-[var(--rv-primary)]'} border`}
//                                         onClick={() => handleCategoryClick(category.catId)}
//                                     >
//                                         <Image
//                                             src={category.categoryImage}
//                                             alt={category.categoryName}
//                                             width={30}
//                                             height={35}
//                                             className="mt-2 rounded object-cover"
//                                         />
//                                     </div>
//                                     <p className="font-medium">{category.categoryName}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Right Section for Fund Performance Table */}
//                     <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow border border-gray-200">
//                         {loading ? (
//                             <p className="text-center">Loading...</p>
//                         ) : (
//                             <div className="overflow-x-auto">
//                                 <table className="w-full text-left border-collapse">
//                                     <thead>
//                                         <tr className="bg-gray-100">
//                                             <th className="p-3 text-sm font-semibold text-gray-600">Fund Name</th>
//                                             <th className="p-3 text-sm font-semibold text-gray-600">Fund NAV (₹)</th>
//                                             <th className="p-3 text-sm font-semibold text-gray-600">1Y Returns</th>
//                                             <th className="p-3 text-sm font-semibold text-gray-600">3Y Returns</th>
//                                             <th className="p-3 text-sm font-semibold text-gray-600">5Y Returns</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {categoriesFunds.length > 0 ? (
//                                             categoriesFunds.map((fund, index) => (
//                                                 <tr key={index} className="border-t">
//                                                     <td className="p-3">
//                                                         <p>{fund.schemeName}</p>
//                                                         <div className="flex items-center gap-2">
//                                                             <span className="text-gray-800 text-sm font-semibold">{fund.subcatogary}</span>/
//                                                             <span className="text-gray-800 text-sm font-semibold">{fund.schemeType}</span>
//                                                             {renderStars(fund.starRating)}
//                                                             {console.log(fund)}
//                                                         </div>
//                                                     </td>
//                                                     <td className="p-3 text-gray-600">₹{fund.nav || "N/A"}</td>
//                                                     <td className="p-3 text-gray-600">{fund.oneYearPer || "N/A"}%</td>
//                                                     <td className="p-3 text-gray-600">{fund.threeYearPer || "N/A"}%</td>
//                                                     <td className="p-3 text-gray-600">{fund.fiveYearPer || "N/A"}%</td>
//                                                 </tr>
//                                             ))
//                                         ) : (
//                                             <tr>
//                                                 <td colSpan="5" className="p-3 text-center text-gray-500">
//                                                     No data available
//                                                 </td>
//                                             </tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }