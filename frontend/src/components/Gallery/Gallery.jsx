"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ButtonWithImage from "@/UI/AnimatedButton";
import { getGalleryImages, getGalleryCategories } from "@/lib/gallery"; // adjust path if needed
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

export default function Gallery() {
  const [categories, setCategories] = useState(["All Photos"]);
  const [imagesData, setImagesData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [loading, setLoading] = useState(true);
  
  // Image enlargement state
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, imgs] = await Promise.all([
          getGalleryCategories(),
          getGalleryImages(),
        ]);
        setCategories(cats);
        setImagesData(imgs);
      } catch (error) {
        console.error("Error loading gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter images
  const filteredImages =
    activeCategory === "All Photos"
      ? imagesData
      : imagesData.filter((img) => img.category === activeCategory);

  // Handle image enlargement
  const handleImageClick = (image, index) => {
    setEnlargedImage(image);
    setCurrentImageIndex(index);
  };

  // Handle navigation in enlarged view
  const navigateImage = (direction) => {
    const totalImages = filteredImages.length;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentImageIndex === 0 ? totalImages - 1 : currentImageIndex - 1;
    } else {
      newIndex = currentImageIndex === totalImages - 1 ? 0 : currentImageIndex + 1;
    }
    
    setCurrentImageIndex(newIndex);
    setEnlargedImage(filteredImages[newIndex]);
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

  if (loading) {
    // 🔹 Full-page skeleton loader
    return (
      <div className="bg-[#071E2F] py-12 px-4 md:px-16 text-white relative min-h-screen">
        <div className="flex flex-col gap-6 w-full py-8 px-8 bg-[#0d2a3e] rounded-[10px] animate-pulse">
          <div className="w-32 h-10 bg-gray-700 rounded" /> {/* button */}
          <div className="w-full h-8 bg-gray-700 rounded" /> {/* categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="w-full h-64 bg-gray-700 rounded-[10px]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#071E2F] py-12 px-4 md:px-16 text-white relative">
      {/* Background Wrapper */}
      <div
        className="flex flex-col gap-6 w-full bg-cover py-8 px-8 bg-bottom bg-no-repeat rounded-[10px]"
        style={{ backgroundImage: 'url("/gallery/cardbg.png")' }}
      >
        <div className="mb-2">
          <ButtonWithImage text="See" />
        </div>

        {/* Mobile Dropdown */}
        <div className="block md:hidden mt-4 rounded-[10px] bg-[#064C7C]/58 p-[2px] py-4 px-4 cursor-pointer">
          <select
            className="w-full bg-[#071E2F] text-white rounded-[10px] px-4 py-2 min-h-[40px]"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="hover:bg-gradient-to-r from-[#064C7C] to-[#BA833C]"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:inline-block w-fit mt-4 rounded-[10px] p-[2px] py-4 px-6 bg-[#064C7C]/58 cursor-pointer">
          <div className="flex rounded-full overflow-hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#064C7C] to-[#BA833C] text-white font-bold rounded-[10px]"
                    : "text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Swiper Slider */}
        <div className="block md:hidden mt-6 relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={12}
            slidesPerView={1.2}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            loop
          >
            {filteredImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  className="relative w-full h-64 rounded-[10px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => handleImageClick(img, idx)}
                >
                  <Image
                    src={img.src}
                    alt={`Gallery Image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer text-[#B9833E] ">
            <ChevronLeft size={24} />{" "}
          </div>
          <div className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer text-[#B9833E] ">
            <ChevronRight size={24} />
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-64 rounded-[10px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => handleImageClick(img, idx)}
            >
              <Image
                src={img.src}
                alt={`Gallery Image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Google Drive Style Image Popup */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeEnlargedView}
        >
          {/* Popup Container */}
          <div 
            className="relative  rounded-[12px] max-w-[85vw] max-h-[85vh] w-auto h-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
           

            {/* Image Container */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Enlarged Image - Fixed dimensions for all images */}
              <div className="relative w-[320px] h-[240px] sm:w-[480px] sm:h-[360px] md:w-[560px] md:h-[380px] lg:w-[680px] lg:h-[460px] xl:w-[750px] xl:h-[510px] 2xl:w-[800px] 2xl:h-[540px] bg-transparent rounded-[8px] overflow-hidden flex items-center justify-center ">
                <Image
                  src={enlargedImage.src}
                  alt={`Enlarged Gallery Image ${currentImageIndex + 1}`}
                  fill
                  className="sm:object-contain object-cover rounded-[8px] transition-transform duration-300 ease-in-out"
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

            {/* Footer with navigation info */}
           
          </div>
        </div>
      )}
    </div>
  );
}