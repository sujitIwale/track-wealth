import { CheckCircle, XCircle } from "lucide-react";
import { STATUS } from "@/types/common";
import { FileText, UploadCloud } from "lucide-react";
import { useState, forwardRef } from "react";

interface UploaderProps {
  state?: {
    status: STATUS;
    message: string;
  };
  handleFile: (file: File) => void;
  isUploading: boolean;
}

const Uploader = forwardRef<HTMLInputElement, UploaderProps>(
  ({ handleFile, isUploading, state }, ref) => {
    const [isDragging, setIsDragging] = useState(false);

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
        handleFile(file);
      }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    const triggerFileInput = () => {
      if (ref && typeof ref === "object" && ref.current) {
        ref.current.click();
      }
    };

    return (
      <div className="p-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
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
            ref={ref}
          />
          <div className="flex flex-col items-center gap-2">
            {state?.status === STATUS.ERROR ? (
              <>
                <XCircle className="h-10 w-10 text-red-500 mb-2" />
                <p className="text-red-500 font-medium">{state.message}</p>
                <p className="text-sm text-gray-500 mt-1">Click to try again</p>
              </>
            ) : state?.status === STATUS.SUCCESS ? (
              <>
                <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                <p className="text-green-500 font-medium">Import successful!</p>
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
                <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                <div className="flex gap-2 items-center mt-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">CSV or XLSX</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Uploader.displayName = "Uploader";

export default Uploader;
