'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  User,
  BookOpen,
  Layers,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export default function MembershipApplyPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',

    department:
      'Institute of Metallurgy and Materials Engineering (IMME)',

    degree:
      'B.Sc. (Engg.) Metallurgy & Materials Engineering',

    semester: '4th Semester',

    cgpa: '',

    primaryTeam: 'Research & Innovation',

    secondaryTeam: 'Editorial & Publications',

    skills: '',

    experience: '',

    sop: '',

    termsAgreed: false,
  });

  const nextStep = () => {
    /*
      Validate each step before allowing
      the user to continue.
    */

    if (step === 1) {
      if (!formData.fullName.trim()) {
        alert('Please enter your full name.');
        return;
      }

      if (!formData.email.trim()) {
        alert('Please enter your email address.');
        return;
      }

      if (!formData.phone.trim()) {
        alert('Please enter your contact number.');
        return;
      }
    }

    if (step === 2) {
      if (!formData.rollNumber.trim()) {
        alert('Please enter your University Roll Number.');
        return;
      }
    }

    if (step === 3) {
      if (!formData.sop.trim()) {
        alert('Please enter your Statement of Motivation.');
        return;
      }
    }

    setStep((currentStep) => Math.min(currentStep + 1, 4));
  };

  const prevStep = () => {
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /*
      Final validation
    */

    if (!formData.fullName.trim()) {
      alert('Please enter your full name.');
      setStep(1);
      return;
    }

    if (!formData.email.trim()) {
      alert('Please enter your email address.');
      setStep(1);
      return;
    }

    if (!formData.phone.trim()) {
      alert('Please enter your contact number.');
      setStep(1);
      return;
    }

    if (!formData.rollNumber.trim()) {
      alert('Please enter your University Roll Number.');
      setStep(2);
      return;
    }

    if (!formData.sop.trim()) {
      alert('Please enter your Statement of Motivation.');
      setStep(3);
      return;
    }

    if (!formData.termsAgreed) {
      alert(
        'Please agree to the SciComS Institutional Code of Conduct.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      /*
        Send application data to API route:

        src/app/api/memberships/route.ts
      */

      const response = await fetch('/api/memberships', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          fullName: formData.fullName,
          rollNumber: formData.rollNumber,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          degree: formData.degree,
          semester: formData.semester,
          cgpa: formData.cgpa,
          primaryTeam: formData.primaryTeam,
          secondaryTeam: formData.secondaryTeam,
          skills: formData.skills,
          experience: formData.experience,
          sop: formData.sop,
        }),
      });

      const result = await response.json();

      /*
        Handle server errors
      */

      if (!response.ok || !result.success) {
        console.error(
          'Application submission failed:',
          result
        );

        alert(
          `Application submission failed: ${
            result.error || 'Unknown error occurred.'
          }`
        );

        setIsSubmitting(false);
        return;
      }

      console.log(
        'Membership application successfully submitted:',
        result.data
      );

      /*
        Generate application reference code
      */

      const refCode =
      result.data.applicationReference;

      /*
        Redirect to success page
      */

      router.push(
        `/membership/success?ref=${encodeURIComponent(
          refCode
        )}&name=${encodeURIComponent(
          formData.fullName || 'Student Scholar'
        )}`
      );

    } catch (error) {
      console.error(
        'Unexpected submission error:',
        error
      );

      alert(
        'An unexpected error occurred while submitting your application.'
      );

      setIsSubmitting(false);

    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

      {/* Header */}

      <div className="text-center max-w-2xl mx-auto space-y-3">

        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Recruitment Portal • 2025-2026
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#00113a]">
          Apply for SciComS Membership
        </h1>

        <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
          Join the prestigious student technical society at the University
          of the Punjab. Complete all four sections to submit your
          credential profile for review.
        </p>

      </div>


      {/* Step Indicator */}

      <div className="grid grid-cols-4 gap-2 sm:gap-4 border-b border-slate-200 pb-6 text-center">

        {[
          {
            num: 1,
            title: 'Personal Info',
            icon: User,
          },
          {
            num: 2,
            title: 'Academic Profile',
            icon: BookOpen,
          },
          {
            num: 3,
            title: 'Wing Preferences',
            icon: Layers,
          },
          {
            num: 4,
            title: 'Review & Submit',
            icon: FileCheck,
          },
        ].map((item) => {

          const Icon = item.icon;

          const isDone = step > item.num;

          const isCurrent = step === item.num;

          return (
            <div
              key={item.num}
              className={`p-3 rounded-xs border transition-all ${
                isCurrent
                  ? 'bg-[#002366] text-white border-[#002366]'
                  : isDone
                  ? 'bg-[#eff4ff] text-[#002366] border-[#002366]/20'
                  : 'bg-white text-slate-400 border-slate-200'
              }`}
            >

              <Icon className="w-5 h-5 mx-auto mb-1" />

              <div className="text-[11px] font-bold uppercase font-mono">
                Step {item.num}
              </div>

              <div className="text-xs font-semibold hidden sm:block truncate">
                {item.title}
              </div>

            </div>
          );
        })}

      </div>


      {/* Form */}

      <div className="bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-10 shadow-xs">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* STEP 1 */}

          {step === 1 && (

            <div className="space-y-4">

              <h2 className="font-serif font-bold text-xl text-[#00113a] border-b border-slate-100 pb-2">
                1. Personal Contact Details
              </h2>


              <div>

                <label className="block text-xs font-bold text-[#00113a] mb-1">
                  Full Legal Name *
                </label>

                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                  placeholder="e.g. Zainab Malik"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    Student University Email *
                  </label>

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="name@pu.edu.pk"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  />

                </div>


                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    WhatsApp / Contact Number *
                  </label>

                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  />

                </div>

              </div>

            </div>
          )}


          {/* STEP 2 */}

          {step === 2 && (

            <div className="space-y-4">

              <h2 className="font-serif font-bold text-xl text-[#00113a] border-b border-slate-100 pb-2">
                2. Academic Enrollment Profile
              </h2>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    Department / Institute *
                  </label>

                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  >

                    <option value="Institute of Metallurgy and Materials Engineering (IMME)">
                      IMME - Metallurgy & Materials
                    </option>

                    <option value="Department of Physics">
                      Department of Physics
                    </option>

                    <option value="Institute of Chemistry">
                      Institute of Chemistry
                    </option>

                    <option value="Department of Electrical Engineering">
                      Department of Electrical Engineering
                    </option>

                    <option value="Department of Chemical Engineering">
                      Department of Chemical Engineering
                    </option>

                    <option value="College of Earth & Environmental Sciences">
                      CEES - Environmental Sciences
                    </option>

                    <option value="Other Faculty">
                      Other Punjab University Faculty
                    </option>

                  </select>

                </div>


                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    University Roll / Registration No. *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.rollNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rollNumber: e.target.value,
                      })
                    }
                    placeholder="BME-23-45"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  />

                </div>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    Degree Program
                  </label>

                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        degree: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  />

                </div>


                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    Current Semester
                  </label>

                  <select
                    value={formData.semester}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        semester: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  >

                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>

                    <option value="Postgraduate / PhD">
                      Postgraduate / PhD
                    </option>

                  </select>

                </div>


                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    Latest CGPA
                  </label>

                  <input
                    type="text"
                    value={formData.cgpa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cgpa: e.target.value,
                      })
                    }
                    placeholder="3.50"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  />

                </div>

              </div>

            </div>
          )}


          {/* STEP 3 */}

          {step === 3 && (

            <div className="space-y-4">

              <h2 className="font-serif font-bold text-xl text-[#00113a] border-b border-slate-100 pb-2">
                3. Technical Wing Preferences & Skills
              </h2>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    Primary Directorate Preference *
                  </label>

                  <select
                    value={formData.primaryTeam}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        primaryTeam: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  >

                    <option value="Editorial & Publications">
                      Editorial & Publications
                    </option>

                    <option value="Research & Innovation">
                      Research & Innovation
                    </option>

                    <option value="Event Management">
                      Event Management & Logistics
                    </option>

                    <option value="Media & PR">
                      Media & Public Relations
                    </option>

                    <option value="Creative & Design">
                      Creative & Graphic Design
                    </option>

                    <option value="Technology & Web">
                      Technology & Web Architecture
                    </option>

                  </select>

                </div>


                <div>

                  <label className="block text-xs font-bold text-[#00113a] mb-1">
                    Secondary Directorate Preference
                  </label>

                  <select
                    value={formData.secondaryTeam}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        secondaryTeam: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  >

                    <option value="Editorial & Publications">
                      Editorial & Publications
                    </option>

                    <option value="Research & Innovation">
                      Research & Innovation
                    </option>

                    <option value="Event Management">
                      Event Management & Logistics
                    </option>

                    <option value="Media & PR">
                      Media & Public Relations
                    </option>

                    <option value="Creative & Design">
                      Creative & Graphic Design
                    </option>

                    <option value="Technology & Web">
                      Technology & Web Architecture
                    </option>

                  </select>

                </div>

              </div>


              <div>

                <label className="block text-xs font-bold text-[#00113a] mb-1">
                  Key Technical & Soft Skills
                </label>

                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e.target.value,
                    })
                  }
                  placeholder="e.g. Python, Public Speaking, Graphic Design"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />

              </div>


              <div>

                <label className="block text-xs font-bold text-[#00113a] mb-1">
                  Previous Experience
                </label>

                <textarea
                  rows={3}
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experience: e.target.value,
                    })
                  }
                  placeholder="Describe relevant experience..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />

              </div>


              <div>

                <label className="block text-xs font-bold text-[#00113a] mb-1">
                  Statement of Motivation & Vision *
                </label>

                <textarea
                  rows={5}
                  required
                  value={formData.sop}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sop: e.target.value,
                    })
                  }
                  placeholder="Explain why you wish to join SciComS..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />

              </div>

            </div>
          )}


          {/* STEP 4 */}

          {step === 4 && (

            <div className="space-y-6">

              <h2 className="font-serif font-bold text-xl text-[#00113a] border-b border-slate-100 pb-2">
                4. Profile Review & Confirmation
              </h2>


              <div className="bg-[#f8f9ff] p-5 rounded-xs border border-slate-200 text-xs space-y-3">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div>
                    <span className="text-slate-500">
                      Applicant:
                    </span>{' '}

                    <strong className="text-[#00113a]">
                      {formData.fullName || 'Not provided'}
                    </strong>
                  </div>


                  <div>
                    <span className="text-slate-500">
                      Roll No:
                    </span>{' '}

                    <strong className="text-[#00113a]">
                      {formData.rollNumber || 'Not provided'}
                    </strong>
                  </div>


                  <div>
                    <span className="text-slate-500">
                      Email:
                    </span>{' '}

                    <strong className="text-[#00113a]">
                      {formData.email || 'Not provided'}
                    </strong>
                  </div>


                  <div>
                    <span className="text-slate-500">
                      Department:
                    </span>{' '}

                    <strong className="text-[#00113a]">
                      {formData.department}
                    </strong>
                  </div>


                  <div>
                    <span className="text-slate-500">
                      Preferred Directorate:
                    </span>{' '}

                    <strong className="text-[#705d00]">
                      {formData.primaryTeam}
                    </strong>
                  </div>


                  <div>
                    <span className="text-slate-500">
                      Secondary Directorate:
                    </span>{' '}

                    <strong className="text-[#705d00]">
                      {formData.secondaryTeam}
                    </strong>
                  </div>

                </div>

              </div>


              <div className="flex items-start gap-3 p-4 bg-[#eff4ff] border border-[#002366]/20 rounded-xs text-xs text-[#002366]">

                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={formData.termsAgreed}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAgreed: e.target.checked,
                    })
                  }
                  className="mt-0.5 rounded-xs"
                />

                <label
                  htmlFor="terms"
                  className="leading-relaxed"
                >
                  I hereby certify that all submitted academic records are
                  accurate. I agree to abide by the{' '}

                  <strong>
                    SciComS Constitution & Code of Scientific Integrity
                  </strong>{' '}

                  under the Faculty of Engineering & Technology,
                  University of the Punjab.
                </label>

              </div>

            </div>
          )}


          {/* Navigation */}

          <div className="flex items-center justify-between pt-6 border-t border-slate-100">

            {step > 1 ? (

              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-5 py-2.5 border border-slate-300 text-xs font-bold rounded-xs hover:bg-slate-50 flex items-center gap-1.5 disabled:opacity-50"
              >

                <ArrowLeft className="w-3.5 h-3.5" />

                <span>Previous Step</span>

              </button>

            ) : (

              <div />

            )}


            {step < 4 ? (

              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#002366] text-white hover:bg-[#00113a] text-xs font-bold rounded-xs flex items-center gap-1.5 disabled:opacity-50"
              >

                <span>
                  Continue to Step {step + 1}
                </span>

                <ArrowRight className="w-3.5 h-3.5" />

              </button>

            ) : (

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#ffd700] text-[#00113a] hover:bg-yellow-400 text-xs font-bold uppercase tracking-wider rounded-xs shadow-md flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >

                <ShieldCheck className="w-4 h-4" />

                <span>
                  {isSubmitting
                    ? 'Submitting Application...'
                    : 'Submit Final Application'}
                </span>

              </button>

            )}

          </div>

        </form>

      </div>

    </div>
  );
}