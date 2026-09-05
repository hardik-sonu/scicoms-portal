import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    /*
      ==========================================
      1. Parse Request Body
      ==========================================
    */

    const body = await request.json();

    /*
      ==========================================
      2. Check Environment Variables
      ==========================================
    */

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing Supabase environment variables.');

      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error.',
        },
        { status: 500 }
      );
    }

    /*
      ==========================================
      3. Create Server-Side Supabase Client
      ==========================================
    */

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    /*
      ==========================================
      4. Extract & Normalize Input
      ==========================================
    */

    const fullName =
      typeof body.fullName === 'string'
        ? body.fullName.trim()
        : '';

    const rollNumber =
      typeof body.rollNumber === 'string'
        ? body.rollNumber.trim()
        : '';

    const email =
      typeof body.email === 'string'
        ? body.email.trim().toLowerCase()
        : '';

    const phone =
      typeof body.phone === 'string'
        ? body.phone.trim()
        : '';

    const department =
      typeof body.department === 'string'
        ? body.department.trim()
        : '';

    const degree =
      typeof body.degree === 'string'
        ? body.degree.trim()
        : '';

    const semester =
      typeof body.semester === 'string'
        ? body.semester.trim()
        : '';

    const cgpa =
      typeof body.cgpa === 'string'
        ? body.cgpa.trim()
        : '';

    const primaryTeam =
      typeof body.primaryTeam === 'string'
        ? body.primaryTeam.trim()
        : '';

    const secondaryTeam =
      typeof body.secondaryTeam === 'string'
        ? body.secondaryTeam.trim()
        : '';

    const skills =
      typeof body.skills === 'string'
        ? body.skills.trim()
        : '';

    const experience =
      typeof body.experience === 'string'
        ? body.experience.trim()
        : '';

    const sop =
      typeof body.sop === 'string'
        ? body.sop.trim()
        : '';

    /*
      ==========================================
      5. Required Field Validation
      ==========================================
    */

    if (!fullName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Full name is required.',
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email address is required.',
        },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contact number is required.',
        },
        { status: 400 }
      );
    }

    if (!rollNumber) {
      return NextResponse.json(
        {
          success: false,
          error: 'University Roll Number is required.',
        },
        { status: 400 }
      );
    }

    if (!sop) {
      return NextResponse.json(
        {
          success: false,
          error: 'Statement of Motivation is required.',
        },
        { status: 400 }
      );
    }

    /*
      ==========================================
      6. Input Length Validation
      ==========================================
    */

    if (fullName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Full name is too long.',
        },
        { status: 400 }
      );
    }

    if (email.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email address is too long.',
        },
        { status: 400 }
      );
    }

    if (phone.length > 30) {
      return NextResponse.json(
        {
          success: false,
          error: 'Contact number is too long.',
        },
        { status: 400 }
      );
    }

    if (rollNumber.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error: 'University Roll Number is too long.',
        },
        { status: 400 }
      );
    }

    if (skills.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Skills information is too long.',
        },
        { status: 400 }
      );
    }

    if (experience.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Experience information is too long.',
        },
        { status: 400 }
      );
    }

    if (sop.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Statement of Motivation is too long.',
        },
        { status: 400 }
      );
    }

    /*
      ==========================================
      7. Basic Email Validation
      ==========================================
    */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a valid email address.',
        },
        { status: 400 }
      );
    }

    /*
      ==========================================
      8. Validate Directorate Preferences
      ==========================================
    */

    const allowedTeams = [
      'Editorial & Publications',
      'Research & Innovation',
      'Event Management',
      'Media & PR',
      'Creative & Design',
      'Technology & Web',
    ];

    if (!allowedTeams.includes(primaryTeam)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid primary directorate selection.',
        },
        { status: 400 }
      );
    }

    if (
      secondaryTeam &&
      !allowedTeams.includes(secondaryTeam)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid secondary directorate selection.',
        },
        { status: 400 }
      );
    }

    /*
      ==========================================
      9. Check Duplicate Email
      ==========================================
    */

    const { data: existingEmail, error: emailCheckError } =
      await supabase
        .from('memberships')
        .select('id')
        .eq('email', email)
        .maybeSingle();

    if (emailCheckError) {
      console.error(
        'Email duplicate check error:',
        emailCheckError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Unable to verify application information.',
        },
        { status: 500 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            'An application with this email address already exists.',
        },
        { status: 409 }
      );
    }

    /*
      ==========================================
      10. Check Duplicate Student ID
      ==========================================
    */

    const {
      data: existingStudentId,
      error: studentIdCheckError,
    } = await supabase
      .from('memberships')
      .select('id')
      .eq('student_id', rollNumber)
      .maybeSingle();

    if (studentIdCheckError) {
      console.error(
        'Student ID duplicate check error:',
        studentIdCheckError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Unable to verify application information.',
        },
        { status: 500 }
      );
    }

    if (existingStudentId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'An application with this University Roll Number already exists.',
        },
        { status: 409 }
      );
    }

    /*
      ==========================================
      11. Create Application
      ==========================================
    */

    const { data, error } = await supabase
      .from('memberships')
      .insert([
        {
          full_name: fullName,

          email,

          phone,

          university:
            'University of the Punjab',

          department,

          student_id: rollNumber,

          semester,

          interest_area:
            `${primaryTeam} | Secondary: ${secondaryTeam || 'Not selected'}`,

          motivation: `
Degree: ${degree || 'Not provided'}

CGPA: ${cgpa || 'Not provided'}

Primary Directorate:
${primaryTeam}

Secondary Directorate:
${secondaryTeam || 'Not selected'}

Skills:
${skills || 'Not provided'}

Experience:
${experience || 'Not provided'}

Statement of Motivation:
${sop}
          `.trim(),

          status: 'Pending',
        },
      ])
      .select(
        `
          id,
          application_reference,
          full_name,
          email,
          status,
          created_at
        `
      )
      .single();

    /*
      ==========================================
      12. Handle Database Errors
      ==========================================
    */

    if (error) {
      console.error(
        'Supabase application insertion error:',
        error
      );

      /*
        PostgreSQL Unique Constraint Violation
      */

      if (error.code === '23505') {
        return NextResponse.json(
          {
            success: false,
            error:
              'An application with these credentials already exists.',
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error:
            'Unable to submit your application at this time.',
        },
        { status: 500 }
      );
    }

    /*
      ==========================================
      13. Successful Response
      ==========================================
    */

    return NextResponse.json(
      {
        success: true,

        message:
          'Membership application submitted successfully.',

        data: {
          id: data.id,

          applicationReference:
            data.application_reference,

          fullName:
            data.full_name,

          email:
            data.email,

          status:
            data.status,

          submittedAt:
            data.created_at,
        },
      },
      { status: 201 }
    );

  } catch (error) {

    /*
      ==========================================
      Unexpected Server Error
      ==========================================
    */

    console.error(
      'Membership API unexpected error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'An unexpected server error occurred.',
      },
      { status: 500 }
    );
  }
}