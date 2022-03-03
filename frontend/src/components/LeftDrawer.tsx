import {
  Drawer,
  List,
  Toolbar,
  Divider,
  ListItem,
  Typography,
} from "@mui/material";

interface LeftDrawerProps {
  open: boolean;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({ open }) => {
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
      <List>
        <ListItem>
          <Typography variant="h6" component="div">
            SPY
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
