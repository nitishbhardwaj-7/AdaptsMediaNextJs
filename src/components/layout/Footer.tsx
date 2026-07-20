import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaRedditAlien, FaQuora,
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white flex flex-col items-start justify-start md:items-center md:justify-center pt-16 pb-8 py-20 font-sans">
      <div className="max-w-[1350px] px-8 md:px-16 w-full">

        {/* --- TOP ROW: Logo & Socials --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="relative w-56 h-12">
            {/* Replace with your actual logo path */}
            <Image src="/images/footerlogo.png" alt="AdaptsMedia" fill sizes="(max-width: 768px) 224px, 224px" className="object-contain" />
          </div>
          <div className="flex gap-4">
            <HeaderSocialIcon icon={<FaFacebookF size={16} />} />
            <HeaderSocialIcon icon={<FaXTwitter size={16} />} />
            <HeaderSocialIcon icon={<FaInstagram size={16} />} />
            <HeaderSocialIcon icon={<FaLinkedinIn size={16} />} />
            <HeaderSocialIcon icon={<FaYoutube size={16} />} />
          </div>
        </div>

        {/* --- MAIN GRID: 6 Columns --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-12 mb-12">

          {/* Col 1: About & Services */}
          <div>
            <FooterHeading>
              <a href="/about-us">About Us</a>
            </FooterHeading>
            <FooterHeading className="mt-10">Services</FooterHeading>
            <ul className="space-y-2 mt-4">
              <FooterLink>SEM Agency</FooterLink>
              <FooterLink>Best Data Analytics Services</FooterLink>
              <FooterLink>Creative Designing</FooterLink>
              <FooterLink>SEO Services</FooterLink>
              <FooterLink>SMS Campaign</FooterLink>
              <FooterLink>Social Media Marketing</FooterLink>
              <FooterLink>Web Development</FooterLink>
              <FooterLink>Display Campaign Management</FooterLink>
              <FooterLink>Programmatic Advertising</FooterLink>
              <FooterLink>Ad Operations for Advertising Agencies</FooterLink>
            </ul>
          </div>

          {/* Col 2: Work */}
          <div>
            <FooterHeading><a href="/services">Clients & Our Work</a></FooterHeading>
          </div>

          {/* Col 3: Team & Dubai Office */}
          <div>
            <FooterHeading>Meet The Team</FooterHeading>
            <div className="mt-10">
              <FooterHeading className="text-white">Head Office - Dubai</FooterHeading>
              <p className="text-[12px] text-white leading-relaxed mt-4">
                702, Warsan Tower, Near Media Rotana,<br />
                Tecom, Barsha Heights, Dubai,<br />
                United Arab Emirates
              </p>
              <div className="text-[12px] text-white mt-6 space-y-1">
                <p>Contact Number: +971 58 560 1701</p>
                <p>Landline: +971 043257279</p>
                <p>Email: Info@adaptsmedia.com</p>
              </div>
            </div>
          </div>

          {/* Col 4: Blog & Other Locations */}
          <div>
            <FooterHeading>Blog</FooterHeading>
            <div className="mt-10">
              <FooterHeading>Contact Us</FooterHeading>
              <p className="text-[12px] font-normal mt-4 mb-2">Other Location</p>
              <ul className="text-[12px] text-white space-y-1">
                <li>India</li>
                <li>Philippines</li>
                <li>London</li>
                <li>United States</li>
              </ul>
            </div>
          </div>

          {/* Col 5: Locations */}
          <div>
            <FooterHeading>Locations</FooterHeading>
          </div>

          {/* Col 6: Awards Section (Visual Span 2) */}
          <div className="w-full">
            <FooterHeading>Awards</FooterHeading>
            <div className="mt-4 border border-white/40 rounded-lg p-6 flex items-center justify-between gap-4">
              <AwardImage src="/images/techbehemoths.png" />
              <AwardImage src="/images/digitalagencynetwork.png" />
              <AwardImage src="/images/webdevelopment.png" />
              <AwardImage src="/images/topagency.png" />
            </div>

            {/* Secondary Social Icons underneath Awards */}
            <div className="flex justify-end gap-4 mt-8">
              <FooterSocialIcon icon={<FaRedditAlien size={18} />} />
              <FooterSocialIcon icon={<FaQuora size={18} />} />
              {/* <FooterSocialIcon icon={<FaMediumM size={18} />} />
              <FooterSocialIcon icon={<FaTelegramPlane size={18} />} /> */}
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/40 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-white">
          <p>© 2026 Adapts Media® | All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition-colors">Terms And Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components for Styling ---

const FooterHeading = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h4 className={`text-[14px] font-bold text-white ${className}`}>
    {children}
  </h4>
);

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <li>
    <Link href="#" className="text-[12px] text-white hover:text-[#FAC02E] transition-colors leading-tight block">
      {children}
    </Link>
  </li>
);

const HeaderSocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition-all cursor-pointer">
    {icon}
  </div>
);

const FooterSocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
    {icon}
  </div>
);

const AwardImage = ({ src }: { src: string }) => (
  <div className="relative w-24 h-30 opacity-100">
    <Image src={src} alt="Award" fill sizes="(max-width: 768px) 96px, 96px" className="object-contain" />
  </div>
);

export default Footer;