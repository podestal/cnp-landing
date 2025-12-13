import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const banners = [
  'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-1.jpeg',
  'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-2.jpeg',
  'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-3.jpeg',
  'https://pub-298b15d30a4a4c8b8bfd457d07eef0ec.r2.dev/cnp/banner/cnp-banner-4.jpeg',
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const goToSlide = (newIndex: number) => {
    const newDirection = newIndex > currentIndex ? 1 : -1
    setDirection(newDirection)
    setCurrentIndex(newIndex)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? banners.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % banners.length
    goToSlide(newIndex)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
