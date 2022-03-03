import YieldCurve from "./YieldCurve";
import CandlestickGraph from "./CandlestickGraph";
import { Grid } from "@mui/material";

interface ChartProps {
  drawerOpen: boolean;
  tickerList: string[];
}

const Charts: React.FC<ChartProps> = ({ drawerOpen, tickerList }) => {
  const createCharts = () => {
    return tickerList.map((ticker) => {
      return (
        <Grid item xs="auto" key={ticker}>
          <CandlestickGraph
            stock={ticker}
            crypto={false}
            width={380}
            height={240}
          />
        </Grid>
      );
    });
  };

  return (
    <Grid
      container
      sx={{
        width: drawerOpen ? "calc(100% - 240px)" : "100%",
        marginLeft: drawerOpen ? "240px" : "0px",
        transitionDuration: "200ms",
      }}
    >
      <Grid item xs="auto">
        <YieldCurve width={380} height={240} />
      </Grid>
      {createCharts()}
      <Grid item xs="auto">
        <CandlestickGraph stock="BTC" crypto={true} width={380} height={240} />
      </Grid>
    </Grid>
  );
};

export default Charts;
