import useSWR from 'swr';
import { CompetitionDTO } from '@opentour/contracts';

export function useCompetition(id: string): CompetitionDTO {
  const { data, error } = useSWR(['/api/competitions/{id}?id=' + id], fetchUrl);

  return data;
}

export function useCompetitions(): CompetitionDTO[] {
  const { data, error } = useSWR(['/api/competitions'], fetchUrl);

  return data;
}

export const fetchUrl = async (url: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);
      throw Error;
    }
  });
};
