"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      // call internal Next.js API route
      await axios.post("/api/newsletter", { email });

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        "Subscription failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full bg-cover bg-right md:bg-right lg:bg-top-right bg-no-repeat text-white pt-16 px-4 md:px-16 relative"
      style={{
        backgroundImage: `url('/newsletter/bg.png')`,
      }}
    >
      <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text & Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Stay Ahead of the Market.
          </h2>
          <p className="text-md mb-6">
            Subscribe for expert insights, strategy tips, and updates delivered
            directly to your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="w-full sm:w-auto flex-1 px-4 py-3 rounded-[10px] bg-[#064C7C]/50 text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-[#064C7C] font-semibold px-6 py-3 rounded-[10px] shadow-md hover:opacity-90 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Privacy Note fixed at bottom */}
      <div className="w-full text-left mt-16">
        <p className="text-xs text-gray-300 pb-2 3xl:text-sm">
          **Your information will never be shared with third parties, and you
          can unsubscribe from our updates at any time.
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
