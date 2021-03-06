import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import LeftDrawer from "./components/LeftDrawer";
import Charts from "./components/Charts";
import SingleName from "./components/SingleName";

type ListObject = {
  stocks: string[];
  crypto: string[];
};

const App = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [tickerList, setTickerList] = useState<string[]>([]);
  const [cryptoList, setCryptoList] = useState<string[]>([]);

  useEffect(() => {
    fetch(`https://ryans-finance-dashboard.herokuapp.com/api/get-list`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("List not found");
        }
        return response;
      })
      .then((response) => response.json())
      .then((response: ListObject) => {
        setTickerList(response.stocks);
        setCryptoList(response.crypto);
      })
      .catch(() => {
        //console.log(err);
      });
  }, []);

  const handleDrawerToggle = () => setToggleDrawer(!toggleDrawer);
  const handleSubmit = (ticker: string, crypto: boolean) => {
    if (tickerList.includes(ticker) || cryptoList.includes(ticker)) {
      return;
    }
    if (crypto) {
      setCryptoList([ticker, ...cryptoList]);
    } else {
      setTickerList([ticker, ...tickerList]);
    }

    fetch(`https://ryans-finance-dashboard.herokuapp.com/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: ticker, crypto }),
    }).catch((err) => console.log(err));
  };

  const handleDelete = (ticker: string) => {
    fetch(`https://ryans-finance-dashboard.herokuapp.com/api/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: ticker,
        crypto: tickerList.includes(ticker) ? false : true,
      }),
    }).catch((err) => console.log(err));
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
          <Route path="/ticker/:symbol/">
            <Route path="" element={<SingleName />} />
            <Route path=":crypto" element={<SingleName />} />
          </Route>
        </Routes>
      </Grid>
    </Box>
  );
};

export default App;
