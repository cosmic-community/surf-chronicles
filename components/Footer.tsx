import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">🏄‍♂️ Surf Chronicles</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-4 max-w-md">
              Your ultimate destination for surf culture, destinations, gear reviews, and techniques. 
              Join our community of passionate surfers exploring the world's best breaks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories/destinations" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/categories/gear-reviews" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  Gear Reviews
                </Link>
              </li>
              <li>
                <Link href="/categories/techniques" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                  Techniques
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="Instagram"
              >
                📸
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="YouTube"
              >
                📺
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="Twitter"
              >
                🐦
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {currentYear} Surf Chronicles. Built with Cosmic CMS.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}