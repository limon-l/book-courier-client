import { MapPin } from "lucide-react";

const CoverageMap = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2">
            Service Areas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Delivery Coverage
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We connect over 500 libraries across major cities, ensuring books
            reach your doorstep safely and quickly.
          </p>
        </div>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-inner border border-slate-300 dark:border-slate-700">
          <div
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(#10B981 1.5px, transparent 1.5px)",
              backgroundSize: "30px 30px",
            }}></div>

          {[
            { top: "30%", left: "40%", name: "Dhaka" },
            { top: "60%", left: "60%", name: "Chittagong" },
            { top: "25%", left: "70%", name: "Sylhet" },
            { top: "40%", left: "20%", name: "Rajshahi" },
          ].map((city, idx) => (
            <div
              key={idx}
              className="absolute group"
              style={{ top: city.top, left: city.left }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-500/30 rounded-full animate-ping"></div>
                <div className="relative z-10 bg-white dark:bg-slate-900 p-2 rounded-full shadow-lg border-2 border-emerald-500 text-emerald-600">
                  <MapPin
                    size={24}
                    className="fill-emerald-100 dark:fill-emerald-900"
                  />
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-3 py-1 rounded-md shadow-md text-xs font-bold text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {city.name} Hub
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg shadow text-xs font-mono text-slate-500">
            Map Data © LightHouse 2025
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;
