import client from "@/api/client";

const baseQuery = ({url, method, body, params}: {url: string, method: string, body: unknown, params: unknown}) => {
  const response = client.request({
    url,    
    method,
    data: body,
    params,
  });

  return response;
};

export default baseQuery;
