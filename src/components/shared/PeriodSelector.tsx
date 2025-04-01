import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PeriodSelectorProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}

const PeriodSelector = ({
  selectedPeriod,
  setSelectedPeriod,
}: PeriodSelectorProps) => {
  return (
    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category">
          {selectedPeriod}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="year">Year</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PeriodSelector;
