import FormField from "./FormField";

interface SelectProps {
  label?: string;
  value?: string;
  options: {
    label: string;
    value: string;
    id?: string | number;
  }[];
  onChange: (value: string) => void;
}

const Select = ({ label, value, options, onChange }: SelectProps) => {
  return (
    <FormField label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none cursor-pointer"
      >
        {options.map((option, ind) => (
          <option key={option.id || ind} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default Select;
