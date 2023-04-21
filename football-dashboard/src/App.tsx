// export default class App extends Component {
//   state: {
//     playerStats: Array<[string, PlayerStats]>;
//     playerRecords: Records;
//     id: "WED" | "THU";
//   } = {
//     playerStats: [],
//     playerRecords: {},
//     id: "THU",
//   };

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>Football Dashboard</p>
//           <NavTabs></NavTabs>
//         </header>
//         <Router>
//           <Routes>
//             <Route path="/players" element={<Players />} />
//           </Routes>
//         </Router>
//       </div>
//     );
//   }

//   async componentDidMount(): Promise<void> {
//     // Get last path parameter for ID.
//     const params = new URL(window.location.href).searchParams;
//     const id = params.get("id") || "THU";

//     // Just getting data after start of year 2023.
//     this.setState({
//       playerStats: await this.getStats(id.toUpperCase(), "2023-01-01"),
//       playerRecords: await this.getRecords(id.toUpperCase(), "2023-01-01"),
//       id,
//     });
//   }
// }

import { Routes, Route } from "react-router-dom";
import { Players } from "./components/players/players.component";
import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import "./App.css";
import "./index.css";
import { Games } from "./components/games/games.component";

function NavTabs() {
  const [value, setValue] = React.useState("PLAYERS");

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
        <LinkTab value="GAMES" label="Games" href="/#/games" />
        <LinkTab value="PLAYERS" label="Players" href="/#/players" />
      </Tabs>
    </Box>
  );
}

interface LinkTabProps {
  value?: "GAMES" | "PLAYERS";
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return <Tab label={props.label} component="a" href={props.href} />;
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Football Dashboard</p>
        <NavTabs></NavTabs>
      </header>
      <Routes>
        <Route path="/" element={<Players />} />
        <Route path="/players" element={<Players />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  );
}
