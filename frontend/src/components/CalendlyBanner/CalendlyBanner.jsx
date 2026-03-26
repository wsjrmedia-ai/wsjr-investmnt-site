"use client";

import Link from "next/link";

export default function CalendlyBanner() {
  return (
    <section className="w-full px-4 md:px-16 relative py-3 bg-[#071E2F]">
      {/* Background Wrapper */}
      <div className="relative w-full rounded-lg overflow-hidden">

        {/* Gradient Overlay (matching theme) */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(
              circle at top right,
              rgba(165, 239, 255, 0) 0%,
              rgba(110, 191, 244, 0.15) 70%,
              rgba(70, 144, 212, 0.25) 100%
            )`,
          }}
        />

        {/* Calendar Image Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none"
          style={{
            backgroundImage: `url('/calender.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            backgroundSize: "auto 120px", // 👈 smaller calendar image
            opacity: 0.15,
          }}
        />

        {/* Content */}
        <div className="relative py-6 flex flex-col md:flex-row items-center justify-between px-6 md:px-10 gap-4">
          {/* Left Content */}
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              Book a Free Consultation
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Schedule a one-on-one session with our advisors via Calendly.
              Choose a time that works best for you and start planning your
              portfolio with confidence.
            </p>
          </div>

          {/* CTA Button (Right side on desktop, below on mobile) */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <Link
              href="https://calendly.com/d/csds-vxm-ckw/call-with-wall-street-jr" // 👉 Replace with your Calendly link
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-5 py-2 bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform text-sm md:text-base">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
