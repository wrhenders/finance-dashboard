import { useState, useEffect } from "react";
import { Divider, ListItem, Typography } from "@mui/material";

interface DrawerCardProps {
  stock: string;
  crypto: boolean;
}

interface StockData {
  current: number;
  prevClose: number;
}

const initialState: StockData = {
  current: 0,
  prevClose: 0,
};

interface CryptoData {
  timestamp: number[];
  close: number[];
  high: number[];
  low: number[];
  open: number[];
  initial: number;
}
const initialCryptoState: CryptoData = {
  timestamp: [],
  close: [],
  high: [],
  low: [],
  open: [],
  initial: 0,
};

const DrawerCard: React.FC<DrawerCardProps> = ({ stock, crypto }) => {
  const [currentData, setCurrentData] = useState<StockData>(Object);
  const [currentCryptoData, setCurrentCryptoData] =
    useState<CryptoData>(initialCryptoState);

  useEffect(() => {
    const url = crypto
      ? `/api/candle/crypto/${stock}`
      : `/api/current/${stock}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) =>
        crypto ? setCurrentCryptoData(response) : setCurrentData(response)
      )
      .catch((err) => {
        console.log(err);
      });
  }, [crypto, stock]);
  let valueDiff: number;
  let currentGain: number;
  if (currentData.current) {
    valueDiff = currentData.current - currentData.prevClose;
    currentGain = (valueDiff / currentData.prevClose) * 100;
  } else {
    valueDiff =
      currentCryptoData.close[currentCryptoData.close.length - 1] -
      currentCryptoData.initial;
    currentGain = (valueDiff / currentCryptoData.initial) * 100;
  }

  return (
    <>
      <ListItem sx={{ display: "flex" }}>
        <Typography variant="h6" component="div">
          {stock}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          color={currentGain > 0 ? "green" : "red"}
          sx={{ marginLeft: "auto" }}
        >
          {valueDiff.toFixed(2)} {currentGain.toFixed(2)}%
        </Typography>
      </ListItem>
      <Divider />
    </>
  );
};

export default DrawerCard;
