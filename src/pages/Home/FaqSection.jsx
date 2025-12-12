import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FaqSection = () => {
  const [active, setActive] = useState(null);

  const faqs = [
    {
      q: "How do I return a book?",
      a: "Simply go to your dashboard, select the order, and click 'Request Return'. Our courier will pick it up within 24 hours.",
    },
    {
      q: "Is there a limit to how many books I can borrow?",
      a: "Yes, standard users can borrow up to 3 books at a time. Premium users can borrow up to 10 books simultaneously.",
    },
    {
      q: "What happens if I lose a book?",
      a: "You will be charged the market price of the book plus a processing fee. Please handle library books with care.",
    },
    {
      q: "Do you deliver on weekends?",
      a: "Yes, our delivery partners operate 7 days a week from 9 AM to 8 PM.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2">
            Common Questions
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = active === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition">
                <button
                  onClick={() => setActive(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${idx}`}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg">
                  {faq.q}
                  {isOpen ? (
                    <ChevronUp className="text-emerald-500" />
                  ) : (
                    <ChevronDown className="text-slate-400" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${idx}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden">
                      <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
