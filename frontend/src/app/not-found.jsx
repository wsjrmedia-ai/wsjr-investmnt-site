'use client';

import Header from '@/components/Home/Header';

export default function NotFound() {
  return (
    <main
      className="lg:min-h-screen lg:px-16 lg:py-10 px-4 py-4 bg-cover bg-center text-white bg-[#071E2F] relative"
      style={{ backgroundImage: "url('/notfound/notfound.png')" }}
    >
      <Header />

      <div className="flex items-center justify-center text-center min-h-[80vh]">
        <div>
          <h1 className="text-7xl md:text-[120px] font-bold mb-4">404</h1>
          <p className="text-lg text-white/80">The page you are looking not found</p>
        </div>
      </div>
    </main>
  );
}
