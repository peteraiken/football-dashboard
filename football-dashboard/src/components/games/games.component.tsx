import { Card, CardContent, Typography } from "@mui/material";
import { PlayerStats } from "../../models/stats.model";

export const Games = async () => {
  return (
    <div>
      <h4>
        Note that results show data from the start of 2023 only, and only for
        players for whom data exists for 3 or more games.
      </h4>
      <div className="Card-container">
        {[].map((game: [string, PlayerStats]) => {
          return (
            <Card key={game[0]} className="Card-body" sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {game[0]}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
