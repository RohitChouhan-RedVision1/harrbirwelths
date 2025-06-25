/** @type {import('next').NextConfig} */
// import dotenv from "dotenv";
// dotenv.config({ path: "/rvdata/env-files/ethicuswealth.env" });

const nextConfig = {
    images: {
        domains: ["res.cloudinary.com", "wealthelite.in","redvisionweb.com"],
    },
};

export default nextConfig;


