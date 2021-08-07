import axios from 'axios';

export async function doRequest(params: {
  method: 'POST' | 'PUT';
  url: string;
  data?: any;
}) {
  return await axios({
    method: params.method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/api${params.url}`,
    data: params.data,
  });
}
