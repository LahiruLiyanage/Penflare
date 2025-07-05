// Course Registration System Data Access Layer (Mock Implementation)
import { unstable_noStore as noStore } from 'next/cache';
import type { 
  User, 
  Student, 
  Faculty, 
  Course, 
  Enrollment, 
  PrerequisiteCheck,
  EnrollmentSummary,
  CourseSummary 
} from './definitions';
import { crsData } from './crs-data.js';

// Mock data implementation for demonstration
export async function connectToDB() {
  console.log('Connected to CRS Mock DB');
  return true;
}

// User Management
export async function getUserByCredentials(email: string): Promise<User | null> {
  try {
    noStore();
    const user = crsData.users.find(u => u.email === email);
    return user || null;
  } catch (error) {
    console.error('Error getting user by credentials:', error);
    return null;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    noStore();
    const user = crsData.users.find(u => u.id === userId);
    return user || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

// Student Management
export async function getStudents(): Promise<Student[]> {
  try {
    noStore();
    return crsData.students;
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
}

export async function getStudentById(studentId: string): Promise<Student | null> {
  try {
    noStore();
    const student = crsData.students.find(s => s.id === studentId);
    return student || null;
  } catch (error) {
    console.error('Error getting student by ID:', error);
    return null;
  }
}

export async function getStudentByUserId(userId: string): Promise<Student | null> {
  try {
    noStore();
    const student = crsData.students.find(s => s.user_id === userId);
    return student || null;
  } catch (error) {
    console.error('Error getting student by user ID:', error);
    return null;
  }
}

// Faculty Management
export async function getFaculty(): Promise<Faculty[]> {
  try {
    noStore();
    return crsData.faculty;
  } catch (error) {
    console.error('Error getting faculty:', error);
    return [];
  }
}

export async function getFacultyById(facultyId: string): Promise<Faculty | null> {
  try {
    noStore();
    const faculty = crsData.faculty.find(f => f.id === facultyId);
    return faculty || null;
  } catch (error) {
    console.error('Error getting faculty by ID:', error);
    return null;
  }
}

// Course Management
export async function getCourses(): Promise<Course[]> {
  try {
    noStore();
    return crsData.courses.map(course => ({
      ...course,
      instructor_name: crsData.faculty.find(f => f.id === course.instructor_id)?.name || 'Not assigned'
    }));
  } catch (error) {
    console.error('Error getting courses:', error);
    return [];
  }
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    noStore();
    const course = crsData.courses.find(c => c.id === courseId);
    if (!course) return null;
    
    return {
      ...course,
      instructor_name: crsData.faculty.find(f => f.id === course.instructor_id)?.name || 'Not assigned'
    };
  } catch (error) {
    console.error('Error getting course by ID:', error);
    return null;
  }
}

export async function getCoursesByDepartment(department: string): Promise<Course[]> {
  try {
    noStore();
    return crsData.courses
      .filter(c => c.department === department)
      .map(course => ({
        ...course,
        instructor_name: crsData.faculty.find(f => f.id === course.instructor_id)?.name || 'Not assigned'
      }));
  } catch (error) {
    console.error('Error getting courses by department:', error);
    return [];
  }
}

export async function getAvailableCourses(): Promise<Course[]> {
  try {
    noStore();
    return crsData.courses
      .filter(c => c.current_enrollment < c.max_enrollment)
      .map(course => ({
        ...course,
        instructor_name: crsData.faculty.find(f => f.id === course.instructor_id)?.name || 'Not assigned'
      }));
  } catch (error) {
    console.error('Error getting available courses:', error);
    return [];
  }
}

// Enrollment Management
export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    noStore();
    return crsData.enrollments.map(enrollment => {
      const student = crsData.students.find(s => s.id === enrollment.student_id);
      const course = crsData.courses.find(c => c.id === enrollment.course_id);
      return {
        ...enrollment,
        student_name: student?.name || 'Unknown Student',
        course_title: course?.title || 'Unknown Course',
        course_code: course?.code || 'Unknown',
        program: student?.program || 'Unknown Program',
        student_email: student?.email || 'Unknown Email'
      };
    });
  } catch (error) {
    console.error('Error getting enrollments:', error);
    return [];
  }
}

export async function getEnrollmentsByStudentId(studentId: string): Promise<Enrollment[]> {
  try {
    noStore();
    return crsData.enrollments
      .filter(e => e.student_id === studentId)
      .map(enrollment => {
        const course = crsData.courses.find(c => c.id === enrollment.course_id);
        const faculty = course ? crsData.faculty.find(f => f.id === course.instructor_id) : null;
        return {
          ...enrollment,
          course_title: course?.title || 'Unknown Course',
          course_code: course?.code || 'Unknown',
          credit_hours: course?.credit_hours || 0,
          instructor_name: faculty?.name || 'Not assigned'
        };
      });
  } catch (error) {
    console.error('Error getting enrollments by student ID:', error);
    return [];
  }
}

