import { useState } from "react";
import DrawerCard from "./DrawerCard";
import { Drawer, List, Toolbar, Divider, TextField } from "@mui/material";

interface LeftDrawerProps {
  open: boolean;
  tickerList: string[];
  handleSubmit: (ticker: string) => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({
  open,
  tickerList,
  handleSubmit,
}) => {
  const [input, setInput] = useState("");
  const createList = () => {
    return tickerList.map((ticker) => {
      return <DrawerCard key={`${ticker}_h`} stock={ticker} />;
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
        label="Enter Ticker"
        id="search-bar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ m: 1 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(input);
            setInput("");
          }
        }}
      />
    </Drawer>
  );
};

export default LeftDrawer;
