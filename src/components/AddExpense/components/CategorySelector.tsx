import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoriesList, Category } from "@/constants/expense";

interface CategorySelectorProps {
  value?: Category;
  onValueChange?: (value: Category) => void;
}

const CategorySelector = ({ value, onValueChange }: CategorySelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category">
          {value && (
            <span className="flex items-center gap-2">
              <span>{CategoriesList.find((c) => c.id === value)?.icon}</span>
              <span>{CategoriesList.find((c) => c.id === value)?.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {CategoriesList.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
