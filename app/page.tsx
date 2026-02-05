import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">NextCloud. Limitless Innovation.</p>
              <h1 className="mt-4 text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Trust your tools. Transform your future.
              </h1>
              <p className="mt-6 text-lg text-gray-700 max-w-2xl">
                With built-in security and governance, NextCloud helps you build AI-powered solutions that scale and inspire. Pay as you go or try NextCloud free for up to 30 days.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/services" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
                  Get started with NextCloud
                </Link>
                <Link href="#" className="px-6 py-3 border border-gray-800 text-gray-800 font-medium rounded-md hover:bg-gray-50 transition">
                  Explore NextCloud AI Foundry
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-[1.02] transition">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <Image
                    src="/hero-person.png"
                    alt="Developer using NextCloud on tablet in modern office"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}