'use client';

import React from 'react';

export default function Compliance() {
  return (
    <main className="bg-[#071E2F] text-white px-6 md:px-16 py-12 md:py-20">
      {/* Page Heading */}
      <header className="max-w-6xl mx-auto text-left mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Wall Street Jr. Investments - Compliance & Legal Disclosures
        </h1>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          This Compliance & Legal document outlines the key disclaimers, disclosures, and
          regulatory positions of Wall Street Jr. Investments. It is intended to provide
          clarity, transparency, and alignment with UAE financial services expectations.
          Clients and prospective clients are encouraged to review this document carefully
          before engaging with our services.
        </p>
      </header>

      {/* Compliance Sections */}
      <section className="space-y-10 text-gray-300 text-sm md:text-base leading-relaxed max-w-6xl mx-auto text-left">
        <div>
          <h2 className="text-white text-xl font-semibold mb-2">1. General Investment Disclaimer</h2>
          <p>
            Wall Street Jr. Investments is an Investment and Banking consultant. We do not
            directly hold or manage client funds. All investment decisions remain solely with
            the client, who maintains custody of their capital at all times. Past performance is
            not indicative of future results. Any figures, projections, or performance ranges
            (including potential monthly growth targets) are illustrative in nature and do not
            constitute a guarantee of returns. Investments in financial markets involve risks,
            including possible loss of principal.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">2. Performance & Returns Clarification</h2>
          <p>
            The 5‒7% monthly growth figures referenced are model-based targets derived from
            historical strategy simulations and should not be interpreted as assured results.
            Actual outcomes may vary based on market conditions, client risk appetite, and
            other external factors. Wall Street Jr. Investments does not provide guaranteed
            returns, and clients are encouraged to seek independent financial advice before
            committing capital.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">3. Regulatory Positioning</h2>
          <p>
            Wall Street Jr. Investments serves exclusively as a strategic investment and
            banking consultant. We do not accept deposits, nor do we conduct brokerage or
            payment services. All client capital remains securely with licensed custodians and
            regulated brokers. Our role is limited to providing advisory, portfolio consultancy,
            and furthering financial literacy in line with international best practices.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">4. Risk Management Statement</h2>
          <p>
            Risk controls are applied on a best-efforts basis to manage volatility and preserve
            client capital. However, financial markets inherently carry uncertainty, and no risk
            framework can fully eliminate exposure to loss. Clients are responsible for assessing
            the suitability of strategies based on their personal financial situation and risk
            tolerance.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">5. Client Suitability</h2>
          <p>
            By engaging with Wall Street Jr. Investments, you confirm that you have reviewed
            and understood the risk disclosures, that investment decisions are made at your
            discretion, and that you are financially able to bear potential losses. We encourage
            clients to diversify and only allocate funds they can afford to risk.
          </p>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">6. Marketing & Promotional Disclaimer</h2>
          <p>
            This material is provided for information and educational purposes only and does
            not constitute financial advice or a solicitation to invest. Prospective clients should
            conduct their own due diligence and seek independent advice before making any
            investment decisions.
          </p>
        </div>
      </section>
    </main>
  );
}
