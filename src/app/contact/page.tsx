'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#705d00] font-mono">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#00113a]">
          Contact Us
        </h1>
        <p className="text-sm text-[#444650] leading-relaxed">
          Have an inquiry about research collaborations, symposium sponsorship, or student membership? Reach out to the SciComS administrative office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white border border-[#00113a]/10 rounded-sm p-6 sm:p-10 shadow-xs">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-serif font-bold text-2xl text-[#00113a]">Send Official Inquiry</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00113a] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Dr. Salman Qazi"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00113a] mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@university.edu"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00113a] mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Symposium Paper Track / Partnership Proposal"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00113a] mb-1">Message Details *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Please write your detailed inquiry or collaboration request..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-[#002366] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-[#002366] text-white hover:bg-[#00113a] font-bold text-xs uppercase tracking-wider rounded-xs shadow-xs transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-2xl text-[#00113a]">Inquiry Dispatched</h3>
              <p className="text-xs text-[#444650] max-w-md mx-auto">
                Thank you for contacting SciComS. Our administrative desk will review your message and reply to <span className="font-bold">{form.email}</span> within 2 business days.
              </p>
            </div>
          )}
        </div>

        {/* Office Location & Info */}
        <div className="space-y-6">
          <div className="bg-[#00113a] text-white rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-white">Headquarters</h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#ffd700] shrink-0" />
                <div>
                  <span className="font-bold text-white block">Physical Office:</span>
                  <span>Institute of Metallurgy & Materials Engineering (IMME), Quaid-e-Azam Campus, University of the Punjab, Canal Road, Lahore, Pakistan.</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-[#ffd700] shrink-0" />
                <div>
                  <span className="font-bold text-white block">Email:</span>
                  <span>scicoms@pu.edu.pk</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-[#ffd700] shrink-0" />
                <div>
                  <span className="font-bold text-white block">Phone:</span>
                  <span>+92 (42) 9923 1261 (Ext: 104)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Box */}
          <div className="bg-[#eff4ff] border border-[#002366]/15 rounded-sm p-6 space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#00113a] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#705d00]" />
              <span>Frequently Asked</span>
            </h4>
            <div className="space-y-2 text-xs text-[#444650]">
              <p><strong>Q: Who is eligible for SciComS membership?</strong><br />Any undergraduate, postgraduate, or PhD scholar enrolled in engineering and physical science programs.</p>
              <p><strong>Q: Are journal publications open to external authors?</strong><br />Yes, authors from all recognized higher education institutes may submit original manuscripts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
