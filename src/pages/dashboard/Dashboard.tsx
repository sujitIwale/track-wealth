import RecentExpenses from "./components/RecentExpenses";
import Overview from "./components/Overview/Overview";
import SpendingCategories from "./components/Overview/SpendingCategories";
import { useDevice } from "@/contexts/device/DeviceContext";
import { Button } from "@/components/ui/button";
import { setImportModal } from "@/store/slices/uiSlice";
import { ImportIcon, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Typography from "@/components/common/Typography/Typography";
import { Link } from "react-router";
import StateRenderer from "@/components/layout/StateRenderer/StateRenderer";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  const { isMobile } = useDevice();
  const dispatch = useAppDispatch();

  const addedTransaction = user?.user?.addedTransaction;

  return (
    <StateRenderer
      LayoutWrapper={({ children }) => (
        <div className="flex flex-col gap-4 h-full px-4 sm:px-0">
          {children}
        </div>
      )}
      default={() => (
        <>
          {addedTransaction ? (
            <>
              {isMobile ? (
                <div className="flex flex-col gap-4">
                  <Overview />
                  <div className="py-6">
                    <SpendingCategories />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Overview />
                  <div className="px-4 py-6 border border-gray-200 rounded-lg w-1/3 max-h-max">
                    <SpendingCategories />
                  </div>
                </div>
              )}
              <RecentExpenses />
            </>
          ) : (
            <div className="flex flex-col gap-4 h-full justify-center items-center">
              <div>
                <svg
                  width="400"
                  height="300"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="400" height="300" rx="20" fill="#F8FAFC" />

                  <rect
                    x="50"
                    y="80"
                    width="300"
                    height="120"
                    rx="12"
                    fill="#F1F5F9"
                  />
                  <line
                    x1="80"
                    y1="180"
                    x2="80"
                    y2="120"
                    stroke="#CBD5E1"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                  <line
                    x1="120"
                    y1="180"
                    x2="120"
                    y2="140"
                    stroke="#E2E8F0"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                  <line
                    x1="160"
                    y1="180"
                    x2="160"
                    y2="110"
                    stroke="#E2E8F0"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                  <line
                    x1="200"
                    y1="180"
                    x2="200"
                    y2="130"
                    stroke="#E2E8F0"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                  <line
                    x1="240"
                    y1="180"
                    x2="240"
                    y2="160"
                    stroke="#E2E8F0"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                  <line
                    x1="280"
                    y1="180"
                    x2="280"
                    y2="150"
                    stroke="#E2E8F0"
                    stroke-width="4"
                    stroke-linecap="round"
                  />

                  <path
                    d="M80 160 C120 130, 160 170, 200 140 C240 110, 280 130, 320 100"
                    stroke="#93C5FD"
                    stroke-width="2"
                    stroke-dasharray="4 4"
                    fill="none"
                    stroke-linecap="round"
                  />

                  <circle cx="100" cy="50" r="12" fill="#FACC15" />
                  <circle cx="290" cy="40" r="8" fill="#FBBF24" />
                  <circle cx="350" cy="90" r="6" fill="#FDE68A" />

                  <circle cx="200" cy="240" r="40" fill="#E0F2FE" />
                  <path
                    d="M190 240 h20 M200 225 v30"
                    stroke="#38BDF8"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-4">
                <Typography variant="h3">Your account is empty</Typography>
                <Typography variant="body2">
                  Add a transaction or import your data to get started
                </Typography>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-md">
                <Link to="/transaction/expense">
                  <Button variant="default" className="w-full">
                    <Plus size={28} />
                    Add Transaction
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => dispatch(setImportModal({ open: true }))}
                  className="w-full"
                >
                  <ImportIcon size={28} />
                  Import
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    />
  );
};

export default Dashboard;
