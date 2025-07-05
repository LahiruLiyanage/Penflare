// Course Registration System Type Definitions

export type User = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: 'student' | 'faculty' | 'admin';
  student_id?: string;
  faculty_id?: string;
  created_at: Date;
  updated_at: Date;
}

export type Student = {
  id: string;
  name: string;
  email: string;
  date_of_birth: Date;
  program: string;
  year: number;
  contact_info: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export type Faculty = {
  id: string;
  name: string;
  email: string;
  department: string;
  contact_info: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export type Course = {
  id: string;
  title: string;
  code: string;
  description: string;
  credit_hours: number;
  department: string;
  prerequisites: string[]; // Array of course IDs
  max_enrollment: number;
  current_enrollment: number;
  instructor_id: string;
  semester: string;
  year: number;
  schedule: string;
  created_at: Date;
  updated_at: Date;
}

export type Enrollment = {
  id: string;
  student_id: string;
  course_id: string;
  semester: string;
  year: number;
  grade?: string;
  status: 'enrolled' | 'completed' | 'dropped' | 'withdrawn';
  enrollment_date: Date;
  completion_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export type PrerequisiteCheck = {
  course_id: string;
  student_id: string;
  met: boolean;
  missing_prerequisites: string[];
}

export type EnrollmentSummary = {
  total_students: number;
  enrolled_courses: number;
  completed_courses: number;
  current_semester_enrollments: number;
}

export type CourseSummary = {
  total_courses: number;
  active_courses: number;
  full_courses: number;
  available_seats: number;
}

// Legacy type for backward compatibility
export type Post = {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}