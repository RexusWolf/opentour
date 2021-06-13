import { teams } from '../shared/teams';

export function getRandomLogo() {
  const randomPosition = Math.floor(Math.random() * teams.length);

  return teams[randomPosition].logo;
}
