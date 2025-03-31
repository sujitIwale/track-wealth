import RecentExpenses from "./components/RecentExpenses";
import Overview from "./components/Overview/Overview";
import { useEffect } from "react";
import dashboardApi from "@/api/dashboard";

const Dashboard = () => {
  useEffect(() => {
    dashboardApi.getSummary().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* <Summary /> */}
      <Overview />

      <RecentExpenses />
    </div>
  );
};

export default Dashboard;
