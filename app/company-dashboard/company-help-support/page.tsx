"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function CompanyHelpSupport() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const supportOptions = [
    {
      title: "Live Chat Support",
      desc: "Get instant help with hiring and account issues",
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Email Support",
      desc: "support@joblify.com for technical or billing issues",
      icon: Mail,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Account Manager",
      desc: "Speak directly with your assigned support agent",
      icon: Phone,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const faqItems = [
    {
      question: "How do I post a job?",
      answer:
        "Go to the 'Post Job' section, fill in job details, and publish it to start receiving applicants.",
    },
    {
      question: "How do I manage applicants?",
      answer:
        "Open a job listing to view all applicants, shortlist candidates, and schedule interviews.",
    },
    {
      question: "How can I edit or close a job post?",
      answer:
        "Go to 'Posted Jobs', select the job, and use the edit or close option.",
    },
    {
      question: "How do I schedule interviews?",
      answer:
        "From the applicant list, select a candidate and use the schedule interview feature.",
    },
    {
      question: "Why is my job not getting applicants?",
      answer:
        "Improve job visibility by updating job description, salary range, or promoting the listing.",
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">

      {/* Header */}
      <div className="mb-8">
        <h1 className="md:text-2xl text-xl font-bold text-[#1F3064]">
          Company Help & Support
        </h1>

        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          Get assistance with job postings, applicant management,
          interviews, and your company account.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {supportOptions.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
              >
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-[#1F3064] text-lg">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {item.desc}
              </p>

              <button className="mt-5 text-sm font-medium text-[#F0802D] flex items-center gap-1 hover:gap-2 transition-all">
                Contact Support
                <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mb-8 bg-white rounded-2xl p-5 border border-gray-100">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <HelpCircle size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1F3064]">
              Employer FAQs
            </h2>

            <p className="text-sm text-gray-500">
              Common questions from hiring companies
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqItems.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-700">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <ChevronDown
                      size={20}
                      className="text-[#1F3064]"
                    />
                  ) : (
                    <ChevronRight
                      size={20}
                      className="text-gray-400"
                    />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <FileText size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-[#1F3064]">
                Hiring Guide
              </h3>

              <p className="text-sm text-gray-500">
                Learn how to attract and manage top talent
              </p>
            </div>
          </div>

          <button className="mt-3 bg-[#1F3064] text-white px-5 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition">
            View Guide
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-[#1F3064]">
                Company Security
              </h3>

              <p className="text-sm text-gray-500">
                Protect your hiring data and account access
              </p>
            </div>
          </div>

          <button className="mt-3 bg-[#1F3064] text-white px-5 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition">
            Security Tips
          </button>
        </div>

      </div>
    </section>
  );
};