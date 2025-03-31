import Typography from "@/components/common/Typography/Typography";
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router";

const data = [
  {
    id: 1,
    name: "Income",
    value: 10000,
    percentage: 50,
    color: "bg-green-500",
  },
  {
    id: 2,
    name: "Expense",
    value: 10000,
    percentage: 50,
    color: "bg-red-500",
  },
];

const Summary = () => {
  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="flex justify-between">
        <Typography variant="h4" className="text-gray-800 font-bold">
          Summary
        </Typography>
        <Link to="/transaction/expense">
          <Button variant="default" size="sm">
            <IoIosAdd size={20} />
            Add
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Typography variant="subtitle1" className="text-gray-800">
            Net Total
          </Typography>
          <Typography variant="h3" className="text-gray-800">
            $10000
          </Typography>
        </div>
        <div className="flex rounded-md w-[300px] h-2">
          {data.map((item) => (
            <div
              key={item.id}
              className={`${item.color} first:rounded-l-md last:rounded-r-md`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
