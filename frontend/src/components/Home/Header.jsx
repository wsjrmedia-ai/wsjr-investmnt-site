'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedBorderHeader = styled.header`
  position: relative;
  border-radius: 1rem;
  background: transparent;
  backdrop-filter: blur(10px);
  color: white;
  height: auto;
  min-height: 84px;
  z-index: 10;
  border: 1px solid transparent;
  margin: 0.5rem;
  animation: ${fadeIn} 1s ease-out 2s forwards;
  opacity: 0;

  /* Gradient border stroke */
  &::before {
    content: '';
    position: absolute;
    inset: -2px; /* expands outside */
    z-index: -1;
    border-radius: 1rem;
    background: 
      /* 🔹 Gradient border 1 (purple) */
      radial-gradient(circle, #EABFFF 0%, rgba(135, 38, 183, 0) 100%),
      /* 🔹 Gradient border 2 (cyan → white) */
      radial-gradient(circle, #98F9FF 0%, rgba(255, 255, 255, 0) 100%);
    background-origin: border-box;
    background-clip: border-box;
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 2px; /* stroke thickness */
  }

  /* Inner background gradient */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    border-radius: inherit;
    background: radial-gradient(
      circle,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.2) 77%,
      rgba(70, 144, 212, 0) 100%
    );
  }

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    margin: 0.25rem;
    
    &::before {
      border-radius: 0.5rem;
    }
  }
`;

// Styled components for mobile menu
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 280px;
  max-width: 85%;
  background: #071E2F;
  z-index: 50;
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding: 1rem 0;
`;

