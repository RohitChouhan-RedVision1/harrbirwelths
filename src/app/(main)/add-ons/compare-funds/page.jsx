// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import formatDate from "@/lib/formatDate";
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbSeparator,
//     BreadcrumbPage,
// } from "@/components/ui/breadcrumb";
// import CompareFundsTable from "@/components/tables/compareFundsTable";
// import CompareFundsTable2 from "@/components/tables/compareFundsTable2";
// import FundComparisonChart from "@/components/charts/fundComparisonChart";

// export default function CompareFundForm() {
//     const [searchResults, setSearchResults] = useState([[], [], [], [], []]);
//     const [searchQueries, setSearchQueries] = useState(["", "", "", "", ""]);
//     const [selectedFunds, setSelectedFunds] = useState(["", "", "", "", ""]);
//     const [selectedFundsNames, setSelectedFundsNames] = useState([
//         "",
//         "",
//         "",
//         "",
//         "",
//     ]);
//     const [investmentAmount, setInvestmentAmount] = useState("10000");
//     const [startDate, setStartDate] = useState(getTodayDate());
//     const [maturityDate, setMaturityDate] = useState(getTodayDate());
//     const [compareSensex, setCompareSensex] = useState(0);
//     const [comparePPF, setComparePPF] = useState(0);
//     const [showEvents, setShowEvents] = useState(0);
//     const [isLoading, setIsLoading] = useState(false); // Adjust loading state
//     const [allFunds, setAllFunds] = useState([]);
//     const [responseData, setResponseData] = useState(null); // To store the response data
//     const [error, setError] = useState(null); // To store error information

//     useEffect(() => {
//         const fetchAllFunds = async () => {
//             try {
//                 const response = await fetch(
//                     `https://redvisionweb.com/api/all-scheme-portfolio?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
//                 );
//                 const data = await response.json();
//                 setAllFunds(data.data);
//             } catch (error) {
//                 toast.error("Error Fetching Funds");
//                 console.error("Error fetching funds:", error);
//             }
//         };
//         fetchAllFunds();
//     }, []);

//     function getTodayDate() {
//         const today = new Date();
//         const yyyy = today.getFullYear();
//         const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//         const dd = String(today.getDate()).padStart(2, "0");
//         return `${yyyy}-${mm}-${dd}`;
//     }

//     const searchFunds = (query, index) => {
//         if (!query.trim()) {
//             const newSearchResults = [...searchResults];
//             newSearchResults[index] = [];
//             setSearchResults(newSearchResults);
//             return;
//         }

//         const queryWords = query.trim().toLowerCase().split(" ");

//         const filteredFunds = allFunds
//             .filter(
//                 (fund) =>
//                     queryWords.every((word) =>
//                         fund.funddes.toLowerCase().includes(word)
//                     ) && !selectedFunds.includes(fund.pcode)
//             )
//             .slice(0, 5);

//         const newSearchResults = [...searchResults];
//         newSearchResults[index] = filteredFunds;
//         setSearchResults(newSearchResults);
//     };

//     const handleSearchChange = (value, index) => {
//         const newQueries = [...searchQueries];
//         newQueries[index] = value;
//         setSearchQueries(newQueries);

//         const timeoutId = setTimeout(() => {
//             searchFunds(value, index);
//         }, 300);

//         return () => clearTimeout(timeoutId);
//     };

//     const selectFund = (fundPcode, index) => {
//         if (selectedFunds.includes(fundPcode)) {
//             alert("This fund is already selected. Please choose a different fund.");
//             return;
//         }

//         const newSelectedFunds = [...selectedFunds];
//         const newSelectedFundsNames = [...selectedFundsNames];
//         newSelectedFunds[index] = fundPcode;
//         newSelectedFundsNames[index] = allFunds.find(
//             (fund) => fund.pcode === fundPcode
//         ).funddes;
//         setSelectedFunds(newSelectedFunds);
//         setSelectedFundsNames(newSelectedFundsNames);

