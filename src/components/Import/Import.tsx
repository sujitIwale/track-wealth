import { useAppDispatch, useAppSelector } from "@/store/store";
import { setImportModal } from "@/store/slices/uiSlice";
import importApi from "@/api/import";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  ImportedTransaction,
  ImportedTransactionType,
} from "@/types/transaction";
import ResponsiveModal from "../common/Modal/ResponsiveModal";
import Uploader from "./components/Uploader";
import { STATUS } from "@/types/common";
import TransactionsTable from "./components/TransactionsTable";
import { Tab } from "../common/Tabs/Tabs";
import { Tabs } from "../common/Tabs/Tabs";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { toast } from "sonner";

const Import = () => {
  const { open } = useAppSelector((state) => state.ui.importModal);
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<
    Set<string | number>
  >(new Set());
  const [uploadState, setUploadState] = useState<{
    status: STATUS;
    message: string;
  }>({
    status: STATUS.IDLE,
    message: "",
  });
  const [importState, setImportState] = useState<{
    type: "debit" | "credit";
    transactions: ImportedTransaction[];
    status?: STATUS;
  }>({
    type: "debit",
    transactions: [],
  });
  const transactions = useRef<{
    debit: ImportedTransaction[];
    credit: ImportedTransaction[];
  }>({
    debit: [],
    credit: [],
  });
  const [acceptedTransactions, setAcceptedTransactions] = useState<{
    debit: boolean;
    credit: boolean;
  }>({
    debit: false,
    credit: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setUploadState({
      status: STATUS.IDLE,
      message: "",
    });
    setIsUploading(false);
    setImportState({
      type: "debit",
      transactions: [],
    });
    transactions.current = {
      debit: [],
      credit: [],
    };
    setSelectedTransactions(new Set());
  };

  const handleClose = () => {
    dispatch(setImportModal({ open: false }));
    resetState();
  };

  const processFile = async (file: File) => {
    const fileType = file.name.split(".").pop()?.toLowerCase();

    // Check file type
    if (fileType !== "csv" && fileType !== "xlsx") {
      setUploadState({
        status: STATUS.ERROR,
        message: "Please upload a CSV or XLSX file",
      });
      return;
    }

    setIsUploading(true);
    setUploadState({
      status: STATUS.LOADING,
      message: "Importing transactions...",
    });

    try {
      const response = await importApi.importTransactions(file);
      // Handle array of transactions
      transactions.current = {
        debit: response.debitTransactions,
        credit: response.creditTransactions,
      };
      setImportState({
        type: "debit",
        transactions: response.debitTransactions,
      });
      setUploadState({
        status: STATUS.SUCCESS,
        message: "Transactions imported successfully",
      });
    } catch (err) {
      setUploadState({
        status: STATUS.ERROR,
        message:
          err instanceof Error ? err.message : "Failed to import transactions",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditTransaction = (
    index: number,
    field: keyof ImportedTransaction,
    value: string | number | ImportedTransactionType
  ) => {
    console.log({ index, field, value });
    setImportState({
      ...importState,
      transactions: importState.transactions.map((transaction, i) =>
        i === index ? { ...transaction, [field]: value } : transaction
      ),
    });
  };

  const saveTransactions = async (selected?: boolean) => {
    setImportState({
      ...importState,
      status: STATUS.LOADING,
    });
    try {
      if (selected) {
        // Save selected transactions
        await importApi.acceptTransactions(
          importState.transactions.filter((transaction) =>
            selectedTransactions.has(transaction.id)
          ),
          importState.type
        );
      } else {
        // Save all transactions
        await importApi.acceptTransactions(
          importState.transactions,
          importState.type
        );
      }
      toast.success(
        `Saved ${selected ? "selected" : "all"} ${
          importState.type === "debit" ? "debit" : "credit"
        } transactions successfully`
      );
      setImportState({
        ...importState,
        status: STATUS.SUCCESS,
      });
      setSelectedTransactions(new Set());
      transactions.current = {
        debit: importState.type === "debit" ? [] : transactions.current.debit,
        credit:
          importState.type === "credit" ? [] : transactions.current.credit,
      };
      setAcceptedTransactions({
        debit: importState.type === "debit" ? true : acceptedTransactions.debit,
        credit:
          importState.type === "credit" ? true : acceptedTransactions.credit,
      });
    } catch (error) {
      toast.error(
        `Failed to save ${selected ? "selected" : "all"} transactions: ${
          error instanceof Error ? error.message : "Failed to save transactions"
        }`
      );
      setImportState({
        ...importState,
        status: STATUS.IDLE,
      });
    }
  };

  const handleDeleteTransaction = (index: number) => {
    setImportState({
      ...importState,
      transactions: importState.transactions.filter((_, i) => i !== index),
    });
  };

  const isTransactionsAccepted =
    (importState.type === "credit" && acceptedTransactions.credit) ||
    (importState.type === "debit" && acceptedTransactions.debit);

  console.log({
    transactions: transactions.current,
    importState: importState,
    acceptedTransactions: acceptedTransactions,
    isTransactionsAccepted: isTransactionsAccepted,
  });

  return (
    <ResponsiveModal
      isOpen={open}
      onClose={handleClose}
      size="lg"
      headerContent={
        uploadState.status === STATUS.SUCCESS ? (
          <div className="flex justify-between items-center">
            <Tabs
              onValueChange={(value) =>
                setImportState({
                  transactions:
                    value === "debit"
                      ? transactions.current.debit
                      : transactions.current.credit,
                  type: value as "debit" | "credit",
                })
              }
              value={importState.type}
            >
              <Tab
                value="debit"
                icon={
                  <ArrowDownIcon className="w-4 h-4 rotate-45 text-red-500" />
                }
              >
                Debit
              </Tab>
              <Tab
                value="credit"
                icon={
                  <ArrowUpIcon className="w-4 h-4 rotate-45 text-green-500" />
                }
              >
                Credit
              </Tab>
            </Tabs>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Import</h1>
            <p className="text-sm text-gray-500">
              Import your transactions from a CSV or XLSX file.
            </p>
          </>
        )
      }
      footerContent={
        uploadState.status === STATUS.ERROR ? (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={() => fileInputRef.current?.click()}>
              Try Again
            </Button>
          </div>
        ) : importState.transactions.length && !isTransactionsAccepted ? (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {selectedTransactions.size > 0 ? (
              <Button onClick={() => saveTransactions(true)}>
                Accept Selected
              </Button>
            ) : null}
            <Button onClick={() => saveTransactions(false)}>Accept All</Button>
          </div>
        ) : null
      }
    >
      {uploadState.status !== STATUS.SUCCESS ? (
        <Uploader
          handleFile={processFile}
          isUploading={isUploading}
          ref={fileInputRef}
          state={uploadState}
        />
      ) : (
        <div className="flex flex-col gap-4 max-sm:overflow-auto">
          {isTransactionsAccepted ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center py-8">
                <div className="mb-4 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Transactions Accepted!
                </h2>
                <p className="text-gray-600 mb-4">
                  Your transactions have been successfully stored as{" "}
                  {importState.type === "debit" ? "expenses" : "income"}.
                </p>
                {(importState.type === "debit" &&
                  !acceptedTransactions.credit &&
                  transactions.current.credit.length > 0) ||
                (importState.type === "credit" &&
                  !acceptedTransactions.debit &&
                  transactions.current.debit.length > 0) ? (
                  <div className="mt-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-blue-700">
                      You still have pending{" "}
                      {importState.type === "debit" ? "income" : "expense"}{" "}
                      transactions.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() =>
                        setImportState({
                          ...importState,
                          type:
                            importState.type === "debit" ? "credit" : "debit",
                          transactions:
                            importState.type === "debit"
                              ? transactions.current.credit
                              : transactions.current.debit,
                        })
                      }
                    >
                      Switch to{" "}
                      {importState.type === "debit" ? "Income" : "Expense"}{" "}
                      Transactions
                    </Button>
                  </div>
                ) : null}
                <Button onClick={handleClose} className="mt-2">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <TransactionsTable
              transactions={
                importState.type === "debit"
                  ? transactions.current.debit
                  : transactions.current.credit
              }
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              selectedTransactions={selectedTransactions}
              setSelectedTransactions={setSelectedTransactions}
            />
          )}
        </div>
      )}
    </ResponsiveModal>
  );
};

export default Import;
