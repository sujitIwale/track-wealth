import Typography from "@/components/common/Typography/Typography";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chart from "./Chart";
import { useState } from "react";

const Overview = () => {
  const [selectedTab, setSelectedTab] = useState("month");
  return (
    <>
      {/* <div className="bg-green-300 fixed top-0 left-0 w-full h-[400px] -z-10" /> */}
      <div className="flex flex-col gap-4 p-4 mb-10">
        <div className="flex flex-col gap-2 items-center justify-between">
          <Typography variant="h6" className="text-gray-600">
            {selectedTab === "month" ? "This Month's Expenses" : "All Time"}
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            $1000
          </Typography>
        </div>
        <Chart />
        <Tabs
          defaultValue="month"
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList className="w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default Overview;