//         const newSearchResults = [...searchResults];
//         newSearchResults[index] = [];
//         setSearchResults(newSearchResults);

//         const selectedFund = allFunds.find((fund) => fund.pcode === fundPcode);
//         const newQueries = [...searchQueries];
//         newQueries[index] = selectedFund ? selectedFund.funddes : "";
//         setSearchQueries(newQueries);
//     };

//     const clearSelectedFund = (index) => {
//         const newSelectedFunds = [...selectedFunds];
//         const newSelectedFundsNames = [...selectedFundsNames];
//         newSelectedFunds[index] = "";
//         newSelectedFundsNames[index] = "";
//         setSelectedFunds(newSelectedFunds);
//         setSelectedFundsNames(newSelectedFundsNames);

//         const newQueries = [...searchQueries];
//         newQueries[index] = "";
//         setSearchQueries(newQueries);
//     };

//     const handleCheckboxChange = (setter) => (checked) => {
//         setter(checked ? 1 : 0);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check if at least two funds are selected
//         const selectedFundsCount = selectedFunds.filter((fund) => fund !== "").length;
//         if (selectedFundsCount < 2) {
//             toast.warn("Please select at least two funds for comparison.");
//             return; // Stop form submission
//         }

//         // Convert start and maturity dates to the desired format (yyyy-MM-dd)
//         const formattedStartDate = formatDate(startDate);
//         const formattedMaturityDate = formatDate(maturityDate);

//         const requestData = {
//             arn_id: "",
//             fundPcode: selectedFunds.filter((fund) => fund !== ""),
//             output: "",
//             time: "",
//             amountForm: investmentAmount,
//             startDateForm: formattedStartDate,
//             endDateForm: formattedMaturityDate,
//             sensexCheck: compareSensex.toString(),
//             ppfCheck: comparePPF.toString(),
//             eventCheck: showEvents.toString(),
//         };

//         setIsLoading(true); // Start loading state

//         try {
//             const response = await axios.post("/api/compare-funds", requestData);
//             setResponseData(response.data.data);
//             setIsLoading(false);
//         } catch (error) {
//             setIsLoading(false);
//             setError(true);
//             toast.error("Error submitting form");
//             toast.error(
//                 "Sorry, we are not able to compare with this fund. Try with another fund."
//             );
//         }
//     };

//     return (
//         <div className="max-w-screen-xl mx-auto main_section">
//             {/* <div className="mb-5">
//                 <Breadcrumb>
//                     <BreadcrumbList>
//                         <BreadcrumbItem>
//                             <BreadcrumbLink href="/">Home</BreadcrumbLink>
//                         </BreadcrumbItem>
//                         <BreadcrumbSeparator />
//                         <BreadcrumbItem>
//                             <BreadcrumbLink href="/tools/calculators">Performance</BreadcrumbLink>
//                         </BreadcrumbItem>
//                         <BreadcrumbSeparator />
//                         <BreadcrumbItem>
//                             <BreadcrumbPage>Compare Funds</BreadcrumbPage>
//                         </BreadcrumbItem>
//                     </BreadcrumbList>
//                 </Breadcrumb>
//             </div> */}
//             <div>
//             <h1 className="text-3xl font-bold text-[var(--rv-primary)] mb-4 uppercase">compare funds</h1>
//             <h2 className="text-4xl font-bold text-[var(--rv-secondary)] mb-8">Compare Funds Analyze Confidently.</h2>
//                 <Card className="">
//                     <CardContent className="pt-6">
//                         {/* Form is always visible */}
//                         <form onSubmit={handleSubmit}>
//                             <div className="space-y-6">
//                                 {/* Search Scheme Name Fields */}
//                                 <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                                     {[0, 1, 2, 3, 4].map((index) => (
//                                         <div key={index} className="relative">
//                                             <Label htmlFor={`search-${index}`}>Search Scheme Name</Label>
//                                             <div className="relative">
//                                                 <input
//                                                     id={`search-${index}`}
//                                                     type="text"
//                                                     value={searchQueries[index]}
//                                                     onChange={(e) => handleSearchChange(e.target.value, index)}
//                                                     placeholder="Search scheme..."
//                                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                                                 />
//                                                 {selectedFunds[index] && (
//                                                     <Button
//                                                         type="button"
//                                                         variant="ghost"
//                                                         size="sm"
//                                                         className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-4xl"
//                                                         onClick={() => clearSelectedFund(index)}
//                                                     >
//                                                         ×
//                                                     </Button>
//                                                 )}
//                                             </div>

