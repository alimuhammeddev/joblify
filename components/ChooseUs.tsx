import { FaCheckCircle, FaBullseye, FaBolt, FaHandshake } from "react-icons/fa";

export default function Choose() {
  const features = [
    {
      title: "Verified Job Listings",
      desc: "We ensure all job postings are authentic, helping you avoid scams and focus on real opportunities.",
      icon: <FaCheckCircle />,
    },
    {
      title: "Smart Job Matching",
      desc: "Our platform connects you with jobs that match your skills, experience, and career goals.",
      icon: <FaBullseye />,
    },
    {
      title: "Fast Hiring Process",
      desc: "Apply easily and get connected with employers quickly, reducing delays in your job search.",
      icon: <FaBolt />,
    },
    {
      title: "For Employers & Talent",
      desc: "Whether you're hiring or job hunting, Joblify makes the process simple and efficient.",
      icon: <FaHandshake />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <p className="lg:text-xl font-medium text-[#1F3064]">Why Choose Us</p>
        <div className="w-28 h-0.5 bg-[#F0802D] mt-2"></div>
        <p className="text-gray-500 mt-2 text-center max-w-2xl">
          We combine innovation, dedication, and expertise to give you the best
          experience possible.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl mb-4 text-[#F0802D] flex justify-center">
              {item.icon}
            </div>
            <h3 className="text-lg font-medium text-[#1F3064] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}