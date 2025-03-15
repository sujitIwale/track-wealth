import RecentExpenses from "./components/RecentExpenses";
import Overview from "./components/Overview/Overview";
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <Overview />

      <RecentExpenses />
    </div>
  );
};

export default Dashboard;
