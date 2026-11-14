/**
 * Dark card listing challenge categories.
 *
 * Shows the first `initialCount` categories; if there are more, a
 * "show all" button expands the list (and "show less" collapses it again).
 * So you can add as many categories as you like without the card growing
 * too tall by default.
 *
 * Props:
 *  - categories    [{ id, name, tag }]
 *  - onSelect(category)  optional; called when a category is clicked.
 *                  Wire this to your router / data loading later.
 *  - initialCount  how many to show before expanding (default 5)
 */
import { useState } from 'react';
import { t } from '../../content/strings.js';

export default function CategoriesCard({ categories, onSelect, initialCount = 5 }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = categories.length > initialCount;
  const visible = expanded ? categories : categories.slice(0, initialCount);

  return (
    <section id="categories" className="rounded-2xl border border-forest-line bg-forest-panel p-4">
      <h2 className="mb-3 font-display text-lg font-extrabold">{t.sidebar.categoriesTitle}</h2>
      <ul className="flex flex-col gap-2">
        {visible.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => onSelect?.(category)}
              className="flex min-h-11 w-full items-center justify-between rounded-xl border border-forest-line bg-forest-row px-3.5 text-[15px] font-bold transition-colors hover:bg-forest-line"
            >
              <span>{category.name}</span>
              <span className="text-xs font-medium text-muted-dark">{category.tag}</span>
            </button>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl border border-forest-ring text-sm font-bold text-gold transition-colors hover:bg-forest-row"
        >
          {expanded ? t.sidebar.showLess : t.sidebar.showAll(categories.length)}
        </button>
      )}
    </section>
  );
}
