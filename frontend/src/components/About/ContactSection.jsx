'use client';

import React from 'react';
import { ContactForm } from './ContactForm';

export default function ContactSection() {
  return (
    <section
      className="bg-[#071E2F] text-white px-4 md:px-16 py-2 md:py-16"
      id="contact"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%_37%] gap-10">
        {/* Left: Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-[32px] md:text-[48px] font-light">
              Contact <span className="font-semibold">Us</span>
            </h2>
            <p className="text-white mt-4 max-w-md">
              Have questions about investing or our services? Reach out to us. We're here to guide your financial journey.
            </p>
          </div>

          <div className="space-y-1">
            <a href="mailto:invest@wallstreetjr.com" className="hover:underline">
              invest@wallstreetjr.com
            </a>
            <p>
              <a href="tel:+97145529700" className="hover:underline">
                +971 4 552 9700
              </a>
            </p>
            <p>Investor Support</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:pt-24 pt-12 md:hidden lg:flex sm:block">
            <div>
              <h4 className="font-semibold mb-2">Investor Support</h4>
              <p className="text-[16px] text-white">
                Available 24/7 to help with account, portfolio, or advisory-related questions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Feedback & Insights</h4>
              <p className="text-[16px] text-white">
                We value your ideas and continually improve our services. Your voice shapes our platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Media & Partnerships</h4>
              <p className="text-[16px] text-white">
                For media or partnership inquiries, contact us at:{" "}
                <a
                  href="mailto:brand@wallstreetjr.com"
                  className="text-white hover:underline"
                >
                  brand@wallstreetjr.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
