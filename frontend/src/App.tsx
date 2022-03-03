import { useState } from "react";
import { Box } from "@mui/material";
import HeaderBar from "./components/HeaderBar";
import LeftDrawer from "./components/LeftDrawer";
import Charts from "./components/Charts";

const App = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [tickerList, setTickerList] = useState<string[]>([]);

  const handleDrawerToggle = () => setToggleDrawer(!toggleDrawer);
  const handleSubmit = (ticker: string) => {
    setTickerList([ticker, ...tickerList]);
  };

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        backgroundColor: "#eeeeee",
      }}
    >
      <HeaderBar toggleOpen={handleDrawerToggle} />
      <LeftDrawer
        open={toggleDrawer}
        tickerList={tickerList}
        handleSubmit={handleSubmit}
      />
      <Charts drawerOpen={toggleDrawer} tickerList={tickerList} />
    </Box>
  );
};

export default App;
