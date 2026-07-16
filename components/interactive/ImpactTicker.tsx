import Stamp from '@/components/ui/Stamp';

const assurances = [
  ['Nigerian-led', 'Local leadership and programme experience shape our decisions.'],
  ['Community-rooted', 'Programmes work through community structures and public systems.'],
  ['Multi-sector', 'Nutrition, health, WASH, protection, education, and resilience work together.'],
  ['Results-focused', 'Programme monitoring helps us learn, adapt, and report progress.'],
];

export default function ImpactTicker() {
  return (
    <div className="rounded-xl border border-frad-green-800/20 bg-gradient-to-r from-frad-green-950 via-frad-green-900 to-frad-navy-950 p-6 text-white shadow-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/14 pb-5">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.12em] text-frad-green-200">
            Giving principles
          </span>
          <h3 className="mt-1 text-2xl font-black text-white">Support locally led humanitarian action</h3>
        </div>
        <Stamp tone="white">Give with confidence</Stamp>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {assurances.map(([title, description]) => (
          <div key={title}>
            <p className="text-lg font-black text-white">{title}</p>
            <p className="mt-2 text-xs font-bold leading-5 text-frad-green-200">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
