import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {

    return (
        <>
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 rounded-sm mr-2"></div>
                    <Link href="/">
                      <span className="text-xl font-semibold text-gray-900">NextCloud</span>
                    </Link>
                    
                  </div>
                  <nav className="hidden md:flex ml-10 space-x-8 text-sm font-medium text-gray-700 hover:text-gray-900">
                    <Link href="/services">Explore</Link>
                    <Link href="/services">Services</Link>
                    <Link href="/services">Solutions</Link>
                    <Link href="#">Pricing</Link>
                    <Link href="/services">More</Link>
                  </nav>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <Link href="#" className="font-medium text-gray-700 hover:text-gray-900">Learn</Link>
                  <Link href="#" className="font-medium text-gray-700 hover:text-gray-900">Support</Link>
                  <Link href="#" className="font-medium text-gray-700 hover:text-gray-900">Contact Sales</Link>
                  <Link href="/services" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Get started with NextCloud
                  </Link>
                  
                  
                    <>
                      <Link href="/login" className="border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50">
                        Sign in
                      </Link>
                    </>
                  

                  
                </div>
              </div>
            </div>
          </header>
        </>
    )
}