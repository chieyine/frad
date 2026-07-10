'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-[8px] border border-ink-950/10 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-ink-950/10 last:border-b-0">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="safe-focus group flex w-full items-center justify-between px-5 py-5 text-left transition-colors hover:bg-frad-green-50/60"
              aria-expanded={isOpen}
            >
              <span className="text-base font-extrabold text-ink-950 group-hover:text-frad-green-800 transition-colors pr-4">
                {item.title}
              </span>
              <Icon
                name="chevron-down"
                className={`h-5 w-5 shrink-0 text-ink-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-frad-green-800' : ''}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-ink-600">{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
