import { useState } from "react";
import {
  Drawer,
  List,
  Toolbar,
  Divider,
  ListItem,
  Typography,
  TextField,
} from "@mui/material";

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
      return (
        <div key={`${ticker}_h`}>
          <ListItem>
            <Typography variant="h6" component="div">
              {ticker}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              color="green"
              sx={{ marginLeft: "auto" }}
            >
              2.0%
            </Typography>
          </ListItem>
          <Divider />
        </div>
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
