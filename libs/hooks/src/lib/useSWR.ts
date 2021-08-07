import {
  CompetitionDTO,
  MatchDTO,
  RankingDTO,
  TeamDTO,
} from '@opentour/contracts';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';

export function useCompetition(id: string): CompetitionDTO {
  const [session, loading] = useSession();

  const { data, error } = useSWR(['/api/competitions/{id}?id=' + id], fetchUrl);

  return data;
}

export function useCompetitions(): CompetitionDTO[] {
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    !loading ? ['/api/competitions', session.access_token] : null,
    fetchUrl
  );

  return data;
}

export function useTeams(): TeamDTO[] {
  const [session, loading] = useSession();

  const { data, error } = useSWR(['/api/teams'], fetchUrl);

  return data;
}

export function useMatchesByCompetitionId(competitionId: string): MatchDTO[] {
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    [`/api/matches/{competitionId}/matches?competitionId=${competitionId}`],
    fetchUrl
  );

  return data;
}

export function useRankingByCompetitionId(competitionId: string): RankingDTO {
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    !loading
      ? [
          `/api/competitions/{competitionId}/ranking?competitionId=${competitionId}`,
          session!.access_token,
        ]
      : null,
    fetchUrl
  );

  return data;
}

export function useTeamsByCompetitionId(competitionId: string): TeamDTO[] {
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    [`/api/teams/{competitionId}/teams?competitionId=${competitionId}`],
    fetchUrl
  );

  return data;
}

export const fetchUrl = async (url: string, token: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
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
