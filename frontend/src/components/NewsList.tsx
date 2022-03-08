import React, { useEffect, useState } from "react";
import {
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
} from "@mui/material";

interface NewsListProps {
  symbol: string;
  crypto: boolean;
}

type NewsObject = {
  headline: string;
  image: string;
  source: string;
  summary: string;
  id: number;
  url: string;
};

const NewsList: React.FC<NewsListProps> = ({ symbol, crypto }) => {
  const [news, setNews] = useState<NewsObject[] | null>();

  useEffect(() => {
    if (crypto) {
      setNews(null);
      return;
    }
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
      return <></>;
    }
    return news.map((entryNum) => {
      return (
        <React.Fragment key={entryNum.id}>
          <ButtonBase target="_blank" href={entryNum.url}>
            <ListItem alignItems="flex-start" key={entryNum.id}>
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
        </React.Fragment>
      );
    });
  };

  return <List>{createNewsList()}</List>;
};

export default NewsList;
