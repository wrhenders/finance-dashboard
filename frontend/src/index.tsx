import ReactDOM from "react-dom";
import YieldCurve from "./components/YieldCurve";
import CandlestickGraph from "./components/CandlestickGraph";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
import HeaderBar from "./components/HeaderBar";

const App = () => {
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
      <HeaderBar />
      <Grid container spacing={2}>
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

ReactDOM.render(<App />, document.querySelector("#root"));
