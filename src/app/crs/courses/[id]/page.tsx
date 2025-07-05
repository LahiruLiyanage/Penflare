import { BookOpen, Users, User, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { getCourseById, getEnrollmentsByCourseId } from '@/app/lib/crs-data-access-mock';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const course = await getCourseById(params.id);
  const enrollments = await getEnrollmentsByCourseId(params.id);

  if (!course) {
    notFound();
  }

  const enrollmentRate = (course.current_enrollment / course.max_enrollment) * 100;
  const availableSeats = course.max_enrollment - course.current_enrollment;

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <div>
        <Link href="/crs/courses" className="text-blue-600 hover:text-blue-500 font-medium">
          ← Back to Courses
        </Link>
      </div>

      {/* Course Header */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-10 w-10 text-blue-600" />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">{course.code}</h1>
                <p className="text-lg text-gray-600">{course.title}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                availableSeats === 0 ? 'bg-red-100 text-red-800' :
                availableSeats <= 5 ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {availableSeats === 0 ? 'Full' : `${availableSeats} seats available`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{course.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="mt-1 text-gray-900">{course.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Credit Hours</h3>
                  <p className="mt-1 text-gray-900">{course.credit_hours}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Semester</h3>
                  <p className="mt-1 text-gray-900">{course.semester} {course.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Schedule</h3>
                  <p className="mt-1 text-gray-900">{course.schedule}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Instructor</h3>
                <p className="mt-1 text-gray-900">{course.instructor_name || 'Not assigned'}</p>
              </div>

              {course.prerequisites && course.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Prerequisites</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {course.prerequisites.map((prereq, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enrollment Stats */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Enrollment Statistics</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Current Enrollment</span>
                <span className="text-2xl font-bold text-gray-900">{course.current_enrollment}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Maximum Capacity</span>
                <span className="text-lg font-semibold text-gray-700">{course.max_enrollment}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Available Seats</span>
                <span className={`text-lg font-semibold ${
                  availableSeats === 0 ? 'text-red-600' : 
                  availableSeats <= 5 ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {availableSeats}
                </span>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Enrollment Rate</span>
                  <span className="text-sm font-medium text-gray-900">{enrollmentRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      enrollmentRate >= 100 ? 'bg-red-500' :
                      enrollmentRate >= 80 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(enrollmentRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href={`/crs/enrollments/add?courseId=${course.id}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Enroll Student
              </Link>
              <Link
                href={`/crs/courses/${course.id}/edit`}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Students */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Enrolled Students</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {enrollments.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students enrolled</h3>
              <p className="mt-1 text-sm text-gray-500">
                This course doesn&apos;t have any enrolled students yet.
              </p>
            </div>
          ) : (
            enrollments.map((enrollment) => (
              <div key={enrollment.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {enrollment.student_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enrollment.program} • {enrollment.student_email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      Status: <span className={`font-medium ${
                        enrollment.status === 'enrolled' ? 'text-blue-600' :
                        enrollment.status === 'completed' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {enrollment.status}
                      </span>
                    </div>
                    {enrollment.grade && (
                      <div className="text-sm text-gray-500">
                        Grade: <span className="font-medium">{enrollment.grade}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}