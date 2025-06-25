import HeroSection from '@/components/landing/heroSection/heroSection';
import AboutSection from '@/components/landing/aboutSection/aboutSection';
import RecordsSection from '@/components/landing/recordsSection/recordsSection';
import FeaturesSection from '@/components/landing/featuresSection/featuresSection';
import ContactUs from '@/components/landing/contactSection/contactSection';
import BlogsSection from '@/components/landing/blogsSection/blogsSection';
import BseChartSection from '@/components/landing/bsechartSection/bsechartSection';
import SipCalculator from '@/components/landing/sipcalculatort';
import Testimonials from '@/components/landing/testimonials';
import AnimatedContent from '@/components/AnimatedContent';
import { getLatestBlogs, getSiteData, getSocialMedia, getTestimonials } from '@/lib/functions';
import SubscribCard from '@/components/partners/partners';
import SocialMediaSidebar from '@/components/socialMedia/index';

export default async function Page() {
     const sitedata = await getSiteData();
     const blogs=await getLatestBlogs();
     const testimonial=await getTestimonials()


  return (
    <AnimatedContent>
      <div>
        <HeroSection sitedata={sitedata} />
        <AboutSection sitedata={sitedata}/>
        <RecordsSection />
        <FeaturesSection sitedata={sitedata}/>
        <BseChartSection />
        <SipCalculator />
        <Testimonials sitedata={sitedata} testimonials={testimonial}/>
        {/* <BlogsSection blogs={blogs}/> */}
        <ContactUs sitedata={sitedata} />

        <SocialMediaSidebar sitedata={sitedata} />
      </div>
    </AnimatedContent>
  );
}
