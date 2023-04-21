import { Teams } from "./team.model";

export interface Game {
  winner: "blue" | "red";
  teams: Teams;
  slot: string;
  id: "WED" | "THU";
}
