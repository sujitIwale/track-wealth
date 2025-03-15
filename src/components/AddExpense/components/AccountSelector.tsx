import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountTypesList, AccountType } from "@/constants/expense";

interface AccountSelectorProps {
  value?: AccountType;
  onValueChange?: (value: AccountType) => void;
}

const AccountSelector = ({ value, onValueChange }: AccountSelectorProps) => {
  console.log({ value });
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an account">
          {value && (
            <span className="flex items-center gap-2">
              <span>{AccountTypesList.find((a) => a.id === value)?.icon}</span>
              <span>{AccountTypesList.find((a) => a.id === value)?.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Accounts</SelectLabel>
          {AccountTypesList.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <span className="flex items-center gap-2">
                <span>{account.icon}</span>
                <span>{account.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AccountSelector;
