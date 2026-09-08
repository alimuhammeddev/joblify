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
    <section className="relative overflow-hidden bg-[#f8f9fc] py-20 sm:py-24">
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#1F3064]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#F0802D]">
              What we do
            </p>
            <h2 className="max-w-md text-3xl font-extrabold leading-tight text-[#1F3064] md:text-4xl">
              Everything you need to make your next move.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:justify-self-end lg:text-lg">
            Joblify simplifies the job search process by connecting talent with
            opportunities, empowering careers, and helping businesses grow.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-[#1F3064]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F0802D]/40 hover:shadow-xl hover:shadow-[#1F3064]/10"
              >
                <div className="mb-10 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1e8] text-[#F0802D] transition group-hover:bg-[#F0802D] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-[#1F3064]/25">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#1F3064]">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F0802D] transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
