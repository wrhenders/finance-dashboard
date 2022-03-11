import { useState } from "react";
import DrawerCard from "./DrawerCard";
import { Drawer, List, Toolbar, Divider, TextField } from "@mui/material";

interface LeftDrawerProps {
  open: boolean;
  tickerList: string[];
  cryptoList: string[];
  handleSubmit: (ticker: string, crypto: boolean) => void;
  handleDelete: (ticker: string) => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({
  open,
  tickerList,
  cryptoList,
  handleSubmit,
  handleDelete,
}) => {
  const [input, setInput] = useState("");
  const [cryptoInput, setCryptoInput] = useState("");
  const createList = () => {
    return tickerList.map((ticker) => {
      return (
        <DrawerCard
          key={`${ticker}_h`}
          stock={ticker}
          crypto={false}
          handleDelete={handleDelete}
        />
      );
    });
  };
  const createCryptoList = () => {
    return cryptoList.map((ticker) => {
      return (
        <DrawerCard
          key={`${ticker}_c`}
          stock={ticker}
          crypto={true}
          handleDelete={handleDelete}
        />
      );
    });
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      PaperProps={{
        sx: { width: "240px" },
      }}
      transitionDuration={150}
    >
      <Toolbar />
      <Divider />
      <List>{createList()}</List>
      <TextField
        label="Enter Stock Ticker"
        id="search-bar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ m: 1 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(input, false);
            setInput("");
          }
        }}
      />
      <Divider />
      <List>{createCryptoList()}</List>
      <TextField
        label="Enter Crypto Ticker"
        id="crypto-search"
        value={cryptoInput}
        onChange={(e) => setCryptoInput(e.target.value)}
        sx={{ m: 1 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(cryptoInput, true);
            setCryptoInput("");
          }
        }}
      />
    </Drawer>
  );
};

export default LeftDrawer;
