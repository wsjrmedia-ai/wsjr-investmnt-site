'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#071E2F] text-white px-4 md:px-16 py-16 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10">
        {/* Logo & Description */}
        <div className="col-span-2">
          <div className="mb-4">
            <Link href="/">
              <Image
                src="/Hero/logo.png"
                alt="Wall Street Jr Logo"
                width={150}
                height={50}
              />
            </Link>
          </div>
          <p className="text-sm text-[white] max-w-xs pb-2 font regular">
            Global asset diversification and institutional expertise in investment advisory - shaping tomorrow’s wealth, today.
          </p>
          <hr className="w-[80%]" />
          <p className="text-xs text-gray-500 mt-4">© 2025 All Rights Reserved</p>
        </div>

        {/* Follow Us & Contact */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-3 text-[16px]">Follow us</h4>
          <div className="flex gap-3 mb-6">
            <Link href="https://www.facebook.com/people/Wall-Street-jr-Investments/61573292634969/?sk=reels_tab" target="_blank">
              <Image src="/footer/facebook.png" alt="Facebook" width={24} height={24} />
            </Link>

            <Link href="https://www.instagram.com/wallstreetjrinvestments" target="_blank">
              <Image src="/footer/instagram.png" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://www.linkedin.com/company/wall-street-jr-investments/" target="_blank">
              <Image src="/footer/linkedin.png" alt="LinkedIn" width={24} height={24} />
            </Link>
          </div>

          <h4 className="font-semibold mb-1">Call us</h4>
          <a href="tel:+97145529700" className="hover:underline text-gray-400">
            +971 4 552 9700
          </a>

        </div>

        {/* Pages */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-3 text-[16px]">Pages</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><Link className="hover:underline" href="/">Home</Link></li>
            <li><Link className="hover:underline" href="/about">About</Link></li>
            <li><Link className="hover:underline" href="/contact-us">Contact Us</Link></li>
            <li><Link className="hover:underline" href="/case-study">Case Study</Link></li>
            <li><Link className="hover:underline" href="/blogs">Blogs & News</Link></li>


          </ul>
        </div>

        {/* Use Cases */}
        {/* <div className="col-span-1">
          <h4 className="font-semibold mb-3 text-[16px]">Use Cases</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><Link href="/usecases/section1">Section 1</Link></li>
            <li><Link href="/usecases/section2">Section Two</Link></li>
            <li><Link href="/usecases/another">Another Section</Link></li>
            <li><Link href="/usecases/new">New Section</Link></li>
          </ul>
        </div> */}

        {/* Services */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-3 text-[16px]">Services</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><Link className="hover:underline" href="/services/investment-wealth-management-consulting">Investment & Wealth Management Consulting</Link></li>
            <li><Link className="hover:underline" href="/services/portfolio-management-advisory">Portfolio Management Advisory</Link></li>
            <li><Link className="hover:underline" href="/services/capitalcode">CapitalCode</Link></li>
            <li><Link className="hover:underline" href="/services/risk-management-asset-restructuring">Risk Management / Asset Restructuring</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-6 flex flex-wrap gap-6 text-xs text-white justify-center md:justify-start">
        <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <Link href="/terms-and-conditions" className="hover:underline">Terms of Use</Link>
        <Link href="/compliance-legal-disclosures" className="hover:underline">
          Compliance & Legal Disclosures
        </Link>        {/* <Link href="/" className="hover:underline">Legal</Link>
        <Link href="/" className="hover:underline">Site Map</Link> */}
      </div>

    </footer>
  );
}
