import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
    
    // Small delay to ensure DOM is ready, then trigger a minimal scroll
    // to force Framer Motion's viewport detection to recalculate
    const timer = setTimeout(() => {
      // Force viewport recalculation by triggering a resize-like event
      window.dispatchEvent(new Event('scroll'))
      // Also trigger a resize to ensure IntersectionObserver recalculates
      window.dispatchEvent(new Event('resize'))
    }, 200)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

export default ScrollToTop

