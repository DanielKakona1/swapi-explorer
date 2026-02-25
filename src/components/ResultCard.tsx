import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

import type { SwapiPerson } from '@/types/swapi';

interface ResultCardProps {
  person: SwapiPerson;
}

const PERSON_FIELDS: Array<{ key: keyof SwapiPerson; label: string }> = [
  { key: 'name', label: 'Name' },
  { key: 'height', label: 'Height' },
  { key: 'mass', label: 'Mass' },
  { key: 'hair_color', label: 'Hair color' },
  { key: 'skin_color', label: 'Skin color' },
  { key: 'eye_color', label: 'Eye color' },
  { key: 'birth_year', label: 'Birth year' },
  { key: 'gender', label: 'Gender' },
];

export const ResultCard = memo(({ person }: ResultCardProps) => {
  const fields = useMemo(
    () =>
      PERSON_FIELDS.map(({ key, label }) => ({
        label,
        value: String(person[key] ?? 'unknown'),
      })),
    [person],
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-6 rounded-2xl border border-cyan-200 bg-white/90 p-5 shadow-glow dark:border-cyan-700 dark:bg-slate-900/85"
      data-cy="result-card"
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
        Character details
      </h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl bg-cyan-50/80 p-3 dark:bg-slate-800/80"
          >
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {label}
            </dt>
            <dd className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.section>
  );
});

ResultCard.displayName = 'ResultCard';
