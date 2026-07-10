/**
 * Institutional stamp: a slightly rotated, bordered mono label for the ledger
 * language for statuses like ACTIVE, CONSENT FILED, PUBLIC. Use sparingly;
 * a stamp is a claim, not a decoration.
 */
export default function Stamp({
  children,
  tone = 'green',
}: {
  children: React.ReactNode;
  tone?: 'green' | 'red' | 'white';
}) {
  const tones = {
    green: 'border-frad-green-800/70 text-frad-green-800',
    red: 'border-frad-red-600/70 text-frad-red-600',
    white: 'border-white/70 text-white',
  };

  return (
    <span
      className={`inline-block -rotate-2 border-2 px-2 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
