import {
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiUpload,
} from "react-icons/fi";

export default function JobDetailsPage() {
  return (
    <section className="bg-gray-50 min-h-screen mb-20">
      <div className="mx-auto">
        
        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-3xl font-bold text-[#1F3064]">
            Frontend Developer
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            MoTechnologies • Lagos, Nigeria
          </p>
        </div>

        {/* Job Info */}
        <div className="flex sm:grid sm:grid-cols-4 gap-3 mb-6 overflow-x-auto sm:overflow-visible">
          
          {/* Card */}
          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiBriefcase className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Job Type</p>
              <p className="font-medium text-sm">Full-time</p>
            </div>
          </div>

          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiClock className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Experience</p>
              <p className="font-medium text-sm">3+ years</p>
            </div>
          </div>

          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiDollarSign className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Salary</p>
              <p className="font-medium text-sm">₦250k - ₦400k</p>
            </div>
          </div>

          <div className="min-w-37.5 flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <FiMapPin className="text-[#F0802D]" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-sm">Lagos</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-[#1F3064] mb-2">
            Job Description
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            We are looking for a skilled frontend developer to build modern,
            responsive web applications. You will work closely with designers
            and backend engineers.
          </p>
        </div>

        {/* Responsibilities */}
        <div className="mb-5 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-[#1F3064] mb-2">
            Responsibilities
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
            <li>• Build and maintain web applications</li>
            <li>• Collaborate with team members</li>
            <li>• Optimize performance</li>
            <li>• Write clean code</li>
          </ul>
        </div>

        {/* Requirements */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-[#1F3064] mb-2">
            Requirements
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
            <li>• 3+ years experience</li>
            <li>• Good knowledge of React</li>
            <li>• Understanding of modern CSS</li>
            <li>• Problem-solving skills</li>
          </ul>
        </div>

        {/* Application Section */}
        <div className="pt-5 sm:pt-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1F3064] mb-4">
            Apply for this job
          </h2>

          <form className="space-y-4 sm:space-y-5">
            
            {/* Cover Letter */}
            <div>
              <label className="block font-medium text-sm mb-1 text-gray-700">
                Cover Letter
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1F3064]"
                rows={5}
                placeholder="Write your cover letter..."
              ></textarea>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block font-medium text-sm mb-1 text-gray-700">
                Upload CV
              </label>

              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-5 cursor-pointer hover:border-[#1F3064] transition text-sm text-gray-600">
                <FiUpload />
                Tap to upload your CV
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#1F3064] text-white py-3 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base hover:bg-[#16254d] transition"
            >
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}