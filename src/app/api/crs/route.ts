import { NextResponse } from 'next/server';
import { 
  getCourses, 
  getStudents, 
  getEnrollments, 
  enrollStudent, 
  checkPrerequisites,
  getEnrollmentSummary,
  getCourseSummary 
} from '@/app/lib/crs-data-access';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    switch (action) {
      case 'courses':
        const courses = await getCourses();
        return NextResponse.json({ courses }, { status: 200 });
        
      case 'students':
        const students = await getStudents();
        return NextResponse.json({ students }, { status: 200 });
        
      case 'enrollments':
        const enrollments = await getEnrollments();
        return NextResponse.json({ enrollments }, { status: 200 });
        
      case 'enrollment-summary':
        const enrollmentSummary = await getEnrollmentSummary();
        return NextResponse.json({ summary: enrollmentSummary }, { status: 200 });
        
      case 'course-summary':
        const courseSummary = await getCourseSummary();
        return NextResponse.json({ summary: courseSummary }, { status: 200 });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('CRS API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    switch (action) {
      case 'enroll':
        const { studentId, courseId, semester, year } = await request.json();
        
        if (!studentId || !courseId || !semester || !year) {
          return NextResponse.json({ 
            error: 'Missing required fields: studentId, courseId, semester, year' 
          }, { status: 400 });
        }
        
        // Check prerequisites
        const prereqCheck = await checkPrerequisites(studentId, courseId);
        if (!prereqCheck.met) {
          return NextResponse.json({ 
            error: 'Prerequisites not met',
            missingPrerequisites: prereqCheck.missing_prerequisites 
          }, { status: 400 });
        }
        
        // Attempt enrollment
        const success = await enrollStudent(studentId, courseId, semester, year);
        
        if (success) {
          return NextResponse.json({ 
            message: 'Student enrolled successfully',
            enrolled: true 
          }, { status: 200 });
        } else {
          return NextResponse.json({ 
            error: 'Enrollment failed. Course may be full or student already enrolled.',
            enrolled: false 
          }, { status: 400 });
        }
        
      case 'check-prerequisites':
        const { studentId: checkStudentId, courseId: checkCourseId } = await request.json();
        
        if (!checkStudentId || !checkCourseId) {
          return NextResponse.json({ 
            error: 'Missing required fields: studentId, courseId' 
          }, { status: 400 });
        }
        
        const prereqResult = await checkPrerequisites(checkStudentId, checkCourseId);
        return NextResponse.json({ prerequisiteCheck: prereqResult }, { status: 200 });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('CRS API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}