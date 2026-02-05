// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 rounded-sm mr-2"></div>
              <span className="text-xl font-semibold text-white">NextCloud</span>
            </div>
            <p className="text-sm text-gray-400">
              Build AI-powered solutions with security, scale, and innovation.
            </p>
            <p className="text-xs text-gray-500 mt-4">© 2025 NextCloud, Inc. All rights reserved.</p>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">NextCloud AI</Link></li>
              <li><Link href="#" className="hover:text-white transition">Compute</Link></li>
              <li><Link href="#" className="hover:text-white transition">Storage</Link></li>
              <li><Link href="#" className="hover:text-white transition">Databases</Link></li>
              <li><Link href="#" className="hover:text-white transition">Networking</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Developers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Startups</Link></li>
              <li><Link href="#" className="hover:text-white transition">Enterprises</Link></li>
              <li><Link href="#" className="hover:text-white transition">AI & ML</Link></li>
              <li><Link href="#" className="hover:text-white transition">Security</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition">Tutorials</Link></li>
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Community</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">About</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Press</Link></li>
              <li><Link href="#" className="hover:text-white transition">Trust Center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition">Cookie Policy</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white transition">Twitter</Link>
            <Link href="#" className="hover:text-white transition">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition">GitHub</Link>
            <Link href="#" className="hover:text-white transition">YouTube</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}