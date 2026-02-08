// src/app/dashboard/page.tsx
import Link from "next/link";
import { format } from "date-fns";
import { signOut } from "@/auth";
import { auth } from "@/auth";

export default async function DashboardPage() {
  // Mock data
  const session = await auth();

  console.log("Session : ", session);

  const user = {
    name: session?.user?.name || "" ,
    email: session?.user?.email,
    storageUsed: 8.4,
    storageTotal: 15,
    plan: "Free Plan",
  };

  



  const recentFiles = [
    { name: "project-proposal.pdf", size: "2.4 MB", date: "2025-11-18", type: "PDF" },
    { name: "vacation-photos.zip", size: "124 MB", date: "2025-11-17", type: "ZIP" },
    { name: "meeting-notes.docx", size: "89 KB", date: "2025-11-16", type: "DOC" },
    { name: "presentation-keynote.key", size: "45 MB", date: "2025-11-15", type: "KEY" },
  ];

  const storagePercent = (user.storageUsed / user.storageTotal) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NextCloud</h1>
              <p className="text-xs text-gray-500">Your files, anywhere</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {[
              { name: "My Files", icon: "Folder Open", active: true },
              { name: "Shared with Me", icon: "Users" },
              { name: "Recent", icon: "Clock" },
              { name: "Starred", icon: "Star" },
              { name: "Trash", icon: "Trash" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    item.active
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Storage Indicator */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Storage</span>
            <span className="font-medium">
              {user.storageUsed} GB of {user.storageTotal} GB
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${storagePercent}%` }}
            ></div>
          </div>
          <Link
            href="/pricing"
            className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Upgrade for more storage
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Files</h2>
              <p className="text-gray-600">Welcome back, {user.name.split(" ")[0]}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                + New Upload
              </button>
              {/* <Link>
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  Sign Out
                </div>
              </Link> */}
              <form action={async () => {
                  'use server'
                  await signOut({redirectTo: '/'});
              }}>
                  <button
                      className="text-sm text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-50"
                      >
                      Sign Out
                  </button>
              </form>
              
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Files", value: "1,284", icon: "Files" },
              { label: "Used Space", value: `${user.storageUsed} GB`, icon: "Hard Drive" },
              { label: "Shared Links", value: "12", icon: "Link" },
              { label: "Team Members", value: "0", icon: "Users" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Files */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Files</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentFiles.map((file) => (
                    <tr key={file.name} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                            {file.type}
                          </div>
                          <span className="ml-3 font-medium text-gray-900">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{file.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{file.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(new Date(file.date), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-4">Download</button>
                        <button className="text-gray-500 hover:text-gray-700">More</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}