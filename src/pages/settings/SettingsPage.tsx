import { ReactNode, useState } from "react";
import Typography from "@/components/common/Typography/Typography";
import { useAppSelector } from "@/store/store";
import { Button } from "@/components/ui/button";
import { LogOut, MoveRight, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import EditCurrencyModal from "./components/EditCurrencyModal";

const Item = ({
  title,
  value,
  action,
  titleClassName,
}: {
  title: ReactNode;
  titleClassName?: string;
  value?: ReactNode;
  action?: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-4">
      <Typography
        variant="subtitle1"
        className={cn("text-gray-800 font-medium", titleClassName)}
      >
        {title}
      </Typography>
      <div className="flex items-center gap-4">
        {value ? (
          <Typography variant="body2" className="text-gray-600">
            {value}
          </Typography>
        ) : null}
        {action}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [isEditingCurrency, setIsEditingCurrency] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const currency = useAppSelector((state) => state.user.currency);

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-0">
      <Typography variant="h4">Settings</Typography>
      <div className="border border-gray-200 rounded-lg">
        <Item title="Name" value={user?.name} />
        <Item title="Email" value={user?.email} />
        <Item
          title="Currency"
          value={currency}
          action={
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditingCurrency(true)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          }
        />
        <Item
          title="Categories"
          action={
            <Button variant="outline" size="icon">
              <MoveRight className="w-4 h-4" />
            </Button>
          }
        />
        <Item
          title="Logout"
          titleClassName="text-red-500"
          action={
            <Button variant="destructive" size="icon">
              <LogOut className="w-4 h-4" />
            </Button>
          }
        />
      </div>
      <EditCurrencyModal
        isOpen={isEditingCurrency}
        onClose={() => setIsEditingCurrency(false)}
        currency={currency}
      />
    </div>
  );
};

export default SettingsPage;
