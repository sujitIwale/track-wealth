import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectorProps {
  list: {
    id: string;
    name: string;
    icon: string;
  }[];
  value?: string;
  onValueChange?: (value: string) => void;
}

const Selector = ({ list, value, onValueChange }: SelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category">
          {value && (
            <span className="flex items-center gap-2">
              <span>{list.find((c) => c.id === value)?.icon}</span>
              <span>{list.find((c) => c.id === value)?.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {list.map((category) => (
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

export default Selector;
