import { BookOpen, Users, Clock, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';
import { getCourses } from '@/app/lib/crs-data-access';

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all courses offered in the current semester
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/crs/courses/add"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Link>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {course.code}
                    </h3>
                    <p className="text-sm text-gray-500">{course.department}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    course.current_enrollment >= course.max_enrollment
                      ? 'bg-red-100 text-red-800'
                      : course.current_enrollment / course.max_enrollment > 0.8
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {course.current_enrollment}/{course.max_enrollment}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-base font-medium text-gray-900">
                  {course.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Instructor: {course.instructor_name || 'Not assigned'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{course.credit_hours} Credit Hours</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">
                    {course.semester} {course.year}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/crs/courses/${course.id}`}
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/crs/courses/${course.id}/edit`}
                    className="text-gray-600 hover:text-gray-500 text-sm font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No courses</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first course.
          </p>
          <div className="mt-6">
            <Link
              href="/crs/courses/add"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}