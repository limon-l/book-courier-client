const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center mb-12">
      {subHeading && (
        <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
          {subHeading}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {heading}
      </h2>
      <div className="w-24 h-1.5 bg-emerald-500 rounded-full mx-auto"></div>
    </div>
  );
};

export default SectionTitle;
