import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import CandlestickGraph from "./CandlestickGraph";

type SymbolParams = {
  symbol: string;
  crypto: string;
};

type NewsObject = {
  headline: string;
  image: string;
  source: string;
  summary: string;
  id: number;
  url: string;
};

const SingleName: React.FC = () => {
  const { symbol, crypto } = useParams<SymbolParams>();
  const [news, setNews] = useState<NewsObject[]>();

  useEffect(() => {
    if (crypto) return;
    fetch(`/api/news/${symbol}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => setNews(response))
      .catch(() => {
        //console.log(err);
      });
  }, [crypto, symbol]);

  const createNewsList = () => {
    if (!news) {
      return;
    }
    return news.map((entryNum) => {
      return (
        <>
          <ButtonBase target="_blank" href={entryNum.url}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={entryNum.image} />
              </ListItemAvatar>
              <ListItemText
                primary={`${entryNum.source} - ${entryNum.headline}`}
                secondary={entryNum.summary}
              />
            </ListItem>
          </ButtonBase>
          <Divider variant="middle" component="li" />
        </>
      );
    });
  };

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
        <CandlestickGraph
          stock={symbol}
          crypto={crypto ? true : false}
          width={1080}
          height={380}
        />
        <List>{createNewsList()}</List>
      </Paper>
    </Grid>
  );
};

export default SingleName;
