'use client';

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#071E2F] text-white px-6 md:px-16 py-12 md:py-20">
      <section className="max-w-6xl mx-auto text-left space-y-10 text-gray-300 text-sm md:text-base leading-relaxed">
        
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Wall Street Jr. Investments - Privacy Policy
        </h1>

        <p>
          At Wall Street Jr. Investments, we value the confidentiality, integrity, and security of
          your personal information. This Privacy Policy outlines how we collect, use, store, and
          protect client and visitor data in compliance with the UAE Personal Data Protection
          Law (PDPL) and international best practices.
        </p>

        {/* New Scope Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">Scope</h2>
          <p>
            This Privacy Policy applies to all clients, prospective clients, and website visitors who
            interact with Wall Street Jr. Investments, whether through consultations, registrations,
            online engagement, or participation in our services and programs.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal details provided during consultations, registrations, or account setup (name, contact details, identification documents).</li>
            <li>Financial and investment-related information voluntarily shared with us.</li>
            <li>Technical data from website usage, including IP addresses and browser type.</li>
          </ul>
          <p className="mt-2">
            We do not knowingly collect personal data from individuals under the age of 18 without
            verifiable parental or guardian consent.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide advisory and consultancy services.</li>
            <li>To improve client experience and website functionality.</li>
            <li>To communicate updates, compliance notices, and marketing material (where consent has been obtained).</li>
            <li>To meet regulatory, compliance, and due diligence obligations.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">3. Legal Basis for Processing</h2>
          <p>
            We process personal data on one or more lawful grounds, including client consent,
            contractual necessity, and compliance with legal or regulatory obligations.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">4. Data Protection & Security</h2>
          <p>
            We implement strict administrative, technical, and physical safeguards to protect
            personal data from unauthorized access, disclosure, or misuse. Access to sensitive
            client information is restricted to authorized personnel only.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">5. Data Sharing & Cross-Border Transfers</h2>
          <p>
            We do not sell or rent client data. Information may only be shared with trusted
            third-party service providers, including IT hosting partners, CRM platforms,
            licensed custodians, regulatory authorities, or legal entities when required by law.
            Such sharing is limited to the purposes of delivering our services, fulfilling contractual
            obligations, or meeting compliance requirements.
          </p>
          <p className="mt-2">
            Where data is stored or processed outside the UAE, we ensure adequate protection in
            line with the UAE Personal Data Protection Law (PDPL) and applicable international
            standards.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">6. Client Rights</h2>
          <p>
            Clients have the right to access, update, or request deletion of their personal data.
            Requests can be submitted to{" "}
            <a href="mailto:office@wallstreetjr.com" className="underline text-white">
              office@wallstreetjr.com
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">7. Retention Policy</h2>
          <p>
            We retain personal information only for as long as necessary to fulfill service
            obligations, meet regulatory requirements, or resolve disputes.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">8. Breach Notification</h2>
          <p>
            In the unlikely event of a data breach, we will notify affected clients and relevant
            authorities in accordance with UAE law.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">9. Amendments</h2>
          <p>
            This Privacy Policy may be updated from time to time to reflect regulatory changes or
            business needs. Updates will be posted on our website.
          </p>
        </div>
      </section>
    </main>
  );
}
