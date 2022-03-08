import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import CandlestickGraph from "./CandlestickGraph";
import NewsList from "./NewsList";

type SymbolParams = {
  symbol: string;
  crypto: string;
};

type NameObject = {
  name?: string;
};

const SingleName: React.FC = () => {
  const { symbol, crypto } = useParams<SymbolParams>();
  const [name, setName] = useState<NameObject>();

  useEffect(() => {
    if (crypto) {
      setName({ name: symbol });
      return;
    }
    fetch(`/api/info/${symbol}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => {
        setName(response);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [crypto, symbol]);

  return (
    <Grid item xs={12} sx={{ mt: 4, ml: 4, mr: 4 }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 1080,
        }}
      >
        {symbol ? (
          <>
            {name && (
              <Typography
                component="div"
                variant="h4"
                color="primary"
                sx={{ marginLeft: "10vw", marginRight: "auto" }}
              >
                {name.name}
              </Typography>
            )}
            <CandlestickGraph
              stock={symbol}
              crypto={crypto ? true : false}
              width={1080}
              height={380}
            />
            <NewsList symbol={symbol} crypto={crypto ? true : false} />
          </>
        ) : (
          <Typography component="h2" variant="h6" color="primary">
            Not Found
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default SingleName;
