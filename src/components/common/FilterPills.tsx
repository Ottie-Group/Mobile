import { FilterStrip, PillChip } from './FilterPills.Styled';
import { haptic } from '../../services/haptics';

interface FilterPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FilterPills({ categories, selectedCategory, onSelectCategory }: FilterPillsProps) {
  const allCategories = ['all', ...categories.filter((c) => c.toLowerCase() !== 'all')];
  const current = (selectedCategory || 'all').toLowerCase();

  const handleSelect = (cat: string) => {
    haptic.selection();
    onSelectCategory(cat);
  };

  return (
    <FilterStrip>
      {allCategories.map((cat) => {
        const isActive = current === cat.toLowerCase();
        const label = cat === 'all' ? 'All Pebbles' : cat;

        return (
          <PillChip key={cat} isActive={isActive} onClick={() => handleSelect(cat)}>
            {label}
          </PillChip>
        );
      })}
    </FilterStrip>
  );
}
