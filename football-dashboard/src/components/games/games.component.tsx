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
            <Card key={game.slot} className="Card-body" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {game.winner}
                </Typography>
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
  return response.data;
};
