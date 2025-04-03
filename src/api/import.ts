import { ImportedTransaction } from "@/types/transaction";
import client from "./client";
import { Response } from "@/types/response";

const importApi = {
    importTransactions: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await client.post<Response<ImportedTransaction>>("/import/transactions", formData);
        return response.data;
    }
}

export default importApi;