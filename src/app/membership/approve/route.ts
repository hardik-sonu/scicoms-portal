import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    /*
    ==========================================
    1. GET REQUEST BODY
    ==========================================
    */

    const body = await request.json();

    const applicationId =
      typeof body.applicationId === 'string'
        ? body.applicationId.trim()
        : '';

    /*
    ==========================================
    2. VALIDATE APPLICATION ID
    ==========================================
    */

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Application ID is required.',
        },
        {
          status: 400,
        }
      );
    }

    /*
    ==========================================
    3. ENVIRONMENT VARIABLES
    ==========================================
    */

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        'Missing Supabase environment variables.'
      );

      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error.',
        },
        {
          status: 500,
        }
      );
    }

    /*
    ==========================================
    4. SERVER SUPABASE CLIENT
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
    5. FETCH APPLICATION
    ==========================================
    */

    const {
      data: application,
      error: applicationError,
    } = await supabase
      .from('memberships')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (applicationError || !application) {
      console.error(
        'Application fetch error:',
        applicationError
      );

      return NextResponse.json(
        {
          success: false,
          error: 'Membership application not found.',
        },
        {
          status: 404,
        }
      );
    }

    /*
    ==========================================
    6. CHECK IF MEMBER ALREADY EXISTS
    ==========================================
    */

    const {
      data: existingMember,
      error: existingMemberError,
    } = await supabase
      .from('members')
      .select('id')
      .eq('membership_id', applicationId)
      .maybeSingle();

    if (existingMemberError) {
      console.error(
        'Member verification error:',
        existingMemberError
      );

      return NextResponse.json(
        {
          success: false,
          error: 'Unable to verify member status.',
        },
        {
          status: 500,
        }
      );
    }

    /*
    ==========================================
    7. EXTRACT PRIMARY DIRECTORATE
    ==========================================
    */

    let directorate = 'General Member';

    if (application.interest_area) {
      directorate =
        application.interest_area
          .split('|')[0]
          .trim();
    }

    /*
    ==========================================
    8. UPDATE APPLICATION STATUS
    ==========================================
    */

    const { error: statusError } =
      await supabase
        .from('memberships')
        .update({
          status: 'Approved',
        })
        .eq('id', applicationId);

    if (statusError) {
      console.error(
        'Application approval error:',
        statusError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Unable to approve membership application.',
        },
        {
          status: 500,
        }
      );
    }

    /*
    ==========================================
    9. CREATE MEMBER
    ==========================================
    */

    let member = existingMember;

    if (!existingMember) {
      const {
        data: newMember,
        error: memberError,
      } = await supabase
        .from('members')
        .insert([
          {
            membership_id: application.id,

            full_name: application.full_name,

            email: application.email,

            phone: application.phone,

            university:
              application.university,

            department:
              application.department,

            student_id:
              application.student_id,

            directorate,

            executive_role:
              'Executive Member',

            member_status:
              'Active',
          },
        ])
        .select('*')
        .single();

      if (memberError) {
        console.error(
          'Member creation error:',
          memberError
        );

        /*
        IMPORTANT:

        Application was approved but
        member creation failed.

        Roll back application status.
        */

        await supabase
          .from('memberships')
          .update({
            status: 'Pending',
          })
          .eq('id', applicationId);

        return NextResponse.json(
          {
            success: false,
            error:
              'Application could not be converted into a member.',
          },
          {
            status: 500,
          }
        );
      }

      member = newMember;
    }

    /*
    ==========================================
    10. SUCCESS RESPONSE
    ==========================================
    */

    return NextResponse.json(
      {
        success: true,

        message:
          existingMember
            ? 'Application was already approved and linked to an existing member.'
            : 'Application approved and member created successfully.',

        application: {
          id: application.id,

          applicationReference:
            application.application_reference,

          fullName:
            application.full_name,

          status:
            'Approved',
        },

        member,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      'Membership approval API error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'An unexpected server error occurred.',
      },
      {
        status: 500,
      }
    );
  }
}