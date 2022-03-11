import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  ListItem,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DrawerCardProps {
  stock: string;
  crypto: boolean;
  handleDelete: (ticker: string) => void;
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

const DrawerCard: React.FC<DrawerCardProps> = ({
  stock,
  crypto,
  handleDelete,
}) => {
  const [currentData, setCurrentData] = useState<StockData>(initialState);
  const [currentCryptoData, setCurrentCryptoData] =
    useState<CryptoData>(initialCryptoState);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const url = crypto
      ? `https://ryans-finance-dashboard.herokuapp.com/api/candle/crypto/${stock}`
      : `https://ryans-finance-dashboard.herokuapp.com/api/current/${stock}`;
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
        //console.log(err);
      });
  }, [crypto, stock]);

  const handleMouseOver = () => setShowButton(true);
  const handleMouseOut = () => setShowButton(false);

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
      <ListItem
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        sx={{ display: "flex" }}
      >
        <Button
          component={Link}
          to={crypto ? `/ticker/${stock}/true` : `/ticker/${stock}`}
          sx={{ textTransform: "none", paddingLeft: 0 }}
        >
          <Typography variant="h6" component="div">
            {stock}
          </Typography>
        </Button>
        {showButton ? (
          <IconButton
            onClick={(e) => handleDelete(stock)}
            size="small"
            sx={{ marginLeft: "auto" }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <Typography
            variant="h6"
            component="div"
            color={currentGain > 0 ? "green" : "red"}
            sx={{ marginLeft: "auto" }}
          >
            {valueDiff
              ? `${valueDiff.toFixed(2)} ${currentGain.toFixed(2)}%`
              : "Not Found"}
          </Typography>
        )}
      </ListItem>
      <Divider />
    </>
  );
};

export default DrawerCard;
