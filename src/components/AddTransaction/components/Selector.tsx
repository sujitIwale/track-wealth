import { Select } from "@/components/ui/form";

interface SelectorProps {
  list: {
    id: string;
    name: string;
    icon: string;
  }[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}

const Selector = ({ list, value, onValueChange, label }: SelectorProps) => {
  return (
    <Select
      value={value}
      onChange={(v) => onValueChange?.(v)}
      options={list.map((item) => ({
        label: item.name,
        value: item.id,
        icon: item.icon,
      }))}
      label={label}
    />
  );
};

export default Selector;
