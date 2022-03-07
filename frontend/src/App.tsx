import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import LeftDrawer from "./components/LeftDrawer";
import Charts from "./components/Charts";
import SingleName from "./components/SingleName";

const App = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [tickerList, setTickerList] = useState<string[]>([]);
  const [cryptoList, setCryptoList] = useState<string[]>([]);

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
      <Grid
        container
        sx={{
          width: toggleDrawer ? "calc(100% - 240px)" : "100%",
          marginLeft: toggleDrawer ? "240px" : "0px",
          transitionDuration: "200ms",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Charts
                drawerOpen={toggleDrawer}
                tickerList={tickerList}
                cryptoList={cryptoList}
              />
            }
          />
          <Route path="/ticker/:symbol" element={<SingleName />} />
        </Routes>
      </Grid>
    </Box>
  );
};

export default App;
