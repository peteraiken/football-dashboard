export interface Stats {
  id: string;
  numberOfGames: number;
  players: { [key: string]: PlayerStats };
}

export interface PlayerStats {
  played: number;
  win: number;
  winRate: number;
}
