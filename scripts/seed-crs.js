const { db } = require("@vercel/postgres");
const { crsData } = require("../src/app/lib/crs-data.js");
const fs = require('fs');
const path = require('path');

async function seedCRS(client) {
  try {
    // Read and execute the schema SQL file
    const schemaPath = path.join(__dirname, '../src/app/lib/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema (split by semicolons and execute separately)
    const statements = schemaSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await client.sql([statement]);
        } catch (error) {
          console.log(`Skipping statement (likely already exists): ${error.message}`);
        }
      }
    }
    
    console.log('Database schema created successfully');

    // Insert users
    for (const user of crsData.users) {
      await client.sql`
        INSERT INTO users (id, username, email, password_hash, role, student_id, faculty_id)
        VALUES (${user.id}, ${user.username}, ${user.email}, ${user.password_hash}, ${user.role}, ${user.student_id}, ${user.faculty_id})
        ON CONFLICT (id) DO UPDATE SET
          username = ${user.username},
          email = ${user.email},
          password_hash = ${user.password_hash},
          role = ${user.role},
          student_id = ${user.student_id},
          faculty_id = ${user.faculty_id};
      `;
    }
    console.log(`Seeded ${crsData.users.length} users`);

    // Insert faculty
    for (const facultyMember of crsData.faculty) {
      await client.sql`
        INSERT INTO faculty (id, name, email, department, contact_info, user_id)
        VALUES (${facultyMember.id}, ${facultyMember.name}, ${facultyMember.email}, ${facultyMember.department}, ${facultyMember.contact_info}, ${facultyMember.user_id})
        ON CONFLICT (id) DO UPDATE SET
          name = ${facultyMember.name},
          email = ${facultyMember.email},
          department = ${facultyMember.department},
          contact_info = ${facultyMember.contact_info},
          user_id = ${facultyMember.user_id};
      `;
    }
    console.log(`Seeded ${crsData.faculty.length} faculty members`);

    // Insert students
    for (const student of crsData.students) {
      await client.sql`
        INSERT INTO students (id, name, email, date_of_birth, program, year, contact_info, user_id)
        VALUES (${student.id}, ${student.name}, ${student.email}, ${student.date_of_birth}, ${student.program}, ${student.year}, ${student.contact_info}, ${student.user_id})
        ON CONFLICT (id) DO UPDATE SET
          name = ${student.name},
          email = ${student.email},
          date_of_birth = ${student.date_of_birth},
          program = ${student.program},
          year = ${student.year},
          contact_info = ${student.contact_info},
          user_id = ${student.user_id};
      `;
    }
    console.log(`Seeded ${crsData.students.length} students`);

    // Insert courses
    for (const course of crsData.courses) {
      await client.sql`
        INSERT INTO courses (id, title, code, description, credit_hours, department, prerequisites, max_enrollment, current_enrollment, instructor_id, semester, year, schedule)
        VALUES (${course.id}, ${course.title}, ${course.code}, ${course.description}, ${course.credit_hours}, ${course.department}, ${course.prerequisites}, ${course.max_enrollment}, ${course.current_enrollment}, ${course.instructor_id}, ${course.semester}, ${course.year}, ${course.schedule})
        ON CONFLICT (id) DO UPDATE SET
          title = ${course.title},
          code = ${course.code},
          description = ${course.description},
          credit_hours = ${course.credit_hours},
          department = ${course.department},
          prerequisites = ${course.prerequisites},
          max_enrollment = ${course.max_enrollment},
          current_enrollment = ${course.current_enrollment},
          instructor_id = ${course.instructor_id},
          semester = ${course.semester},
          year = ${course.year},
          schedule = ${course.schedule};
      `;
    }
    console.log(`Seeded ${crsData.courses.length} courses`);

    // Insert enrollments
    for (const enrollment of crsData.enrollments) {
      await client.sql`
        INSERT INTO enrollments (id, student_id, course_id, semester, year, grade, status, enrollment_date, completion_date)
        VALUES (${enrollment.id}, ${enrollment.student_id}, ${enrollment.course_id}, ${enrollment.semester}, ${enrollment.year}, ${enrollment.grade}, ${enrollment.status}, ${enrollment.enrollment_date}, ${enrollment.completion_date})
        ON CONFLICT (id) DO UPDATE SET
          student_id = ${enrollment.student_id},
          course_id = ${enrollment.course_id},
          semester = ${enrollment.semester},
          year = ${enrollment.year},
          grade = ${enrollment.grade},
          status = ${enrollment.status},
          enrollment_date = ${enrollment.enrollment_date},
          completion_date = ${enrollment.completion_date};
      `;
    }
    console.log(`Seeded ${crsData.enrollments.length} enrollments`);

    return {
      users: crsData.users.length,
      faculty: crsData.faculty.length,
      students: crsData.students.length,
      courses: crsData.courses.length,
      enrollments: crsData.enrollments.length,
    };
  } catch (error) {
    console.error("Error seeding CRS data:", error);
    throw error;
  }
}

async function main() {
  try {
    const client = await db.connect();
    const result = await seedCRS(client);
    await client.end();
    console.log("CRS database seeding completed successfully");
    console.log("Seeded:", result);
  } catch (error) {
    console.error("An error occurred while seeding the CRS database:", error);
  }
}

main();