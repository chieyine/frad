import Link from 'next/link';

const ITEMS = [
  ['Safeguarding and PSEA', 'Zero tolerance for exploitation and abuse, with confidential reporting channels open to communities and staff.'],
  ['Complaints and feedback', 'Every community we work with can reach us directly. Feedback is confidential, free, and acted on.'],
  ['Evidence and reporting', 'Every public figure is tied to a period, a place, and a source document that partners can examine.'],
];

export default function AccountabilityTransparencyMeter() {
  return (
    <div className="premium-card overflow-hidden">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-frad-green-950 p-7 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-white/90">Accountability</p>
          <h2 className="mt-6 text-4xl font-black leading-[1.02] text-white sm:text-6xl">
            Trust is built into the system.
          </h2>
          <p className="mt-8 text-lg font-bold leading-8 text-white/78">
            Safeguarding, complaints handling, and evidence are not add-ons. They are how FRAD works, and they
            stay visible and easy to reach for communities, staff, and partners alike.
          </p>
          <Link
            href="/about/accountability"
            className="safe-focus cta-button mt-10 border border-white bg-white text-ink-950 hover:bg-frad-green-100"
          >
            View accountability
          </Link>
        </div>
        <div className="grid gap-4 bg-paper-100 p-5 sm:p-7">
          {ITEMS.map(([title, copy], index) => (
            <div key={title} className="rounded-[8px] border border-ink-950/10 bg-white p-6 shadow-[0_16px_34px_-30px_rgba(8,17,13,0.28)]">
              <p className="font-heading text-4xl font-black text-frad-green-800">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <p className="mt-3 text-base font-bold leading-7 text-ink-700">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
