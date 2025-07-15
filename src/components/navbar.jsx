"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

export function Navbar({ services }) {
  const [isSticky, setIsSticky] = useState(false);
  const lastScrollY = useRef(0);
  const [showServices, setShowServices] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showNfo, setShowNfo] = useState(false);
    const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

  const toggleServices = () => {
    setShowServices((prev) => !prev);
  };
  const toggletools = () => {
    setShowTools((prev) => !prev);
  };
  const toggleNfo = () => {
    setShowNfo((prev) => !prev);
  };

  const [active, setActive] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
const [showMobileLoginDropdown, setShowMobileLoginDropdown] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    const shouldStick = currentScrollY > 100; // Trigger sticky after 100px

    setIsSticky(shouldStick);
    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/all-scheme-portfolio?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (response.status === 200) {
        const data = response.data.data;
        const filteredResults = data.filter((item) =>
          item.funddes.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsSearchOpen(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  const skiderinmobileview = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(true);
  };

  const handleSelectScheme = (items) => {

    const dataToStore = {
      pcode: items.pcode,
      timestamp: Date.now(),
    };

 
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(dataToStore),
      SECRET_KEY
    ).toString();

    localStorage.setItem("encryptedFundData", encrypted);
    const slug = items.funddes
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    // const url = `/performance/single-fund/${slug}?pcode=${items.pcode}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
  window.location.href = "/performance/single-fund";

  };
  return (
    <div
      className={`top-0 z-20  transition-all duration-300 ${
        isSticky ? "sticky bg-white py-1" : "relative bg-white py-2"
      }`}
    >
      <div className="relative max-w-screen-xl flex items-center justify-between  mx-auto px-4">
        <div className="">
          <Link href="/">
          <Image src="/logo.png" alt="logo" width={200} height={100} />
          </Link>
        </div>
        <div className="flex-1 max-w-4xl hidden lg:block mx-auto ">
          {isSearchOpen ? (
            <div
              className="relative rounded-full border-2 bg-[var(--rv-white)] border-gray-300 shadow-input flex justify-center"
              id="searchbar"
            >
              <div className="flex justify-center items-center p-2 px-28 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search funds..."
                  className="w-full p-2 border-none focus:outline-none rounded-full"
                />
                <button
                  onClick={toggleSearch}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute left-28 top-full mt-2 bg-white  rounded-lg shadow-lg w-full md:w-64 lg:w-96 max-h-60 overflow-y-auto ring-1 ring-gray-300">
                  <ul className="py-2 text-sm">
                    {searchResults.map((result, index) => (
                      <li key={index}>
                        <div
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => handleSelectScheme(result)}
                        >
                          {result.funddes}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Menu setActive={setActive}>
              <HoveredLink href="/">Home</HoveredLink>
              <HoveredLink href="/about-us">About Us</HoveredLink>
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="flex flex-col space-y-4 text-sm">
                  {services.map((service, index) => (
                    <HoveredLink key={index} href={`/services/${service.link}`}>
                      {service.name}
                    </HoveredLink>
                  ))}
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Tools">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/tools/calculators">
                    Financial Calculator
                  </HoveredLink>
                  <HoveredLink href="/tools/risk-profile">
                    Risk Profile
                  </HoveredLink>
                  <HoveredLink href="/tools/financial-health">
                    Financial Health
                  </HoveredLink>
                  <HoveredLink href="/tools/useful-links">
                    Useful Links
                  </HoveredLink>
                  <HoveredLink href="/tools/pay-premium-online">
                    Pay Premium Online
                  </HoveredLink>
                </div>
              </MenuItem>
              {/* <MenuItem setActive={setActive} active={active} item="Add on's">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/add-ons/top-funds">Top Funds</HoveredLink>
                  <HoveredLink href="/add-ons/compare-funds">
                    Compare Funds
                  </HoveredLink>
                  <HoveredLink href="/add-ons/nfo">NFO</HoveredLink>
                  <HoveredLink href="/">Search Funds</HoveredLink>
                </div>
              </MenuItem> */}
              <HoveredLink href="/blogs">Blogs</HoveredLink>
              
              <HoveredLink href="/contact-us">Contact Us</HoveredLink>
              <button
                onClick={toggleSearch}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 3.5a7.5 7.5 0 014.65 13.15z"
                  />
                </svg>
              </button>
            </Menu>
          )}
        </div>
     <div
  className="relative hidden lg:block"
  onMouseEnter={() => setShowLoginDropdown(true)}
  onMouseLeave={() => setShowLoginDropdown(false)}
>
  <button className="primarybutton p-4">
    Login
  </button>

  {showLoginDropdown && (
    <div className="absolute right-0 mt-0 w-48 bg-white border rounded-lg shadow-lg z-50">
      <Link
        href="/login/client"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Client Login
      </Link>
      <Link
        href="/login/employee"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Employee Login
      </Link>
      <Link
        href="/login/admin"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Admin Login
      </Link>
    </div>
  )}
</div>
        <div className="flex items-center gap-4 lg:hidden">
          {/* Search Icon */}
          {!isSearchOpen ? (
            <button onClick={() => setIsSearchOpen(true)}>
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 3.5a7.5 7.5 0 014.65 13.15z"
                />
              </svg>
            </button>
          ) : (
            <div className="">
              <div className="fixed inset-0 z-[9999]  flex flex-col  lg:hidden">
                <div className="bg-white px-4 py-2">
                  <div className="flex justify-between  items-center mb-4">
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      width={120}
                      height={100}
                    />
                    <div className="flex gap-4">
                      <button onClick={() => setIsSearchOpen(false)}>
                        <svg
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          skiderinmobileview();
                        }}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search funds..."
                    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none"
                  />
                  {searchResults.length > 0 && (
                    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                      <ul className="space-y-2">
                        {searchResults.map((result, index) => (
                          <li key={index}>
                            <div
                              onClick={() => handleSelectScheme(result)}
                              className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                            >
                              {result.funddes}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-[1000] transition-transform duration-300">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-4 p-4">
              <HoveredLink href="/">Home</HoveredLink>

              {/* Services dropdown toggle */}
              <button
                onClick={toggleServices}
                className="text-left text-[var(--rv-secondary)] font-semibold hover:text-[var(--rv-primary)]"
              >
                Services
              </button>

              {/* Dropdown content */}
              {showServices && (
                <div className="ml-4 flex flex-col space-y-2 text-sm">
                  {services.map((service, index) => (
                    <HoveredLink key={index} href={`/services/${service.link}`}>
                      {service.name}
                    </HoveredLink>
                  ))}
                </div>
              )}

              <button
                onClick={toggletools}
                className="text-left text-[var(--rv-secondary)] font-semibold hover:text-[var(--rv-primary)]"
              >
                Tools
              </button>

              {/* Dropdown content */}
              {showTools && (
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/tools/calculators">
                    Financial Calculator
                  </HoveredLink>
                  {/* <HoveredLink href="/tools/download-forms">
                    Download Forms
                  </HoveredLink> */}
                  <HoveredLink href="/tools/risk-profile">
                    Risk Profile
                  </HoveredLink>
                  <HoveredLink href="/tools/financial-health">
                    Financial Health
                  </HoveredLink>
                  <HoveredLink href="/tools/useful-links">
                    Useful Links
                  </HoveredLink>
                  <HoveredLink href="/tools/pay-premium-online">
                    Pay Premium Online
                  </HoveredLink>
                </div>
              )}

{/* <button
                onClick={toggleNfo}
                className="text-left text-[var(--rv-secondary)] font-semibold hover:text-[var(--rv-primary)]"
              >
                Add on's
              </button>

              {showNfo && (
                <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/add-ons/top-funds">Top Funds</HoveredLink>
                <HoveredLink href="/add-ons/compare-funds">
                  Compare Funds
                </HoveredLink>
                <HoveredLink href="/add-ons/nfo">NFO</HoveredLink>
                <HoveredLink href="/">Search Funds</HoveredLink>
              </div>
              )} */}

<HoveredLink href="/blogs">Blogs</HoveredLink>
              <HoveredLink href="/about-us">About Us</HoveredLink>
              <HoveredLink href="/contact-us">Contact Us</HoveredLink>
              <button
  onClick={() => setShowLoginDropdown((prev) => !prev)}
  className="text-left text-[var(--rv-secondary)] font-semibold hover:text-[var(--rv-primary)]"
>
  Login
</button>

{showLoginDropdown && (
  <div className="ml-4 flex flex-col space-y-2 text-sm">
    <HoveredLink href="/login/client">Client Login</HoveredLink>
    <HoveredLink href="/login/employee">Employee Login</HoveredLink>
    <HoveredLink href="/login/admin">Admin Login</HoveredLink>
  </div>
)}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
