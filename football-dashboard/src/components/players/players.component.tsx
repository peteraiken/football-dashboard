import axios from "axios";
import { PlayerStats, Stats } from "../../models/stats.model";
import { Card, CardContent, Typography } from "@mui/material";
import { Records } from "../../models/records.model";
import { useEffect, useState } from "react";
import "../../App.css";
import "../../index.css";

export const Players = () => {
  const [id] = useState<"WED" | "THU">("THU");
  const [stats, setStats] = useState<Array<[string, PlayerStats]>>([]);
  const [records, setRecords] = useState<Records>({});
  useEffect(() => {
    getPlayerStats(id, "2023-01-01").then((response) => setStats(response));
    getPlayersRecords(id, "2023-01-01").then((response) =>
      setRecords(response)
    );
  }, [id]);

  return (
    <div>
      <h4>
        Note that results show data from the start of 2023 only, and only for
        players for whom data exists for 3 or more games.
      </h4>
      <div className="Card-container">
        {stats.map((player: [string, PlayerStats]) => {
          return (
            <Card key={player[0]} className="Card-body" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {player[0]}
                </Typography>
                <br />
                <Typography variant="body2">
                  Played: {player[1].played}
                </Typography>
                <Typography variant="body2">Won: {player[1].win}</Typography>
                <Typography variant="body2">
                  Rate: {(player[1].winRate * 100).toFixed()}%
                </Typography>
                <Typography variant="body2">
                  Record: {records[player[0]]}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const getPlayerStats = async (
  id = "THU",
  dateStart?: string,
  dateEnd?: string
): Promise<Array<[string, PlayerStats]>> => {
  let url = new URL(
    `https://vbdtrsbhi5.execute-api.eu-west-1.amazonaws.com/production/stats?id=${id}`
  );
  if (dateStart) url.searchParams.set("start", dateStart);
  if (dateEnd) url.searchParams.set("end", dateEnd);
  const response = await axios.get(url.toString());

  const stats: Stats = response.data;
  let playerStats = Object.entries(stats.players);

  // Sorting by descending winrate, and secondary sort by descending games played.
  playerStats = playerStats
    .sort((a, b) => b[1].winRate - a[1].winRate || b[1].played - a[1].played)
    .filter((stat) => stat[1].played >= 3);
  return playerStats;
};

const getPlayersRecords = async (
  id = "THU",
  dateStart?: string,
  dateEnd?: string
): Promise<Records> => {
  let url = new URL(
    `https://vbdtrsbhi5.execute-api.eu-west-1.amazonaws.com/production/records?id=${id}`
  );
  if (dateStart) url.searchParams.set("start", dateStart);
  if (dateEnd) url.searchParams.set("end", dateEnd);
  const response = await axios.get(url.toString());
  const records: Records = response.data;
  return records;
};
