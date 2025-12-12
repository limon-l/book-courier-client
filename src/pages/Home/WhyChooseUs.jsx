import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Truck size={28} />,
      title: "Express Delivery",
      desc: "Same-day delivery for local library books.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Sanitized & Secure",
      desc: "Every book is cleaned and packaged safely.",
    },
    {
      icon: <Clock size={28} />,
      title: "Extended Borrowing",
      desc: "Keep books for up to 30 days with auto-renew.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2">
              Our Benefits
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Smartest way to <br />
              <span className="text-emerald-600">borrow books.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
              BookCourier bridges the gap between traditional libraries and
              modern convenience. We handle the logistics so you can focus on
              reading.
            </p>

            <div className="space-y-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative lg:h-[600px] hidden lg:block">
            <div className="absolute top-10 right-10 w-4/5 h-4/5 bg-emerald-100 dark:bg-emerald-900/10 rounded-3xl -rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800"
              alt="Reading"
              className="relative z-10 rounded-3xl shadow-2xl w-4/5 h-4/5 object-cover ml-auto mt-10"
            />
            <div className="absolute bottom-20 left-10 z-20 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-xs animate-bounce-slow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle size={20} />
                </div>
                <span className="font-bold text-slate-800 dark:text-white">
                  Order Delivered
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Your copy of "Dune" has arrived at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
