import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { setImportModal } from "@/store/slices/uiSlice";
import importApi from "@/api/import";
import { useState, useRef } from "react";
import { CheckCircle, FileText, UploadCloud, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  ImportedTransaction,
  ImportedTransactionType,
} from "@/types/transaction";
import { format } from "date-fns";

const Import = () => {
  const { open } = useAppSelector((state) => state.ui.importModal);
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [transactions, setTransactions] = useState<ImportedTransaction[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(setImportModal({ open: false }));
    // Reset states when closing
    setError(null);
    setSuccess(false);
    setIsUploading(false);
    setTransactions([]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    const fileType = file.name.split(".").pop()?.toLowerCase();

    // Check file type
    if (fileType !== "csv" && fileType !== "xlsx") {
      setError("Please upload a CSV or XLSX file");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await importApi.importTransactions(file);
      // Handle array of transactions
      const importedTransactions = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setTransactions(importedTransactions);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to import transactions"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
    setSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={`max-h-[80vh] w-[800px] max-w-[1200px]  overflow-y-auto ${
          transactions.length > 0 ? "max-w-[1200px]!" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>
            Import your transactions from a CSV or XLSX file.
          </DialogDescription>
        </DialogHeader>
        {!success || transactions.length === 0 ? (
          <div className="flex flex-col gap-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : error
                  ? "border-red-400 bg-red-50"
                  : success
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 hover:border-primary hover:bg-primary/5"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className="flex flex-col items-center gap-2">
                {error ? (
                  <>
                    <XCircle className="h-10 w-10 text-red-500 mb-2" />
                    <p className="text-red-500 font-medium">{error}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Click to try again
                    </p>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                    <p className="text-green-500 font-medium">
                      Import successful!
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your transactions have been imported
                    </p>
                  </>
                ) : isUploading ? (
                  <>
                    <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-2"></div>
                    <p className="font-medium">Uploading...</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="font-medium">Drag and drop your file here</p>
                    <p className="text-sm text-gray-500 mt-1">
                      or click to browse
                    </p>
                    <div className="flex gap-2 items-center mt-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">CSV or XLSX</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={triggerFileInput}>Try Again</Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="rounded-md border overflow-hidden">
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
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={saveTransactions}>Save Transactions</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Import;
