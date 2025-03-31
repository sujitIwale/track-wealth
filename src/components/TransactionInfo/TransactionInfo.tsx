import { ArrowUp, ArrowDown } from "lucide-react";
import Typography from "../common/Typography/Typography";
import { formatCurrency } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
interface TransactionInfoProps {
  title: string;
  amount: number;
  currency: string;
  sent: boolean;
  change: number;
}

const TransactionInfo = ({ title, amount, sent }: TransactionInfoProps) => {
  const currency = useAppSelector((state) => state.user.currency);

  return (
    <div className="flex justify-between items-center gap-4 py-4">
      <div
        className={`p-2 text-white rounded-lg ${
          sent ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {sent ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
      </div>
      <div>
        <Typography variant="subtitle1" className="text-gray-600 font-semibold">
          {title}
        </Typography>
        <Typography variant="h5" className="text-gray-600">
          {formatCurrency(amount, currency)}
        </Typography>
      </div>
    </div>
  );
};

export default TransactionInfo;
