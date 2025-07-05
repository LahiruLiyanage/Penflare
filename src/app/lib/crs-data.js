// Sample data for Course Registration System

// Sample users (passwords are hashed versions of 'password123')
export const users = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    username: 'admin',
    email: 'admin@university.edu',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0qKpJhFg6a', // password123
    role: 'admin',
    student_id: null,
    faculty_id: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    username: 'john_doe',
    email: 'john.doe@student.edu',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0qKpJhFg6a', // password123
    role: 'student',
    student_id: '00000000-0000-0000-0000-000000000001',
    faculty_id: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    username: 'jane_smith',
    email: 'jane.smith@student.edu',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0qKpJhFg6a', // password123
    role: 'student',
    student_id: '00000000-0000-0000-0000-000000000002',
    faculty_id: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    username: 'dr_wilson',
    email: 'dr.wilson@faculty.edu',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0qKpJhFg6a', // password123
    role: 'faculty',
    student_id: null,
    faculty_id: '00000000-0000-0000-0000-000000000001',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    username: 'prof_johnson',
    email: 'prof.johnson@faculty.edu',
    password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0qKpJhFg6a', // password123
    role: 'faculty',
    student_id: null,
    faculty_id: '00000000-0000-0000-0000-000000000002',
  },
];

// Sample students
export const students = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'John Doe',
    email: 'john.doe@student.edu',
    date_of_birth: '2002-03-15',
    program: 'Computer Science',
    year: 2,
    contact_info: 'Phone: +1-555-0123',
    user_id: '00000000-0000-0000-0000-000000000002',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Jane Smith',
    email: 'jane.smith@student.edu',
    date_of_birth: '2001-07-22',
    program: 'Computer Science',
    year: 3,
    contact_info: 'Phone: +1-555-0124',
    user_id: '00000000-0000-0000-0000-000000000003',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Mike Johnson',
    email: 'mike.johnson@student.edu',
    date_of_birth: '2003-01-10',
    program: 'Mathematics',
    year: 1,
    contact_info: 'Phone: +1-555-0125',
    user_id: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Sarah Davis',
    email: 'sarah.davis@student.edu',
    date_of_birth: '2000-11-03',
    program: 'Computer Science',
    year: 4,
    contact_info: 'Phone: +1-555-0126',
    user_id: null,
  },
];

// Sample faculty
export const faculty = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Dr. Robert Wilson',
    email: 'dr.wilson@faculty.edu',
    department: 'Computer Science',
    contact_info: 'Office: CS Building Room 301, Phone: +1-555-1001',
    user_id: '00000000-0000-0000-0000-000000000004',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Prof. Linda Johnson',
    email: 'prof.johnson@faculty.edu',
    department: 'Mathematics',
    contact_info: 'Office: Math Building Room 205, Phone: +1-555-1002',
    user_id: '00000000-0000-0000-0000-000000000005',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Dr. James Brown',
    email: 'dr.brown@faculty.edu',
    department: 'Computer Science',
    contact_info: 'Office: CS Building Room 315, Phone: +1-555-1003',
    user_id: null,
  },
];

// Sample courses
export const courses = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    title: 'Introduction to Programming',
    code: 'CS101',
    description: 'Basic programming concepts using Python. Covers variables, control structures, functions, and basic data structures.',
    credit_hours: 3,
    department: 'Computer Science',
    prerequisites: [],
    max_enrollment: 30,
    current_enrollment: 2,
    instructor_id: '00000000-0000-0000-0000-000000000001',
    semester: 'Fall',
    year: 2024,
    schedule: 'MWF 9:00-10:00 AM',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    title: 'Data Structures and Algorithms',
    code: 'CS201',
    description: 'Advanced data structures and algorithm design. Covers arrays, linked lists, trees, graphs, and algorithm analysis.',
    credit_hours: 4,
    department: 'Computer Science',
    prerequisites: ['00000000-0000-0000-0000-000000000001'],
    max_enrollment: 25,
    current_enrollment: 1,
    instructor_id: '00000000-0000-0000-0000-000000000003',
    semester: 'Fall',
    year: 2024,
    schedule: 'TTh 2:00-3:30 PM',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    title: 'Database Systems',
    code: 'CS301',
    description: 'Database design, SQL, and database management systems. Covers relational databases, normalization, and transactions.',
    credit_hours: 3,
    department: 'Computer Science',
    prerequisites: ['00000000-0000-0000-0000-000000000002'],
    max_enrollment: 20,
    current_enrollment: 0,
    instructor_id: '00000000-0000-0000-0000-000000000001',
    semester: 'Fall',
    year: 2024,
    schedule: 'MWF 11:00-12:00 PM',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    title: 'Calculus I',
    code: 'MATH101',
    description: 'Differential and integral calculus. Covers limits, derivatives, integrals, and their applications.',
    credit_hours: 4,
    department: 'Mathematics',
    prerequisites: [],
    max_enrollment: 35,
    current_enrollment: 1,
    instructor_id: '00000000-0000-0000-0000-000000000002',
    semester: 'Fall',
    year: 2024,
    schedule: 'MWF 10:00-11:00 AM + T 1:00-2:00 PM',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    title: 'Linear Algebra',
    code: 'MATH201',
    description: 'Vector spaces, linear transformations, matrices, and eigenvalues. Applications to computer science.',
    credit_hours: 3,
    department: 'Mathematics',
    prerequisites: ['00000000-0000-0000-0000-000000000004'],
    max_enrollment: 25,
    current_enrollment: 0,
    instructor_id: '00000000-0000-0000-0000-000000000002',
    semester: 'Spring',
    year: 2025,
    schedule: 'TTh 9:00-10:30 AM',
  },
];

// Sample enrollments
export const enrollments = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    student_id: '00000000-0000-0000-0000-000000000001',
    course_id: '00000000-0000-0000-0000-000000000001',
    semester: 'Fall',
    year: 2024,
    grade: null,
    status: 'enrolled',
    enrollment_date: '2024-08-15',
    completion_date: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    student_id: '00000000-0000-0000-0000-000000000001',
    course_id: '00000000-0000-0000-0000-000000000004',
    semester: 'Fall',
    year: 2024,
    grade: null,
    status: 'enrolled',
    enrollment_date: '2024-08-15',
    completion_date: null,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    student_id: '00000000-0000-0000-0000-000000000002',
    course_id: '00000000-0000-0000-0000-000000000001',
    semester: 'Spring',
    year: 2024,
    grade: 'A',
    status: 'completed',
    enrollment_date: '2024-01-15',
    completion_date: '2024-05-15',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    student_id: '00000000-0000-0000-0000-000000000002',
    course_id: '00000000-0000-0000-0000-000000000002',
    semester: 'Fall',
    year: 2024,
    grade: null,
    status: 'enrolled',
    enrollment_date: '2024-08-15',
    completion_date: null,
  },
];

// Export all data
export const crsData = {
  users,
  students,
  faculty,
  courses,
  enrollments,
};