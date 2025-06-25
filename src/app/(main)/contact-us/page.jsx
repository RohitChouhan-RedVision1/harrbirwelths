import ContactForm from "@/components/ContactUs/contactform";
import ContactReusableForm from "@/components/landing/contactSection/Contactreusableform";
import ContactUsFormSection from "@/components/landing/contactSection/contactSection";
import { getSiteData } from "@/lib/functions";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
export default async function ContactUs() {
  const sitedata = await getSiteData();

  return (
    <div>
      <div className="flex bg-center bg-no-repeat bg-cover bg-[url('/images/pay-premium/pay-premium.webp')] overflow-hidden text-start justify-start items-center h-64">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-gray-900 text-3xl md:text-5xl font-bold">
            Contact Us
          </h1>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto  py-[30px] md:py-[60px]">
      {/* Contact Info Cards */}
      <div className="flex  flex-col  gap-4 overflow-hidden rounded-lg mb-8">
        {/* Call Us */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-center text-center">
          <div className="bg-[var(--rv-secondary)] text-white p-8 rounded-2xl shadow-md w-full md:w-1/3 flex flex-col items-center justify-center min-h-[200px]">
            <Phone className="mb-2" size={24} />
            <h3 className="text-lg font-medium mb-2">Call Us</h3>
            <p className="text-sm"><Link href={`tel:${sitedata.mobile}`} >{sitedata.mobile}</Link></p>
          </div>

          <div className="bg-[var(--rv-secondary)] text-white p-8 rounded-2xl shadow-md w-full md:w-1/3 flex flex-col items-center justify-center min-h-[200px] ">
            <Mail className="mb-2" size={24} />
            <h3 className="text-lg font-medium mb-2">Mail Us</h3>
            <p className="text-sm break-all"><p><Link href={`mailto:${sitedata.email}`} >{sitedata.email}</Link></p></p>
          </div>
          <div className="bg-[var(--rv-secondary)] text-white p-8 rounded-2xl shadow-md w-full md:w-1/3 flex flex-col items-center justify-center min-h-[200px]">
          <MapPin className="mb-2" size={24} />
          <h3 className="text-lg font-medium mb-2">Reach Us</h3>
            <p className="text-sm break-all px-3"><a href={`${sitedata.mapurl}`} target="_blank" rel="noopener noreferrer">
    {sitedata.address}
  </a></p>
          </div>
        </div>
      </div>

      {/* Reach Us */}

      {/* Map and Contact Form */}
      <div className="px-2 md:px-15 grid grid-cols-1 md:grid-cols-2">
        {/* Map */}
        <div className="w-full h-[500px] relative border border-gray-200 rounded-l">
          <iframe
            src={sitedata?.iframe}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="rounded"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="w-full bg-[var(--rv-secondary)] px-4 rounded-r">
          <ContactReusableForm sitedata={sitedata} />
        </div>
      </div>
    </div>
    </div>
  );
}
