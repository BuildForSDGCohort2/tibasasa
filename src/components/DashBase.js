import React from "react";
import { Route, Link, useHistory } from "react-router-dom";
import { Box, Container, Grid, Hidden, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import NavItems from "./NavItems";
import Firebase from "../lib/firebase";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  sideNav: {
    background: "rgba(100,32,47,0.10)",
  },
  sideNavImg: {
    borderRadius: "100%",
    height: "5em",
  },
  sideNavContainer: {
    height: "100%",
    maxWidth: "25%",
    position: "fixed",
  },
  listItem: {
    color: "#FAFAFA",
  },
  listItemIcon: {
    color: "#FAFAFA",
  },
  main: {
    background: "#FFF",
  },
}));

const DashBase = () => {
  const classes = useStyles();

  const history = useHistory();

  if (!Firebase.getCurrentUser()) {
    // not logged in
    console.error("Please login first");
    history.replace("/login");
    return null;
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Navbar />
        {/**Side Navigation; hidden on mobile devices */}
        <Hidden smDown>
          <Grid item className={classes.sideNav} md={3}>
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.sideNavContainer}
            >
              <Grid item md={8}>
                <Grid container justify="center">
                  <img
                    src="/logo192.png"
                    className={classes.sideNavImg}
                    alt="logo"
                  />
                </Grid>
                <Box mt="2em">
                  <List>
                    <NavItems />
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        {/** Main Content */}
        <Grid item xs={12} md={9} className={classes.main}>
          <Box mt="5.5em">
            <Container>
              <Route path="/" exact component={Dashboard} />
              {/**
               * TODO
              <Route path="/doctors" exact component={Doctors} />
              <Route path="/symptoms" exact component={Symptoms} />
               * 
               */}
            </Container>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DashBase;
