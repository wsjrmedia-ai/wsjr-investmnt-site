"use client";

export default function JourneySection() {
  const data = [
    {
      year: "2014",
      title: "Entry into US Trading",
      desc: "Moved to the U.S. and began trading via major banks. Initial profits looked promising, but hidden fees, high taxes and commissions revealed a harsh truth. The system favors institutions, not individuals.",
    },
    {
      year: "2015",
      title: "Shift to self-trading",
      desc: "Broke free from intermediaries and went solo. The aim was to take more control, but faced unpredictable volatility, inconsistent profits and suffered from not having a clear strategy.",
    },
    {
      year: "2016",
      title: "Capital loss in India",
      desc: "Tried Indian markets under a broker’s guidance. Invested big. Suffered heavy losses. A tough but crucial lesson in blind trust and market misjudgment.",
    },
  ];

  return (
    <section className="w-full px-4 md:px-16 py-10 bg-[#071E2F] text-white">
      {/* Header */}
      <div className=" mx-auto text-left">
        <h2 className="section-heading font-semibold">
          Reflecting on the journey
        </h2>
        <p className="mt-3 text-gray-300 section-desc leading-relaxed">
          An investor’s journey can sometimes be a real test of patience. Our
          founder’s journey is a great example of how hard lessons along the way
          become paving stones to exponential growth.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {data.map((item, i) => {
          const isLastOdd =
            i === data.length - 1 && data.length % 2 !== 0; // last + odd count

          return (
            <div
              key={i}
              className={`relative p-5 rounded-xl bg-[url('/casestudy/KeyTakeaways/card-bg.png')] bg-cover bg-center bg-no-repeat ${isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
            >
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold flex items-center gap-2">
                <span
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#E4BC88] to-[#E7901F] bg-clip-text text-transparent"
                >
                  {item.year}
                </span>

                {item.title}
              </h3>
              <p className="mt-3 text-[14px] md:text-[16px] text-gray-200 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>


    </section>
  );
}
