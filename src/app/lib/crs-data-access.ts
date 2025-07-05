// Course Registration System Data Access Layer
import { createClient } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
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

export async function connectToDB() {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      console.log('Connected to CRS DB');
      return client;
    }
  } catch (error) {
    console.error('Error connecting to CRS DB', error);
  }
}

// User Management
export async function getUserByCredentials(email: string): Promise<User | null> {
  try {
    noStore();
    const data = await sql`
      SELECT * FROM users 
      WHERE email = ${email} 
      LIMIT 1
    `;
    
    if (data.rows.length === 0) {
      return null;
    }
    
    return data.rows[0] as User;
  } catch (error) {
    console.error('Error getting user by credentials:', error);
    return null;
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    noStore();
    const data = await sql`
      SELECT * FROM users 
      WHERE id = ${userId} 
      LIMIT 1
    `;
    
    return data.rows[0] as User || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

// Student Management
export async function getStudents(): Promise<Student[]> {
  try {
    noStore();
    const data = await sql`
      SELECT s.*, u.username, u.email as user_email
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.name
    `;
    
    return data.rows as Student[];
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
}

export async function getStudentById(studentId: string): Promise<Student | null> {
  try {
    noStore();
    const data = await sql`
      SELECT s.*, u.username, u.email as user_email
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.id = ${studentId}
      LIMIT 1
    `;
    
    return data.rows[0] as Student || null;
  } catch (error) {
    console.error('Error getting student by ID:', error);
    return null;
  }
}

export async function getStudentByUserId(userId: string): Promise<Student | null> {
  try {
    noStore();
    const data = await sql`
      SELECT s.*, u.username, u.email as user_email
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.user_id = ${userId}
      LIMIT 1
    `;
    
    return data.rows[0] as Student || null;
  } catch (error) {
    console.error('Error getting student by user ID:', error);
    return null;
  }
}

// Faculty Management
export async function getFaculty(): Promise<Faculty[]> {
  try {
    noStore();
    const data = await sql`
      SELECT f.*, u.username, u.email as user_email
      FROM faculty f
      LEFT JOIN users u ON f.user_id = u.id
      ORDER BY f.name
    `;
    
    return data.rows as Faculty[];
  } catch (error) {
    console.error('Error getting faculty:', error);
    return [];
  }
}

export async function getFacultyById(facultyId: string): Promise<Faculty | null> {
  try {
    noStore();
    const data = await sql`
      SELECT f.*, u.username, u.email as user_email
      FROM faculty f
      LEFT JOIN users u ON f.user_id = u.id
      WHERE f.id = ${facultyId}
      LIMIT 1
    `;
    
    return data.rows[0] as Faculty || null;
  } catch (error) {
    console.error('Error getting faculty by ID:', error);
    return null;
  }
}

// Course Management
export async function getCourses(): Promise<Course[]> {
  try {
    noStore();
    const data = await sql`
      SELECT c.*, f.name as instructor_name
      FROM courses c
      LEFT JOIN faculty f ON c.instructor_id = f.id
      ORDER BY c.department, c.code
    `;
    
    return data.rows as Course[];
  } catch (error) {
    console.error('Error getting courses:', error);
    return [];
  }
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    noStore();
    const data = await sql`
      SELECT c.*, f.name as instructor_name
      FROM courses c
      LEFT JOIN faculty f ON c.instructor_id = f.id
      WHERE c.id = ${courseId}
      LIMIT 1
    `;
    
    return data.rows[0] as Course || null;
  } catch (error) {
    console.error('Error getting course by ID:', error);
    return null;
  }
}

export async function getCoursesByDepartment(department: string): Promise<Course[]> {
  try {
    noStore();
    const data = await sql`
      SELECT c.*, f.name as instructor_name
      FROM courses c
      LEFT JOIN faculty f ON c.instructor_id = f.id
      WHERE c.department = ${department}
      ORDER BY c.code
    `;
    
    return data.rows as Course[];
  } catch (error) {
    console.error('Error getting courses by department:', error);
    return [];
  }
}

export async function getAvailableCourses(): Promise<Course[]> {
  try {
    noStore();
    const data = await sql`
      SELECT c.*, f.name as instructor_name
      FROM courses c
      LEFT JOIN faculty f ON c.instructor_id = f.id
      WHERE c.current_enrollment < c.max_enrollment
      ORDER BY c.department, c.code
    `;
    
    return data.rows as Course[];
  } catch (error) {
    console.error('Error getting available courses:', error);
    return [];
  }
}

// Enrollment Management
export async function getEnrollments(): Promise<Enrollment[]> {
  try {
    noStore();
    const data = await sql`
      SELECT e.*, s.name as student_name, c.title as course_title, c.code as course_code
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrollment_date DESC
    `;
    
    return data.rows as Enrollment[];
  } catch (error) {
    console.error('Error getting enrollments:', error);
    return [];
  }
}

export async function getEnrollmentsByStudentId(studentId: string): Promise<Enrollment[]> {
  try {
    noStore();
    const data = await sql`
      SELECT e.*, c.title as course_title, c.code as course_code, c.credit_hours, f.name as instructor_name
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN faculty f ON c.instructor_id = f.id
      WHERE e.student_id = ${studentId}
      ORDER BY e.year DESC, e.semester, c.code
    `;
    
    return data.rows as Enrollment[];
  } catch (error) {
    console.error('Error getting enrollments by student ID:', error);
    return [];
  }
}

export async function getEnrollmentsByCourseId(courseId: string): Promise<Enrollment[]> {
  try {
    noStore();
    const data = await sql`
      SELECT e.*, s.name as student_name, s.email as student_email, s.program
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      WHERE e.course_id = ${courseId}
      ORDER BY s.name
    `;
    
    return data.rows as Enrollment[];
  } catch (error) {
    console.error('Error getting enrollments by course ID:', error);
    return [];
  }
}

// Check prerequisites for a student and course
export async function checkPrerequisites(studentId: string, courseId: string): Promise<PrerequisiteCheck> {
  try {
    noStore();
    
    // Get course prerequisites
    const courseData = await sql`
      SELECT prerequisites FROM courses WHERE id = ${courseId}
    `;
    
    if (courseData.rows.length === 0) {
      return {
        course_id: courseId,
        student_id: studentId,
        met: false,
        missing_prerequisites: ['Course not found']
      };
    }
    
    const prerequisites = courseData.rows[0].prerequisites || [];
    
    if (prerequisites.length === 0) {
      return {
        course_id: courseId,
        student_id: studentId,
        met: true,
        missing_prerequisites: []
      };
    }
    
    // Check if student has completed all prerequisites
    const completedData = await sql`
      SELECT DISTINCT course_id 
      FROM enrollments 
      WHERE student_id = ${studentId} 
      AND status = 'completed'
      AND course_id = ANY(${prerequisites})
    `;
    
    const completedPrereqs = completedData.rows.map(row => row.course_id);
    const missingPrereqs = prerequisites.filter(prereq => !completedPrereqs.includes(prereq));
    
    // Get course codes for missing prerequisites
    const missingCourses = await sql`
      SELECT code FROM courses WHERE id = ANY(${missingPrereqs})
    `;
    
    const missingCourseCodes = missingCourses.rows.map(row => row.code);
    
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
    const existingEnrollment = await sql`
      SELECT id FROM enrollments 
      WHERE student_id = ${studentId} 
      AND course_id = ${courseId} 
      AND semester = ${semester} 
      AND year = ${year}
      AND status = 'enrolled'
    `;
    
    if (existingEnrollment.rows.length > 0) {
      return false; // Already enrolled
    }
    
    // Check course availability
    const courseData = await sql`
      SELECT current_enrollment, max_enrollment 
      FROM courses 
      WHERE id = ${courseId}
    `;
    
    if (courseData.rows.length === 0) {
      return false; // Course not found
    }
    
    const { current_enrollment, max_enrollment } = courseData.rows[0];
    if (current_enrollment >= max_enrollment) {
      return false; // Course full
    }
    
    // Create enrollment
    await sql`
      INSERT INTO enrollments (student_id, course_id, semester, year, status)
      VALUES (${studentId}, ${courseId}, ${semester}, ${year}, 'enrolled')
    `;
    
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
    
    const data = await sql`
      SELECT 
        COUNT(DISTINCT s.id) as total_students,
        COUNT(DISTINCT CASE WHEN e.status = 'enrolled' THEN e.id END) as enrolled_courses,
        COUNT(DISTINCT CASE WHEN e.status = 'completed' THEN e.id END) as completed_courses,
        COUNT(DISTINCT CASE WHEN e.status = 'enrolled' AND e.semester = 'Fall' AND e.year = 2024 THEN e.id END) as current_semester_enrollments
      FROM students s
      LEFT JOIN enrollments e ON s.id = e.student_id
    `;
    
    return data.rows[0] as EnrollmentSummary;
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
    
    const data = await sql`
      SELECT 
        COUNT(*) as total_courses,
        COUNT(CASE WHEN semester = 'Fall' AND year = 2024 THEN 1 END) as active_courses,
        COUNT(CASE WHEN current_enrollment >= max_enrollment THEN 1 END) as full_courses,
        SUM(max_enrollment - current_enrollment) as available_seats
      FROM courses
    `;
    
    return data.rows[0] as CourseSummary;
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
    const data = await sql`SELECT * FROM posts ORDER BY date DESC`;
    return data.rows;
  } catch (error) {
    console.error('Error getting posts', error);
    return [];
  }
}