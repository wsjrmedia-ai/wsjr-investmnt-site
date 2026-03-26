'use client';

import { useState, useEffect } from 'react';
import ButtonWithImage from '@/UI/AnimatedButton';
import { FaArrowRight } from 'react-icons/fa';
import { getAllFAQs } from '@/lib/getAllFAQs';
import FAQSkeleton from '../Loading/FAQSkeleton';

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getAllFAQs();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFAQs();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return faqs.length === 0 ? <FAQSkeleton /> : (
    <main className="bg-[#071E2F] text-white px-4 md:px-16 pb-16 py-16 md:py-20 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div>
          <div className="md:mb-10 mb-6">
            <ButtonWithImage text="Know" />
          </div>

          <h2 className="section-heading mb-6 leading-snug max-w-xl">
            FAQ - Step by step insights to guide your investment decisions.
          </h2>
          <p className="text-sm text-gray-400 max-w-md">
            Helping you make confident financial decisions with clear answers.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          {
            faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-600 pb-4 cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <div className="flex justify-between items-start group">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-1">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`mt-1 ml-4 min-w-[24px] min-h-[24px] flex items-center justify-center border border-[#BA833C] rounded-full group-hover:transition-transform duration-300 ${openIndex === index ? 'rotate-90' : ''
                      }`}
                  >
                    <FaArrowRight className="text-[12px] text-gray-400 group-hover:text-white transition" />
                  </div>
                </div>

                {openIndex === index && (
                  <p className="mt-2 text-sm text-gray-400">{faq.answer}</p>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );

}
