import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

interface ButtonAppBarProps {
  toggleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonAppBar: React.FC<ButtonAppBarProps> = ({ toggleOpen }) => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Button component={Link} to={"/"} sx={{ textTransform: "none" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Finance Dashboard
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default ButtonAppBar;