// Dropdown container with gap to prevent accidental closing
const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 12px; /* Increased gap between menu item and dropdown */
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 30;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const aboutDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const aboutTimeoutRef = useRef(null);
  const servicesTimeoutRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Add visibility delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Improved dropdown handlers with timeout delay
  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
    }
    setAboutOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 300); // Increased delay to prevent accidental closure
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setServiceOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServiceOpen(false);
    }, 300); // Increased delay to prevent accidental closure
  };

  // Keep dropdown open when hovering over it
  const handleDropdownMouseEnter = (type) => {
    if (type === 'about' && aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
    }
    if (type === 'services' && servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
  };

  // Close dropdown when leaving it
  const handleDropdownMouseLeave = (type) => {
    if (type === 'about') {
      aboutTimeoutRef.current = setTimeout(() => {
        setAboutOpen(false);
      }, 200);
    }
    if (type === 'services') {
      servicesTimeoutRef.current = setTimeout(() => {
        setServiceOpen(false);
      }, 200);
    }
  };

  return (
    <>
      {/* Mobile menu overlay - only render on mobile */}
      {isMobile && (
        <MobileMenuOverlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar for mobile - only render on mobile */}
      {isMobile && (
        <MobileMenuContainer $isOpen={isOpen} className="mobile-menu">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={28} className="text-white cursor-pointer" />
            </button>
          </div>
          <nav className="flex flex-col items-start px-6 space-y-4 text-white text-lg font-light">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:font-semibold py-2">Home</Link>

            {/* Mobile About Dropdown */}
            <div className="w-full">
              <div className="flex items-center justify-between w-full py-2">
                <Link href="/about" className="hover:font-semibold">About</Link>
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  aria-expanded={mobileAboutOpen}
                  aria-label="Toggle about menu"
                >
                  {mobileAboutOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {mobileAboutOpen && (
                <div className="pl-4 text-base space-y-2 mt-2">
                  <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:font-semibold py-2">Our CEO</Link>
                  <Link href="/teams" onClick={() => setIsOpen(false)} className="block hover:font-semibold py-2">Our Team</Link>
                  <Link href="/gallery" onClick={() => setIsOpen(false)} className="block hover:font-semibold py-2">Gallery</Link>
                </div>
              )}
            </div>

            {/* Mobile Services Dropdown */}
            <div className="w-full">
              <div className="flex items-center justify-between w-full py-2">
                <span className="hover:font-semibold">Services</span>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
                  aria-label="Toggle services menu"
                >
                  {mobileServicesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              {mobileServicesOpen && (
                <div className="pl-4 text-base space-y-2 mt-2">
                  <Link href="/services/portfolio-management-advisory" onClick={() => setIsOpen(false)} className="block hover:font-semibold py-2">Portfolio Management Advisory</Link>

                  <Link href="/services/investment-wealth-management-consulting" onClick={() => setIsOpen(false)} className="block hover:font-semibold py-2">Investment Management</Link>
                  <Link href="/services/CapitalCode" onClick={() => setIsOpen(false)} className="block hover:font-semibold py-2">CapitalCode</Link>
                  <Link href="/services/risk-management-asset-restructuring" onClick={() => setIsOpen(false)} className="block hover:font-semibold py-2">Risk Management / Asset Restructuring</Link>
                </div>
              )}
            </div>

            <Link href="/case-study" onClick={() => setIsOpen(false)} className="hover:font-semibold py-2">Case Study</Link>
            <Link href="/contact-us" onClick={() => setIsOpen(false)} className="hover:font-semibold py-2">Contact Us</Link>

            {/* <a
              href="https://calendly.com/d/csds-vxm-ckw/call-with-wall-street-jr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-6 inline-block bg-[#061b2a] text-white px-6 py-3 rounded-[10px] w-full text-center"
            >
              Client Login
            </a> */}

            <Link
              href="/contact-us"
              onClick={() => setIsOpen(false)}
              className="mt-6 inline-block bg-[#061b2a] text-white px-6 py-3 rounded-[10px] w-full text-center"
            >
              Client Login
            </Link>

          </nav>
        </MobileMenuContainer>
      )}

      {/* Header with visibility delay */}
      <AnimatedBorderHeader
        className={isScrolled ? 'scrolled' : ''}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/Hero/logo.png"
                  alt="Wall Street Jr."
                  width={160}
                  height={40}
                  priority
                  className="w-32 md:w-40"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link href="/" className="px-4 py-3 rounded-lg hover:bg-white/10 hover:font-semibold transition-all duration-200 text-base">Home</Link>

              {/* About Dropdown */}
              <DropdownContainer
                className="relative group"
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleAboutMouseLeave}
                ref={aboutDropdownRef}
              >
                <div className="flex items-center">
                  <Link
                    href="/about"
                    className="px-4 py-3 rounded-lg hover:bg-white/10 hover:font-semibold transition-all duration-200 flex items-center gap-1 text-base"
                  >
                    About
                    {aboutOpen ? (
                      <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </Link>
                </div>
                <DropdownContent
                  $isOpen={aboutOpen}
                  onMouseEnter={() => handleDropdownMouseEnter('about')}
                  onMouseLeave={() => handleDropdownMouseLeave('about')}
                  style={{ minWidth: '280px', borderRadius: '10px' }}

                >
                  <Link
                    href="/about"
                    className="block px-6 py-4 hover:font-semibold transition bg-[#041c2c] hover:bg-[#063152] whitespace-nowrap"
                  >
                    Our CEO
                  </Link>
                  <Link
                    href="/teams"
                    className="block px-6 py-4 hover:font-semibold transition bg-[#041c2c] hover:bg-[#063152] whitespace-nowrap"
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/gallery"
                    className="block px-6 py-4 hover:font-semibold transition bg-[#041c2c] hover:bg-[#063152] whitespace-nowrap"
                  >
                    Gallery
                  </Link>
                </DropdownContent>
              </DropdownContainer>

              {/* Services Dropdown */}
              <DropdownContainer
                className="relative group"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                ref={servicesDropdownRef}
              >
                <div className="flex items-center">
                  <span className="px-4 py-3 rounded-lg hover:bg-white/10 hover:font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1 text-base">
                    Services
                    {serviceOpen ? (
                      <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    )}
                  </span>
                </div>
                <DropdownContent
                  $isOpen={serviceOpen}
                  style={{ minWidth: '280px' }}
                  onMouseEnter={() => handleDropdownMouseEnter('services')}
                  onMouseLeave={() => handleDropdownMouseLeave('services')}
                >
                  {[
                    { name: 'Portfolio Management Advisory', path: '/services/portfolio-management-advisory' },
                    { name: 'Investment Management', path: '/services/investment-wealth-management-consulting' },
                    { name: 'CapitalCode', path: '/services/CapitalCode' },
                    { name: 'Risk Management / Asset Restructuring', path: '/services/risk-management-asset-restructuring' },
                  ].map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`block px-6 py-4 hover:font-semibold transition ${index % 2 === 0 ? 'bg-[#071E2F]' : 'bg-[#041c2c]'} hover:bg-[#063152] whitespace-nowrap`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </DropdownContent>
              </DropdownContainer>

              <Link href="/case-study" className="px-4 py-3 rounded-lg hover:bg-white/10 hover:font-semibold transition-all duration-200 text-base">Case Study</Link>
              <Link href="/contact-us" className="px-4 py-3 rounded-lg hover:bg-white/10 hover:font-semibold transition-all duration-200 text-base">Contact Us</Link>
            </nav>

            {/* Right: Connect or Menu icon */}
            <div className="flex items-center">
              {/* <a
                href="https://calendly.com/d/csds-vxm-ckw/call-with-wall-street-jr"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-block px-5 py-3 xl:px-6 xl:py-3 rounded-[10px] bg-[#071E2F] font-semibold transition-all duration-200 hover:bg-[#063152] text-base"
              >
                Client Login
              </a> */}


              <Link
                href="/contact-us"
                className="hidden lg:inline-block px-5 py-3 xl:px-6 xl:py-3 rounded-[10px] bg-[#071E2F] font-semibold transition-all duration-200 hover:bg-[#063152] text-base"
              >
                Client Login
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className="inline-block lg:hidden text-white cursor-pointer menu-button p-2"
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </AnimatedBorderHeader>

      <style jsx global>{`
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        @media (max-width: 640px) {
          .container {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
        
        /* Improve touch targets on mobile */
        @media (max-width: 768px) {
          nav a, nav button {
            min-height: 44px;
            display: flex;
            align-items: center;
          }
        }

        /* Improved desktop dropdown styling */
        @media (min-width: 1024px) {
          .dropdown-content {
            min-width: 200px;
          }
          
          .dropdown-content a {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </>
  );
}