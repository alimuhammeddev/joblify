export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 mt-16 mb-16">
      <div className="bg-[#1F3064] rounded-2xl p-8 sm:p-12 text-center text-white shadow-lg">
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold">
          Join Our Newsletter
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-200 mb-3 max-w-xl mx-auto">
          Stay updated with the latest news, tips, and exclusive offers.
        </p>

        {/* Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg placeholder:text-white focus:outline-none border border-white text-white"
            required
          />

          <button
            type="submit"
            className="bg-white cursor-pointer text-[#1F3064] font-semibold px-6 py-3 lg:w-fit w-full rounded-lg hover:bg-gray-200 transition"
          >
            Subscribe
          </button>

        </form>

      </div>
    </section>
  );
}