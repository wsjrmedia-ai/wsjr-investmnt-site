'use client'

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import ButtonWithImage from "@/UI/AnimatedButton";
import { getGalleryImages } from "@/lib/gallery"; // adjust path if needed
import Image from "next/image";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Image enlargement state
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Fetch images from API - only EXTERIOR and INTERIOR categories
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imgs = await getGalleryImages();
        // Filter only EXTERIOR and INTERIOR categories
        const filteredImgs = imgs.filter(img => 
          img.category === 'EXTERIOR' || img.category === 'INTERIOR'
        );
        setImages(filteredImgs.map((img) => img.src));
      } catch (error) {
        console.error("Error loading slider images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Auto slide every 3s
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images]);

  // Handle keyboard navigation and body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (enlargedImage) {
        if (e.key === 'ArrowLeft') {
          navigateImage('prev');
        } else if (e.key === 'ArrowRight') {
          navigateImage('next');
        } else if (e.key === 'Escape') {
          closeEnlargedView();
        }
      }
    };

    // Prevent body scroll when modal is open
    if (enlargedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [enlargedImage, currentImageIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle image enlargement
  const handleImageClick = (image, index) => {
    setEnlargedImage(image);
    setCurrentImageIndex(index);
  };

  // Handle navigation in enlarged view
  const navigateImage = (direction) => {
    const totalImages = images.length;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentImageIndex === 0 ? totalImages - 1 : currentImageIndex - 1;
    } else {
      newIndex = currentImageIndex === totalImages - 1 ? 0 : currentImageIndex + 1;
    }
    
    setCurrentImageIndex(newIndex);
    setEnlargedImage(images[newIndex]);
    setZoomLevel(1); // Reset zoom when changing images
  };

  // Close enlarged view
  const closeEnlargedView = () => {
    setEnlargedImage(null);
    setZoomLevel(1); // Reset zoom when closing
  };

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Min zoom 0.5x
  };

  // Show 4 at a time
  const visibleImages = [...images, ...images].slice(
    currentIndex,
    currentIndex + 4
  );

  return (
    <div className="relative w-full overflow-hidden py-4 bg-[#071E2F]">
      <div className="hidden md:flex py-1 text-sm md:mb-8 mb-6 px-16">
        <ButtonWithImage
          text={"A glimpse into life at Wall Street Jr"}
          image={"none"}
        />
      </div>

      {/* Enhanced Loader Skeleton */}
      {loading ? (
        <div className="relative w-full overflow-hidden py-4">
          <div className="flex gap-4 px-4 md:px-16 animate-pulse">
          {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 relative">
                <div className="lg:w-[280px] md:w-[240px] w-[200px] h-[280px] md:h-[289px] bg-gray-700 rounded-[8px] relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse"></div>
                  {/* Image placeholder lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation button skeletons */}
          <div className="absolute left-2 top-[50%] md:top-[60%] -translate-y-1/2 w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="absolute right-2 top-[50%] md:top-[60%] -translate-y-1/2 w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      ) : (
        <>
          {/* Slider Row */}
          <div className="flex transition-transform duration-700 ease-in-out">
            {visibleImages.map((img, i) => {
              const actualIndex = (currentIndex + i) % images.length;
              return (
              <div
                key={i}
                  className="lg:w-1/4 md:w-1/3 w-full flex-shrink-0 relative h-[280px] md:h-[289px] cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => handleImageClick(img, actualIndex)}
              >
                <Image
                  src={img}
                  alt={`slide-${i}`}
                  fill
                    className="object-cover "
                    quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              );
            })}
          </div>

          {/* Left Button */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-[50%] md:top-[60%] -translate-y-1/2 bg-white text-[#B9833E] p-2 rounded-full shadow-md z-10"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="absolute right-2 top-[50%] md:top-[60%] -translate-y-1/2 bg-white text-[#B9833E] p-2 rounded-full shadow-md z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Google Drive Style Image Popup */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeEnlargedView}
        >
          {/* Popup Container */}
          <div 
            className="relative rounded-[12px] max-w-[85vw] max-h-[85vh] w-auto h-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Enlarged Image - Fixed dimensions for all images */}
              <div className="relative w-[320px] h-[240px] sm:w-[480px] sm:h-[360px] md:w-[560px] md:h-[380px] lg:w-[680px] lg:h-[460px] xl:w-[750px] xl:h-[510px] 2xl:w-[800px] 2xl:h-[540px] bg-transparent rounded-[8px] overflow-hidden flex items-center justify-center">
                <Image
                  src={enlargedImage}
                  alt={`Enlarged Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain rounded-[8px] transition-transform duration-300 ease-in-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 480px, (max-width: 1024px) 560px, (max-width: 1280px) 680px, (max-width: 1536px) 750px, 800px"
                />
                
                {/* Mobile Navigation Arrows - Positioned relative to image */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-2 sm:hidden top-1/2 cursor-pointer -translate-y-1/2 z-60 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-[#B9833E]"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-2 sm:hidden top-1/2 cursor-pointer -translate-y-1/2 z-60 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-[#B9833E]"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-3 mt-4 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full">
                <button
                  onClick={zoomOut}
                  className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-all duration-200 text-white hover:text-[#B9833E]"
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut size={16} />
                </button>
                
                <span className="text-white text-sm font-medium min-w-[60px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                
                <button
                  onClick={zoomIn}
                  className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-all duration-200 text-white hover:text-[#B9833E]"
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>

            {/* Desktop Navigation Arrows - Positioned at screen center edges */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="hidden sm:flex fixed left-8 top-1/2 cursor-pointer -translate-y-1/2 z-60 w-12 h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-[#B9833E]"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="hidden sm:flex fixed right-8 top-1/2 cursor-pointer -translate-y-1/2 z-60 w-12 h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-[#B9833E]"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
