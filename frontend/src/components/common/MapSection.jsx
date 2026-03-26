'use client';

import ButtonWithImage from '@/UI/AnimatedButton';

export default function MapSection() {
  return (
    <section className="bg-[#071E2F] text-white px-4 md:px-16 py-16 md:py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Google Maps iframe with Floating Text */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.5228465814016!2d55.27974589999999!3d25.219309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43fbe78419ef%3A0xa247397098574d6a!2sWall%20Street%20Jr.%20Investments!5e0!3m2!1sen!2sin!4v1758708339619!5m2!1sen!2sin"
            width="100%"
            height="495"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[495px] object-cover"
          ></iframe>

          {/* Floating Info Card */}
          {/* <div
            className="absolute left-1/2 transform -translate-x-1/2 top-14 text-white text-left max-w-md w-[246px] px-4 py-3 rounded-lg shadow-lg"
            style={{ backgroundColor: 'rgba(15, 46, 69, 0.85)' }}
          >
            <div className="space-y-2">
              <div>
                <h4 className="text-[13px] font-semibold">Wall Street Jr. Investments.</h4>
                <p className="text-[10px] text-white/80">Empowering Smart Investment Decisions</p>
              </div>
              <div>
                <p className="text-[10px]">
                  <span className="font-semibold">1901-2, City Tower 2,</span>
                </p>
                <p className="text-[10px] text-white/80">Sheikh Zayed Road, Dubai</p>
              </div>
              <a
                href="https://maps.app.goo.gl/4rhzKCfRLfiAcnHp7?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[10px] font-medium text-white pt-1"
              >
                Open Google Maps &gt;
              </a>
            </div>

            <div
              className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent"
              style={{ borderTopColor: 'rgba(15, 46, 69, 0.85)' }}
            />
          </div> */}
        </div>

        {/* Right: Content */}
        <div className="space-y-6 text-left">
          <ButtonWithImage text="Discover" />
          <h2 className="text-2xl md:text-3xl font-light">Connecting Near and Far</h2>

          <div className="space-y-1">
            <h4 className="font-semibold text-lg">Headquarters</h4>
            <p>Wall Street Jr. Investments.</p>
            <p>1901-2, City Tower 2,</p>
            <p>Sheikh Zayed Road,</p>
            <p>Dubai.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
