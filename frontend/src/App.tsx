import { useState } from "react";
import { Box } from "@mui/material";
import HeaderBar from "./components/HeaderBar";
import LeftDrawer from "./components/LeftDrawer";
import Charts from "./components/Charts";

const App = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [tickerList, setTickerList] = useState<string[]>([]);
  const [cryptoList, setCryptoList] = useState<string[]>([]);

  const handleDrawerToggle = () => setToggleDrawer(!toggleDrawer);
  const handleSubmit = (ticker: string) => {
    setTickerList([ticker, ...tickerList]);
  };
  const handleCryptoSubmit = (ticker: string) => {
    setCryptoList([ticker, ...cryptoList]);
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
        cryptoList={cryptoList}
        handleSubmit={handleSubmit}
        handleCryptoSubmit={handleCryptoSubmit}
      />
      <Charts
        drawerOpen={toggleDrawer}
        tickerList={tickerList}
        cryptoList={cryptoList}
      />
    </Box>
  );
};

export default App;
