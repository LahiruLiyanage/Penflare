import { BookOpen, Users, GraduationCap, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';
import { getEnrollmentSummary, getCourseSummary } from '@/app/lib/crs-data-access';

export default async function CRSDashboard() {
  const enrollmentSummary = await getEnrollmentSummary();
  const courseSummary = await getCourseSummary();

  const stats = [
    {
      name: 'Total Students',
      value: enrollmentSummary.total_students,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Courses',
      value: courseSummary.active_courses,
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      name: 'Current Enrollments',
      value: enrollmentSummary.current_semester_enrollments,
      icon: GraduationCap,
      color: 'bg-yellow-500',
    },
    {
      name: 'Available Seats',
      value: courseSummary.available_seats,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Course Registration System
          </h2>
          <p className="text-gray-600">
            Manage courses, students, and enrollments efficiently with our comprehensive system.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} p-3 rounded-md`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Course Management
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Add, edit, and manage course offerings
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/crs/courses"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Manage Courses
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Student Management
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  View and manage student information
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/crs/students"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Manage Students
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Enrollment System
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Process student course registrations
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/crs/enrollments"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                View Enrollments
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600">
                System initialized with sample data
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600">
                {courseSummary.total_courses} courses loaded for Fall 2024
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600">
                {enrollmentSummary.total_students} students registered in system
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}