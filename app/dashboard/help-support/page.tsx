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

export default function HelpSupport() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const supportOptions = [
    {
      title: "Live Chat",
      desc: "Chat instantly with our support team",
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Email Support",
      desc: "Get help via support@joblify.com",
      icon: Mail,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Call Support",
      desc: "Speak directly with our team",
      icon: Phone,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const faqItems = [
    {
      question: "How do I apply for jobs?",
      answer:
        "Browse available jobs, open the job details page, and click the apply button to submit your application.",
    },
    {
      question: "How can I upload my CV?",
      answer:
        "Go to your profile settings and upload your CV in PDF or DOC format from the CV section.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Navigate to account settings and edit your personal information, skills, and experience.",
    },
    {
      question: "Why is my application pending?",
      answer:
        "Your application is currently under review by the employer. You will receive updates once a decision is made.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Click on the forgot password option on the login page and follow the instructions sent to your email.",
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F3064]">
          Help & Support
        </h1>

        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          Need assistance? We're here to help you manage your account,
          applications, CV uploads, and more.
        </p>
      </div>

      {/* Quick Support Cards */}
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

              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>

              <button className="mt-5 text-sm font-medium text-[#F0802D] flex items-center gap-1 hover:gap-2 transition-all">
                Contact Now
                <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      <div className="mb-8 bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 md:block hidden rounded-xl bg-purple-100 lg:flex items-center justify-center text-purple-600">
            <HelpCircle size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1F3064]">
              Frequently Asked Questions
            </h2>

            <p className="text-sm text-gray-500">
              Quick answers to common questions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqItems.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl overflow-hidden transition-all"
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

      {/* Support Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <FileText size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-[#1F3064]">
                User Guides
              </h3>

              <p className="text-sm text-gray-500">
                Learn how to use Joblify effectively
              </p>
            </div>
          </div>

          <button className="mt-3 bg-[#1F3064] text-white px-5 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition">
            View Guides
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-[#1F3064]">
                Account Security
              </h3>

              <p className="text-sm text-gray-500">
                Keep your Joblify account safe and secure
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
}