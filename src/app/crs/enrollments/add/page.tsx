'use client';

import { useState, useEffect } from 'react';
import { UserPlus, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  program: string;
  year: number;
}

interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  current_enrollment: number;
  max_enrollment: number;
  prerequisites: string[];
}

export default function AddEnrollmentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [semester, setSemester] = useState('Fall');
  const [year, setYear] = useState(2024);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        fetch('/api/crs?action=students'),
        fetch('/api/crs?action=courses')
      ]);
      
      const studentsData = await studentsRes.json();
      const coursesData = await coursesRes.json();
      
      setStudents(studentsData.students || []);
      setCourses(coursesData.courses || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !selectedCourse) {
      setMessage('Please select both student and course');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/crs?action=enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: selectedStudent,
          courseId: selectedCourse,
          semester,
          year,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Student enrolled successfully!');
        setMessageType('success');
        setSelectedStudent('');
        setSelectedCourse('');
        await fetchData(); // Refresh data
      } else {
        setMessage(data.error || 'Enrollment failed');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error enrolling student:', error);
      setMessage('An error occurred while enrolling the student');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const selectedCourseData = courses.find(c => c.id === selectedCourse);
  const isCourseFull = selectedCourseData && selectedCourseData.current_enrollment >= selectedCourseData.max_enrollment;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <UserPlus className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Enroll Student</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Selection */}
            <div>
              <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select
                id="student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose a student...</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.program} (Year {student.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Course Selection */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                Select Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose a course...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.title} ({course.current_enrollment}/{course.max_enrollment})
                  </option>
                ))}
              </select>
            </div>

            {/* Course Info */}
            {selectedCourseData && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Course Information</h3>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Department:</strong> {selectedCourseData.department}</p>
                  <p><strong>Enrollment:</strong> {selectedCourseData.current_enrollment}/{selectedCourseData.max_enrollment}</p>
                  {selectedCourseData.prerequisites.length > 0 && (
                    <p><strong>Prerequisites:</strong> {selectedCourseData.prerequisites.join(', ')}</p>
                  )}
                </div>
                {isCourseFull && (
                  <div className="mt-2 flex items-center text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Course is full</span>
                  </div>
                )}
              </div>
            )}

            {/* Semester Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                </select>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-md ${messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <div className="flex items-center">
                  {messageType === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  <span>{message}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <Link
                href="/crs/enrollments"
                className="text-gray-600 hover:text-gray-500 font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || isCourseFull}
                className={`px-4 py-2 rounded-md font-medium ${
                  loading || isCourseFull
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? 'Enrolling...' : 'Enroll Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}