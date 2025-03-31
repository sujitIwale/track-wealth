import client from "./client";

const dashboardApi = {
  getSummary: async () => {
    const response = await client.get("/dashboard/summary");
    return response.data;
  },
};

export default dashboardApi;
