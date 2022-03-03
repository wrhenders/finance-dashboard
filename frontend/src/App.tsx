import { useState } from "react";
import YieldCurve from "./components/YieldCurve";
import CandlestickGraph from "./components/CandlestickGraph";
import { Grid, Box, Toolbar } from "@mui/material";
import HeaderBar from "./components/HeaderBar";
import LeftDrawer from "./components/LeftDrawer";

const App = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const handleDrawerToggle = () => setToggleDrawer(!toggleDrawer);

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
      <LeftDrawer open={toggleDrawer} />
      <Grid
        container
        sx={{
          width: toggleDrawer ? "calc(100% - 240px)" : "100%",
          marginLeft: toggleDrawer ? "240px" : "0px",
          transitionDuration: "200ms",
        }}
      >
        <Grid item xs="auto">
          <YieldCurve width={380} height={240} />
        </Grid>
        <Grid item xs="auto">
          <CandlestickGraph
            stock="SPY"
            crypto={false}
            width={380}
            height={240}
          />
        </Grid>
        <Grid item xs="auto">
          <CandlestickGraph
            stock="QQQ"
            crypto={false}
            width={380}
            height={240}
          />
        </Grid>
        <Grid item xs="auto">
          <CandlestickGraph
            stock="BTC"
            crypto={true}
            width={380}
            height={240}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
