import { useState, useEffect } from "react";
import { Divider, ListItem, Typography } from "@mui/material";

interface DrawerCardProps {
  stock: string;
}

interface StockData {
  current: number;
  prevClose: number;
}

const initialState: StockData = {
  current: 0,
  prevClose: 0,
};

const DrawerCard: React.FC<DrawerCardProps> = ({ stock }) => {
  const [currentData, setCurrentData] = useState(initialState);

  useEffect(() => {
    fetch(`/api/current/${stock}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Stock not found");
        }
        return response;
      })
      .then((response) => response.json())
      .then((response) => setCurrentData(response))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const valueDiff = currentData.current - currentData.prevClose;
  const currentGain = (valueDiff / currentData.prevClose) * 100;

  return (
    <>
      {currentGain > 0 ? (
        <ListItem sx={{ display: "flex" }}>
          <Typography variant="h6" component="div">
            {stock}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            color="green"
            sx={{ marginLeft: "auto" }}
          >
            {valueDiff.toFixed(2)} {currentGain.toFixed(2)}%
          </Typography>
        </ListItem>
      ) : (
        <ListItem sx={{ display: "flex" }}>
          <Typography variant="h6" component="div" align="left">
            {stock}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            color="red"
            sx={{ marginLeft: "auto" }}
          >
            {valueDiff.toFixed(2)} {currentGain.toFixed(2)}%
          </Typography>
        </ListItem>
      )}
      <Divider />
    </>
  );
};

export default DrawerCard;
