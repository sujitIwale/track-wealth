import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: TabsProps) => {
  const [activeTab, setActiveTabState] = useState(defaultValue || "");

  const setActiveTab = (id: string) => {
    if (value === undefined) {
      setActiveTabState(id);
    }
    onValueChange?.(id);
  };

  const contextValue = {
    activeTab: value !== undefined ? value : activeTab,
    setActiveTab,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("flex bg-gray-100 rounded-3xl max-w-fit", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const Tab = ({
  value,
  children,
  className,
  icon,
  disabled,
}: TabProps) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tab must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-3xl flex items-center gap-2 transition-colors cursor-pointer",
        isActive ? "bg-black text-white" : "",
        className
      )}
      onClick={() => setActiveTab(value)}
      disabled={disabled}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
