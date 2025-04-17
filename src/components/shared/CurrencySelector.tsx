import { currencies, currenciesMap, Currency } from "@/constants/misc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CurrencySelectorProps = {
  selectedCurrencyCode: Currency;
  onCurrencySelect: (currency: Currency) => void;
  disabled?: boolean;
};

const CurrencySelector = ({
  selectedCurrencyCode,
  onCurrencySelect,
  disabled = false,
}: CurrencySelectorProps) => {
  const selectedCurrency = currenciesMap[selectedCurrencyCode];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        Select your preferred currency
      </label>
      <Select value={selectedCurrency.code} onValueChange={onCurrencySelect}>
        <SelectTrigger className="w-full" disabled={disabled}>
          <SelectValue placeholder="Select a category">
            {selectedCurrency.code && (
              <span className="flex items-center gap-2">
                <span>{selectedCurrency.symbol}</span>
                <span>{selectedCurrency.name}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-[1000]">
          <SelectGroup>
            <SelectLabel>Currencies</SelectLabel>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                <span className="flex items-center gap-2">
                  <span>{currency.symbol}</span>
                  <span>{currency.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
