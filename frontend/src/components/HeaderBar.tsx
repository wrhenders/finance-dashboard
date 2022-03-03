import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finance Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default ButtonAppBar;
