import axios from 'axios';

export async function doRequest(params: {
  method: 'POST' | 'PUT';
  url: string;
  data?: any;
}) {
  console.log(params.data);
  return await axios({
    method: params.method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/api${params.url}`,
    headers: {
      'content-type': 'application/json',
    },
    data: params.data,
  });
}