//                                             {/* Search Results Dropdown */}
//                                             {searchResults[index].length > 0 && !selectedFunds[index] && (
//                                                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
//                                                     {searchResults[index].map((fund) => (
//                                                         <div
//                                                             key={fund.pcode}
//                                                             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                                                             onClick={() => selectFund(fund.pcode, index)}
//                                                         >
//                                                             {fund.funddes}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Investment Details */}
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                                     <div>
//                                         <Label htmlFor="investment-amount">Investment Amount</Label>
//                                         <div className="relative">
//                                             <input
//                                                 type="number"
//                                                 id="investment-amount"
//                                                 placeholder="Enter Amount"
//                                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                                                 value={investmentAmount}
//                                                 onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                 min="1"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <Label htmlFor="start-date">Investment Start Date</Label>
//                                         <input
//                                             type="date"
//                                             id="schemeDate"
//                                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                                             value={startDate}
//                                             onChange={(e) => setStartDate(e.target.value)}
//                                         />
//                                     </div>
//                                     <div>
//                                         <Label htmlFor="maturity-date">Maturity Date</Label>
//                                         <input
//                                             type="date"
//                                             id="maturity-date"
//                                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                                             value={maturityDate}
//                                             onChange={(e) => setMaturityDate(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Compare Fund Options */}
//                                 <div>
//                                     <Label>Compare Fund</Label>
//                                     <div className="flex items-center space-x-6 mt-2">
//                                         <div className="flex items-center space-x-2">
//                                             <Checkbox
//                                                 id="sensex"
//                                                 checked={compareSensex === 1}
//                                                 onCheckedChange={handleCheckboxChange(setCompareSensex)}
//                                             />
//                                             <Label htmlFor="sensex" className="cursor-pointer">
//                                                 Sensex
//                                             </Label>
//                                         </div>

//                                         <div className="flex items-center space-x-2">
//                                             <Checkbox
//                                                 id="ppf"
//                                                 checked={comparePPF === 1}
//                                                 onCheckedChange={handleCheckboxChange(setComparePPF)}
//                                             />
//                                             <Label htmlFor="ppf" className="cursor-pointer">
//                                                 PPF
//                                             </Label>
//                                         </div>

//                                         <div className="flex items-center space-x-2">
//                                             <Checkbox
//                                                 id="show-events"
//                                                 checked={showEvents === 1}
//                                                 onCheckedChange={handleCheckboxChange(setShowEvents)}
//                                             />
//                                             <Label htmlFor="show-events" className="cursor-pointer">
//                                                 Show Events
//                                             </Label>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Submit Button */}
//                                 <Button
//                                     type="submit"
//                                     className="px-6 hidden lg:block py-2 rounded-full bg-[var(--rv-secondary)] text-white  hover:bg-[var(--rv-primary)]"
//                                     disabled={isLoading}
//                                 >
//                                     {isLoading ? "Processing..." : "Show"}
//                                 </Button>
//                             </div>
//                         </form>
//                         {/* Show Comparison Results only when data is available */}
//                         {responseData && (
//                             <div className="mt-6">
//                                 <CompareFundsTable data={responseData.compareDetails} />
//                                 <FundComparisonChart chartData={responseData.chartData} />
//                                 <CompareFundsTable2 allData={responseData.allData} selectedFundsNames={selectedFundsNames} />
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// }