import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Component } from "react";
import "./App.css";
import { Records } from "./models/records.model";
import { PlayerStats, Stats } from "./models/stats.model";

export default class App extends Component {
  state: {
    playerStats: Array<[string, PlayerStats]>;
    playerRecords: Records;
    id: "WED" | "THU";
  } = {
    playerStats: [],
    playerRecords: {},
    id: "THU",
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Football Dashboard</p>
          <NavTabs></NavTabs>
        </header>
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
                    Rate: {(player[1].winRate * 100).toFixed()}%
                  </Typography>
                  <Typography variant="body2">
                    Record: {this.state.playerRecords[player[0]]}
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
    // Get last path parameter for ID.
    const params = new URL(window.location.href).searchParams;
    const id = params.get("id") || "THU";

    this.setState({
      playerStats: await this.getStats(id.toUpperCase()),
      playerRecords: await this.getRecords(id.toUpperCase()),
      id,
    });
  }

  async getStats(id = "THU") {
    const response = await axios.get(
      `https://vbdtrsbhi5.execute-api.eu-west-1.amazonaws.com/production/stats?id=${id}`
    );
    const stats: Stats = response.data;
    let playerStats = Object.entries(stats.players);

    // Sorting by descending winrate, and secondary sort by descending games played.
    playerStats = playerStats
      .sort((a, b) => b[1].played - a[1].played || b[1].winRate - a[1].winRate)
      .filter((stat) => stat[1].played >= 3);
    return playerStats;
  }

  async getRecords(id = "THU") {
    const response = await axios.get(
      `https://vbdtrsbhi5.execute-api.eu-west-1.amazonaws.com/production/records?id=${id}`
    );
    const records: Records = response.data;
    return records;
  }
}

function NavTabs() {
  const [value, setValue] = React.useState("THU");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        centered
      >
        <LinkTab value="WED" label="Wednesday" href="?id=wed" />
        <LinkTab value="THU" label="Thursday" href="?id=thu" />
      </Tabs>
    </Box>
  );
}

interface LinkTabProps {
  value?: "WED" | "THU";
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return <Tab label={props.label} component="a" href={props.href} />;
}
