// src/app/products/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const services = [
    {
      title: "Storage Services",
      description: "High-performance, scalable object storage with S3 compatibility. Store unlimited data securely.",
      icon: "🗄️",
      features: ["S3 Compatible", "Unlimited Scale", "99.999% Durability", "Encryption at Rest"],
      link: "/storage-services",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Virtual Machines",
      description: "Deploy and manage Linux/Windows VMs in seconds. Full root access and custom configurations.",
      icon: "🖥️",
      features: ["Linux & Windows", "Custom CPU/RAM", "SSD Storage", "Instant Deployment"],
      link: "#",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "AI & Machine Learning",
      description: "Pre-built ML environments with GPU acceleration. Train models at scale.",
      icon: "🤖",
      features: ["GPU Instances", "Jupyter Notebooks", "ML Frameworks", "Auto-Scaling"],
      link: "#",
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Databases",
      description: "Managed PostgreSQL, MySQL, and NoSQL databases with automatic backups and scaling.",
      icon: "🗃️",
      features: ["Auto Backups", "Read Replicas", "High Availability", "Point-in-Time Recovery"],
      link: "#",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Networking & CDN",
      description: "Global content delivery, load balancing, and private networking for low-latency apps.",
      icon: "🌐",
      features: ["Global CDN", "Load Balancer", "Private VPC", "DDoS Protection"],
      link: "#",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security with IAM, encryption, and compliance certifications.",
      icon: "🔐",
      features: ["IAM Roles", "KMS Encryption", "SOC 2, ISO 27001", "Audit Logs"],
      link: "#",
      gradient: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
            Our Products & Services
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            From storage to compute, AI to security — everything you need to build, scale, and innovate.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-2 group-hover:opacity-10 rounded-2xl `}></div> */}

                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{service.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>

                <p className="text-gray-600 mb-4">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.link}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Deploy your first service in under 5 minutes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="#"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-50 transition"
            >
              Start Free Trial
            </Link>
            <Link
              href="#"
              className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}