export async function getEnrollmentsByCourseId(courseId: string): Promise<Enrollment[]> {
  try {
    noStore();
    return crsData.enrollments
      .filter(e => e.course_id === courseId)
      .map(enrollment => {
        const student = crsData.students.find(s => s.id === enrollment.student_id);
        return {
          ...enrollment,
          student_name: student?.name || 'Unknown Student',
          student_email: student?.email || 'Unknown Email',
          program: student?.program || 'Unknown Program'
        };
      });
  } catch (error) {
    console.error('Error getting enrollments by course ID:', error);
    return [];
  }
}

// Check prerequisites for a student and course
export async function checkPrerequisites(studentId: string, courseId: string): Promise<PrerequisiteCheck> {
  try {
    noStore();
    
    const course = crsData.courses.find(c => c.id === courseId);
    if (!course) {
      return {
        course_id: courseId,
        student_id: studentId,
        met: false,
        missing_prerequisites: ['Course not found']
      };
    }
    
    const prerequisites = course.prerequisites || [];
    
    if (prerequisites.length === 0) {
      return {
        course_id: courseId,
        student_id: studentId,
        met: true,
        missing_prerequisites: []
      };
    }
    
    // Check if student has completed all prerequisites
    const completedCourseIds = crsData.enrollments
      .filter(e => e.student_id === studentId && e.status === 'completed')
      .map(e => e.course_id);
    
    const missingPrereqs = prerequisites.filter(prereq => !completedCourseIds.includes(prereq));
    
    // Get course codes for missing prerequisites
    const missingCourseCodes = missingPrereqs.map(prereqId => {
      const prereqCourse = crsData.courses.find(c => c.id === prereqId);
      return prereqCourse?.code || prereqId;
    });
    
    return {
      course_id: courseId,
      student_id: studentId,
      met: missingPrereqs.length === 0,
      missing_prerequisites: missingCourseCodes
    };
  } catch (error) {
    console.error('Error checking prerequisites:', error);
    return {
      course_id: courseId,
      student_id: studentId,
      met: false,
      missing_prerequisites: ['Error checking prerequisites']
    };
  }
}

// Enroll student in course
export async function enrollStudent(studentId: string, courseId: string, semester: string, year: number): Promise<boolean> {
  try {
    noStore();
    
    // Check if already enrolled
    const existingEnrollment = crsData.enrollments.find(e => 
      e.student_id === studentId && 
      e.course_id === courseId && 
      e.semester === semester && 
      e.year === year &&
      e.status === 'enrolled'
    );
    
    if (existingEnrollment) {
      return false; // Already enrolled
    }
    
    // Check course availability
    const course = crsData.courses.find(c => c.id === courseId);
    if (!course) {
      return false; // Course not found
    }
    
    if (course.current_enrollment >= course.max_enrollment) {
      return false; // Course full
    }
    
    // Create new enrollment (in a real app, this would be persisted)
    const newEnrollment = {
      id: `enrollment-${Date.now()}`,
      student_id: studentId,
      course_id: courseId,
      semester,
      year,
      grade: null,
      status: 'enrolled' as const,
      enrollment_date: new Date().toISOString(),
      completion_date: null,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    // Add to mock data (in-memory only)
    crsData.enrollments.push(newEnrollment);
    
    // Update course enrollment count
    course.current_enrollment += 1;
    
    return true;
  } catch (error) {
    console.error('Error enrolling student:', error);
    return false;
  }
}

// Get enrollment summary for dashboard
export async function getEnrollmentSummary(): Promise<EnrollmentSummary> {
  try {
    noStore();
    
    const totalStudents = crsData.students.length;
    const enrolledCourses = crsData.enrollments.filter(e => e.status === 'enrolled').length;
    const completedCourses = crsData.enrollments.filter(e => e.status === 'completed').length;
    const currentSemesterEnrollments = crsData.enrollments.filter(e => 
      e.status === 'enrolled' && e.semester === 'Fall' && e.year === 2024
    ).length;
    
    return {
      total_students: totalStudents,
      enrolled_courses: enrolledCourses,
      completed_courses: completedCourses,
      current_semester_enrollments: currentSemesterEnrollments
    };
  } catch (error) {
    console.error('Error getting enrollment summary:', error);
    return {
      total_students: 0,
      enrolled_courses: 0,
      completed_courses: 0,
      current_semester_enrollments: 0
    };
  }
}

// Get course summary for dashboard
export async function getCourseSummary(): Promise<CourseSummary> {
  try {
    noStore();
    
    const totalCourses = crsData.courses.length;
    const activeCourses = crsData.courses.filter(c => c.semester === 'Fall' && c.year === 2024).length;
    const fullCourses = crsData.courses.filter(c => c.current_enrollment >= c.max_enrollment).length;
    const availableSeats = crsData.courses.reduce((sum, c) => sum + (c.max_enrollment - c.current_enrollment), 0);
    
    return {
      total_courses: totalCourses,
      active_courses: activeCourses,
      full_courses: fullCourses,
      available_seats: availableSeats
    };
  } catch (error) {
    console.error('Error getting course summary:', error);
    return {
      total_courses: 0,
      active_courses: 0,
      full_courses: 0,
      available_seats: 0
    };
  }
}

// Legacy function for backward compatibility
export async function getPosts() {
  try {
    noStore();
    // Return empty array for posts since we're focusing on CRS
    return [];
  } catch (error) {
    console.error('Error getting posts', error);
    return [];
  }
}