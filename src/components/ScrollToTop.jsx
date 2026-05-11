import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top of page on every route change.
// Place inside <BrowserRouter> in App.js so it has access to router context.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default ScrollToTop