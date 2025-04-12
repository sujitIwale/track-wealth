import { ImportedTransaction } from "@/types/transaction";
import client from "./client";
import { Response } from "@/types/response";

const importApi = {
    importTransactions: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await client.post<Response<{
            creditTransactions: ImportedTransaction[];
            debitTransactions: ImportedTransaction[];
        }>>("/import/transactions", formData);
        return response.data.data;
    },
    acceptTransactions: async (transactions: ImportedTransaction[],type: "debit" | "credit") => {
        const response = await client.post<Response<null>>(`/import/transactions/accept/${type}`, { transactions });
        return response.data.data;
    }
}

export default importApi;