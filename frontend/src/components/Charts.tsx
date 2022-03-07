import YieldCurve from "./YieldCurve";
import CandlestickGraph from "./CandlestickGraph";
import { Grid } from "@mui/material";

interface ChartProps {
  drawerOpen: boolean;
  tickerList: string[];
  cryptoList: string[];
}

const Charts: React.FC<ChartProps> = ({ tickerList, cryptoList }) => {
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
  const createCryptoCharts = () => {
    return cryptoList.map((ticker) => {
      return (
        <Grid item xs="auto" key={ticker}>
          <CandlestickGraph
            stock={ticker}
            crypto={true}
            width={380}
            height={240}
          />
        </Grid>
      );
    });
  };

  return (
    <>
      <Grid item xs="auto">
        <YieldCurve width={380} height={240} />
      </Grid>
      {createCharts()}
      {createCryptoCharts()}
    </>
  );
};

export default Charts;
