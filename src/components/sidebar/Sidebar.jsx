/**
 * Right-hand column (left side in RTL) that stacks the three side cards.
 * Re-order or remove cards here.
 *
 * Props: streak (number), categories (array), onSelectCategory, onCreateChallenge
 */
import CategoriesCard from './CategoriesCard.jsx';
import CreateChallengeCard from './CreateChallengeCard.jsx';
import StreakCard from './StreakCard.jsx';

export default function Sidebar({ streak, categories, onSelectCategory, onCreateChallenge }) {
  return (
    <aside className="flex min-w-0 flex-col gap-4">
      <StreakCard days={streak} />
      <CategoriesCard categories={categories} onSelect={onSelectCategory} />
      <CreateChallengeCard onCreate={onCreateChallenge} />
    </aside>
  );
}
