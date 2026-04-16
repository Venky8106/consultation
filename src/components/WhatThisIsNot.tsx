import { X } from 'lucide-react';

const items = [
  'A job guarantee of any kind',
  'A placement promise or service',
  'A full QualScore evaluation report',
  'Generic career counselling without structure',
  'A random sales call without preparation',
];

export default function WhatThisIsNot() {
  return (
    <section className="py-14 sm:py-20 bg-[#f0f4f8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[#475569] text-sm font-semibold uppercase tracking-widest mb-3">Clear Expectations</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              What this consultation is not
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4">
                  <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <p className="text-[#0f172a] text-sm font-medium">Not {item.toLowerCase()}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border-t border-gray-100 px-4 sm:px-6 py-4 sm:py-5">
              <p className="text-sm text-[#475569] leading-relaxed">
                The purpose is to understand your situation first and then guide the next step properly. No shortcuts, no generic advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
