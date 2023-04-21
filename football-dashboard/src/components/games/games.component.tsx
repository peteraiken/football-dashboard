import { Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Game } from "../../models/game.model";
import axios from "axios";

export const Games = () => {
  const [id] = useState<"WED" | "THU">("THU");
  const [games, setGames] = useState<Array<Game>>([]);
  useEffect(() => {
    getGames(id, "2023-01-01").then((response) => setGames(response));
  }, [id]);
  return (
    <div>
      <h4>Note that results show data from the start of 2023 only.</h4>
      <div className="Card-container">
        {games.map((game: Game) => {
          return (
            <Card
              key={game.slot}
              className="Card-body"
              sx={{ minWidth: 275 }}
              style={{
                backgroundColor: game.winner === "blue" ? "#c4def6" : "#ffbcbc",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {formatDate(game.slot)}
                </Typography>
                <Typography variant="body2" color="blue">
                  {game.teams.blue.join(", ")}
                </Typography>
                <Typography variant="body2" color="red">
                  {game.teams.red.join(", ")}
                </Typography>
                <Typography variant="body2">Winner: {game.winner}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const getGames = async (
  id = "THU",
  dateStart?: string,
  dateEnd?: string
): Promise<Array<Game>> => {
  let url = new URL(
    `https://vbdtrsbhi5.execute-api.eu-west-1.amazonaws.com/production/history?id=${id}`
  );
  if (dateStart) url.searchParams.set("start", dateStart);
  if (dateEnd) url.searchParams.set("end", dateEnd);
  const response = await axios.get(url.toString());
  const games = response.data as Array<Game>;

  return games.sort(
    (a, b) => new Date(b.slot).getTime() - new Date(a.slot).getTime()
  );
};

const formatDate = (date: string): string => {
  return new Date(date).toDateString();
};
