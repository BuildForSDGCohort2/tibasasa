import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon, Close } from "@material-ui/icons";
import NavItems from "./NavItems";
import firebase from "../lib/firebase";
import { SnackbarContext } from "../App";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  toolbar: {
    justifyContent: "end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
    },
  },
  roundedHolder: {
    borderRadius: 100,
    height: "4em",
  },
  navLink: {
    color: "#000",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      color: "#FFF",
    },
  },
  list: {
    width: 250,
    fontFamily: `'Secular One', 'Arial', sans-serif`,
  },
  closeButton: {
    marginLeft: "auto",
  },
  icons: {
    display: "grid",
    gap: "1em",
    gridTemplateColumns: "auto auto",
    marginLeft: "auto",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { setSnackbar } = useContext(SnackbarContext);

  const history = useHistory();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.target);
  };

  const signOut = async () => {
    try {
      await firebase.logout();
      history.replace("/login");
      setSnackbar({
        message: "Signed out successfully!",
        open: true,
        color: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Container>
          <Toolbar className={classes.toolbar}>
            <Hidden mdUp>
              <Link to="/">
                <Button>TibaSasa</Button>
              </Link>
            </Hidden>
            <div className={classes.icons}>
              <IconButton
                className={classes.navLink}
                aria-owns={open ? "account-options" : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Hidden mdUp>
                <IconButton
                  color="inherit"
                  className={classes.navLink}
                  onClick={(e) => setOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </div>

            <Menu
              id="account-options"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link
                  to="/userinfo"
                  style={{ color: "unset", textDecoration: "none" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer open={open} anchor="right" onClose={(e) => setOpen(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={(e) => setOpen(false)}
          onKeyDown={(e) => setOpen(false)}
          className={classes.list}
        >
          <Grid container justify="flex-end">
            <IconButton>
              <Close />
            </IconButton>
          </Grid>
          <NavItems />
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;
