export type TeamStatistics = {
  id: string;
  name: string;
  logo: string;
  pj: number;
  v: number;
  e: number;
  d: number;
  pts: number;
  lastFive: string[];
};

export const ranking = [
  {
    id: '1',
    name: 'Athletic Club',
    logo:
      'https://1.bp.blogspot.com/-6JCo8vYXxyw/XfmNzRUcaII/AAAAAAABW24/skBxnE_cGXAAlhrsQ5eDY-U_ICDspMzMQCLcBGAsYHQ/s1600/Athletic%2BClub128x.png',
    pj: 10,
    v: 4,
    e: 2,
    d: 4,
    pts: 14,
    lastFive: ['victory', 'defeat', 'victory', 'victory', 'victory'],
  },
  {
    id: '2',
    name: 'Real Betis',
    logo:
      'https://1.bp.blogspot.com/-7gTO5OFxWRA/WVQQRLv34KI/AAAAAAABKQU/csiVa31UzOQQrPTmQvCMJCg5f6rZKLiWwCLcBGAs/s1600/Real%2BBetis128x.png',
    pj: 10,
    v: 3,
    e: 3,
    d: 4,
    pts: 12,
    lastFive: ['victory', 'tie', 'tie', 'defeat', 'victory'],
  },
  {
    id: '3',
    name: 'Club Atlético de Madrid',
    logo:
      'https://4.bp.blogspot.com/-5wKKVO2ldrE/WW6rlQVwh6I/AAAAAAABNU8/6GSSghmP3Xc3WhGgCfnP3xerUtugxreygCLcBGAs/s1600/Club%2BAtletico%2Bde%2BMadrid128x.png',
    pj: 10,
    v: 5,
    e: 5,
    d: 0,
    pts: 20,
    lastFive: ['tie', 'victory', 'victory', 'tie', 'victory'],
  },
  {
    id: '4',
    name: 'FC Barcelona',
    logo:
      'https://1.bp.blogspot.com/-r52UG5FWl8E/X54LZTfiuqI/AAAAAAABhJ8/zh4JZwPxqf897nakly5_SJs0Fb_HoU-PwCLcBGAsYHQ/s0/FC%2BBarcelona128x.png',
    pj: 10,
    v: 6,
    e: 1,
    d: 3,
    pts: 19,
    lastFive: ['victory', 'defeat', 'victory', 'tie', 'victory'],
  },
  {
    id: '5',
    name: 'Real Madrid CF',
    logo:
      'https://2.bp.blogspot.com/-di6NzzVNENo/WqQ27urs8oI/AAAAAAABQ7U/A_eKgQDqxNgnwwFXIC90mJuovYWyImBZACLcBGAs/s1600/Real%2BMadrid%2BCF128x.png',
    pj: 10,
    v: 5,
    e: 5,
    d: 0,
    pts: 20,
    lastFive: ['victory', 'tie', 'tie', 'victory', 'victory'],
  },
  {
    id: '6',
    name: 'Valencia CF',
    logo:
      'https://1.bp.blogspot.com/-NvBMmFoARJQ/XsMEa0D3noI/AAAAAAABa5Y/nccEeEXI_WMIJsQNn8W7idmI7RmMbknEQCK4BGAsYHg/Valencia%2BCF128x.png',
    pj: 10,
    v: 7,
    e: 0,
    d: 3,
    pts: 21,
    lastFive: ['victory', 'defeat', 'victory', 'defeat', 'defeat'],
  },
];
