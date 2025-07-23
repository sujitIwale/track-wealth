import EmptyState from "@/components/shared/EmptyState";
import StateRenderer from "@/components/layout/StateRenderer/StateRenderer";

const Budget = () => {
  return (
    <StateRenderer
      LayoutWrapper={({ children }) => (
        <div className="flex flex-col gap-4 h-full px-4 sm:px-0">
          {children}
        </div>
      )}
      default={() => (
        <EmptyState
          title="Budget Feature Coming Soon"
          description="We're working hard to bring you budgeting tools to help you manage your finances better. Stay tuned!"
          size="large"
          className="py-8"
        />
      )}
    />
  );
};

export default Budget;
