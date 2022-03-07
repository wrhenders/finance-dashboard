import { useState } from "react";
import { Box } from "@mui/material";
import HeaderBar from "./components/HeaderBar";
import LeftDrawer from "./components/LeftDrawer";
import Charts from "./components/Charts";

const App = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [tickerList, setTickerList] = useState<string[]>(["SPY", "QQQ"]);
  const [cryptoList, setCryptoList] = useState<string[]>(["BTC", "ETH"]);

  const handleDrawerToggle = () => setToggleDrawer(!toggleDrawer);
  const handleSubmit = (ticker: string) => {
    if (tickerList.includes(ticker)) {
      return;
    }
    setTickerList([ticker, ...tickerList]);
  };
  const handleCryptoSubmit = (ticker: string) => {
    if (cryptoList.includes(ticker)) {
      return;
    }
    setCryptoList([ticker, ...cryptoList]);
  };
  const handleDelete = (ticker: string) => {
    setTickerList(tickerList.filter((stock) => stock !== ticker));
    setCryptoList(cryptoList.filter((stock) => stock !== ticker));
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
        handleDelete={handleDelete}
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
