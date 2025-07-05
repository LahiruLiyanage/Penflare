import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function CRSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                Course Registration System
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/crs" className="text-gray-500 hover:text-gray-700">
                Dashboard
              </Link>
              <Link href="/crs/courses" className="text-gray-500 hover:text-gray-700">
                Courses
              </Link>
              <Link href="/crs/students" className="text-gray-500 hover:text-gray-700">
                Students
              </Link>
              <Link href="/crs/enrollments" className="text-gray-500 hover:text-gray-700">
                Enrollments
              </Link>
              <Link href="/crs/reports" className="text-gray-500 hover:text-gray-700">
                Reports
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/crs/profile" className="text-gray-500 hover:text-gray-700">
                Profile
              </Link>
              <Link href="/crs/logout" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Course Registration System. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/crs/help" className="text-gray-500 hover:text-gray-700 text-sm">
                Help
              </Link>
              <Link href="/crs/contact" className="text-gray-500 hover:text-gray-700 text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}