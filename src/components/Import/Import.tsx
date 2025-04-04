import { useAppDispatch, useAppSelector } from "@/store/store";
import { setImportModal } from "@/store/slices/uiSlice";
import importApi from "@/api/import";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  ImportedTransaction,
  ImportedTransactionType,
} from "@/types/transaction";
import { format } from "date-fns";
import ResponsiveModal from "../common/Modal/ResponsiveModal";
import Uploader from "./components/Uploader";
import { STATUS } from "@/types/common";

const Import = () => {
  const { open } = useAppSelector((state) => state.ui.importModal);
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<{
    status: STATUS;
    message: string;
  }>({
    status: STATUS.IDLE,
    message: "",
  });
  const [transactions, setTransactions] = useState<ImportedTransaction[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(setImportModal({ open: false }));
    // Reset states when closing
    setUploadState({
      status: STATUS.IDLE,
      message: "",
    });
    setIsUploading(false);
    setTransactions([]);
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
      const importedTransactions = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setTransactions(importedTransactions);
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
    setTransactions(
      transactions.map((transaction, i) =>
        i === index ? { ...transaction, [field]: value } : transaction
      )
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch (error) {
      console.error(error);
      return dateString;
    }
  };

  const saveTransactions = async () => {
    // Here you would implement saving the edited transactions
    // This is placeholder for future implementation
  };

  return (
    <ResponsiveModal
      isOpen={open}
      onClose={handleClose}
      headerContent={
        <>
          <h1 className="text-2xl font-bold">Import</h1>
          <p className="text-sm text-gray-500">
            Import your transactions from a CSV or XLSX file.
          </p>
        </>
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
        ) : transactions.length ? (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={saveTransactions}>Save Transactions</Button>
          </div>
        ) : null
      }
    >
      {uploadState.status !== STATUS.SUCCESS ? (
        <>
          <Uploader
            handleFile={processFile}
            isUploading={isUploading}
            ref={fileInputRef}
            state={uploadState}
          />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="rounded-md border overflow-hidden max-sm:overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-2 text-left font-medium text-slate-600 w-[100px]">
                    Date
                  </th>
                  <th className="p-2 text-left font-medium text-slate-600">
                    Name
                  </th>
                  <th className="p-2 text-left font-medium text-slate-600">
                    Type
                  </th>
                  <th className="p-2 text-left font-medium text-slate-600">
                    Amount
                  </th>
                  <th className="p-2 text-left font-medium text-slate-600">
                    From Account
                  </th>
                  <th className="p-2 text-left font-medium text-slate-600">
                    To Account
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-2">
                      <input
                        type="date"
                        value={formatDate(transaction.date)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleEditTransaction(index, "date", e.target.value)
                        }
                        className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={transaction.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleEditTransaction(index, "name", e.target.value)
                        }
                        className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        value={transaction.type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleEditTransaction(
                            index,
                            "type",
                            e.target.value as ImportedTransactionType
                          )
                        }
                        className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      >
                        <option value="DEBIT">DEBIT</option>
                        <option value="CREDIT">CREDIT</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={transaction.amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleEditTransaction(
                            index,
                            "amount",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={transaction.fromAccount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleEditTransaction(
                            index,
                            "fromAccount",
                            e.target.value
                          )
                        }
                        className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        value={transaction.toAccount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleEditTransaction(
                            index,
                            "toAccount",
                            e.target.value
                          )
                        }
                        className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </ResponsiveModal>
  );
};

export default Import;
