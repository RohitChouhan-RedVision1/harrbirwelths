import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Harbir Wealth Solutions",
    template: "%s - Harbir Wealth Solutions",
  },
  description:
    "Harbir Wealth Solutions helping them make informed decisions to achieve their financial goals with confidence",
  keywords: [
    "Mutual Funds",
    "Investment",
    "Financial Planning",
    "Mutual Fund News",
    "Finance Tips",
    "Harbir Wealth Solutions",
  ],
  twitter: {
    card: "summary_large_image",
    site: "@harbirwealthsolutions",
  },
  authors: [{ name: "Harbir Wealth Solutions Team" }],
};


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFF]`}
      >
        {children}
      </body>
    </html>
  );
}
