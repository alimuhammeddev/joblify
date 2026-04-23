import { Briefcase, Target, Building2, BookOpen } from "lucide-react";

export default function WeDo() {
  const services = [
    {
      title: "Job Matching",
      description:
        "We connect job seekers with the right opportunities using smart matching technology that aligns skills, experience, and career goals.",
      icon: Briefcase,
    },
    {
      title: "Career Guidance",
      description:
        "Our platform provides personalized career advice, CV optimization tips, and interview preparation resources to help you succeed.",
      icon: Target,
    },
    {
      title: "Employer Solutions",
      description:
        "We help businesses find top talent quickly through efficient recruitment tools and candidate filtering systems.",
      icon: Building2,
    },
    {
      title: "Skill Development",
      description:
        "Access learning resources and training programs designed to improve your employability and keep your skills relevant.",
      icon: BookOpen,
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col items-center mb-12">
          <p className="lg:text-xl font-semibold text-[#1F3064]">What We Do</p>
          <div className="w-28 h-0.5 bg-[#F0802D] mt-2"></div>
          <p className="text-gray-500 mt-2 text-center max-w-2xl">
            Joblify simplifies the job search process by connecting talent with
            opportunities, empowering careers, and helping businesses grow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#FDE6D5] mb-4">
                  <Icon className="w-6 h-6 text-[#F0802D]" />
                </div>
                <h3 className="text-lg font-medium text-[#1F3064] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
