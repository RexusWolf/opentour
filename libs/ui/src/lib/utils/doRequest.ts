import axios from 'axios';
import { Session } from 'inspector';
import { useSession } from 'next-auth/client';

export async function doRequest(params: {
  method: 'POST' | 'PUT';
  url: string;
  data?: any;
  session?: any;
}) {
  return await axios({
    method: params.method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/api${params.url}`,
    headers: {
      Authorization: `Bearer ${params.session!.access_token}`,
    },
    data: params.data,
  });
}
