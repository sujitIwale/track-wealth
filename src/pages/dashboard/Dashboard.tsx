import RecentExpenses from "./components/RecentExpenses";
import Overview from "./components/Overview/Overview";
import { useEffect } from "react";
import dashboardApi from "@/api/dashboard";
import SpendingCategories from "./components/Overview/SpendingCategories";
import { useDevice } from "@/contexts/device/DeviceContext";
import { Button } from "@/components/ui/button";
import { setImportModal } from "@/store/slices/uiSlice";
import { ImportIcon } from "lucide-react";
import { useAppDispatch } from "@/store/store";

const Dashboard = () => {
  const { isMobile } = useDevice();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dashboardApi.getSummary().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {isMobile ? (
        <div className="flex flex-col gap-4">
          <Overview />
          <Button
            variant="default"
            className="w-full"
            onClick={() => dispatch(setImportModal({ open: true }))}
          >
            <ImportIcon size={28} />
            Import
          </Button>
          <div className="px-4 py-6">
            <SpendingCategories />
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="px-4 py-6 border border-gray-200 rounded-lg w-2/3">
            <Overview />
          </div>
          <div className="px-4 py-6 border border-gray-200 rounded-lg w-1/3 max-h-max">
            <SpendingCategories />
          </div>
        </div>
      )}
      <RecentExpenses />
    </div>
  );
};

export default Dashboard;
