import { useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import CandlestickGraph from "./CandlestickGraph";

type SymbolParams = {
  symbol: string;
  crypto: string;
};

const SingleName: React.FC = () => {
  const { symbol, crypto } = useParams<SymbolParams>();
  return (
    <Grid item xs={12} sx={{ mt: 4, ml: 4, mr: 4 }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          height: "80vh",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 1080,
        }}
      >
        <CandlestickGraph
          stock={symbol}
          crypto={crypto ? true : false}
          width={1080}
          height={380}
        />
      </Paper>
    </Grid>
  );
};

export default SingleName;
