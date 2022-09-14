import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import { Component } from "react";
import "./App.css";
import { PlayerStats, Stats } from "./models/stats.model";

export default class App extends Component {
  state = {
    playerStats: [],
    id: "THU",
  };

  render() {
    console.log("rendering");
    return (
      <div className="App">
        <header className="App-header">
          <p>Football Dashboard</p>
          <Tabs value={this.state.id} onChange={this.handleChange} centered>
            <Tab value="WED" label="Wednesday" />
            <Tab value="THU" label="Thursday" />
          </Tabs>
        </header>
        <button onClick={this.testButton}>test button</button>
        <div className="Card-container">
          {this.state.playerStats.map((player: [string, PlayerStats]) => {
            return (
              <Card
                key={player[0]}
                className="Card-body"
                sx={{ minWidth: 275 }}
              >
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
                    Rate: {player[1].winRate * 100}%
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  async componentDidMount(): Promise<void> {
    console.log("mounted");
    this.setState({ playerStats: await this.getStats() });
  }

  async getStats() {
    const response = await axios.get(
      `https://vbdtrsbhi5.execute-api.eu-west-1.amazonaws.com/production/stats?id=${this.state.id}`
    );
    const stats: Stats = response.data;
    let playerStats = Object.entries(stats.players);

    // Sorting by descending winrate, and secondary sort by descending games played.
    playerStats = playerStats.sort(
      (a, b) => b[1].winRate - a[1].winRate || b[1].played - a[1].played
    );
    return playerStats;
  }

  handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    this.setState({
      id: newValue,
      playerStats: async this.getStats(),
    });
  };

  testButton = (event: any) => {
    console.log("current state", this.state);
  };
}
