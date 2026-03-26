"use client";

export default function FloatingWhatsapp() {
  return (
    <div className="fixed bottom-6 left-6 z-[99999]">
      <a
        href="https://wa.me/971529164050?text=Hello"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 rounded-full p-[10px] shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <img
          src="/WhatsApp.svg"
          alt="WhatsApp"
          width={40}
          height={40}
        />
      </a>
    </div>
  );
}
