import { Send } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="py-20 bg-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-block p-3 bg-emerald-800 rounded-2xl mb-6">
          <Send className="text-emerald-300" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated with New Arrivals
        </h2>
        <p className="text-emerald-100 mb-10 max-w-xl mx-auto text-lg">
          Subscribe to our newsletter and get weekly updates on new books,
          author interviews, and exclusive borrowing perks.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-xl bg-emerald-950/50 border border-emerald-700 text-white placeholder-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            required
          />
          <button
            type="submit"
            disabled={!email}
            className={`px-8 py-4 bg-emerald-500 text-emerald-950 font-bold rounded-xl shadow-lg shadow-emerald-900/50 transition-colors duration-300 hover:bg-emerald-400 ${
              !email ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
