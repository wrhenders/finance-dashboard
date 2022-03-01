import ReactDOM from "react-dom";
import YieldCurve from "./components/YieldCurve";
import CandlestickGraph from "./components/CandlestickGraph";
import Grid from "@mui/material/Grid";

const App = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs="auto">
        <YieldCurve width={480} height={300} />
      </Grid>
      <Grid item xs="auto">
        <CandlestickGraph stock="SPY" crypto={false} width={480} height={300} />
      </Grid>
      <Grid item xs="auto">
        <CandlestickGraph stock="BTC" crypto={true} width={480} height={300} />
      </Grid>
    </Grid>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
