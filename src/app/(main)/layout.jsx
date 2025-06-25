import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Tickers from "@/components/tickers";
import WebPopup from "@/components/webpopup";
import { ConnectDB } from "@/lib/db/ConnectDB";
import { getArn, getServiceData, getSiteData, getSocialMedia } from "@/lib/functions";
import ServicesModel from "@/lib/models/ServicesModel";
import SiteSettingsModel from "@/lib/models/SiteSetting";
import { FaArrowUp } from "react-icons/fa6";



export default async function Layout({ children }) {
    const sitedata = await getSiteData();
  const servicedata = await getServiceData();
  const arn=await getArn();
       const socialmedialinks=await getSocialMedia()
    return (
        <div className="">
            <Tickers/>
            <Navbar services={servicedata} socialmedialinks={socialmedialinks}/>
            {children}
            <Footer sitedata={sitedata} servicedata={servicedata} arn={arn} socialmedialinks={socialmedialinks} />
            {/* <UpdatePopup /> */}
            <WebPopup />
            {/* <div className="absolute p-5 bg-red-300 bottom-10 right-10 rounded-full">
                <FaArrowUp />
            </div> */}
        </div>
    );
}