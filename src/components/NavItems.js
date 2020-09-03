import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  DashboardOutlined,
  HealingOutlined,
  LocalHospitalOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  listItemLight: {
    color: "#FAFAFA",
  },
});

const NavItems = (props) => {
  const classes = useStyles();

  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      icon: DashboardOutlined,
      to: "/",
      regex: new RegExp("^/$"),
    },
    {
      name: "See a Doctor",
      icon: LocalHospitalOutlined,
      to: "/doctors",
      regex: new RegExp("/doctors"),
    },
    {
      name: "Check my Symptoms",
      icon: HealingOutlined,
      to: "/symptoms",
      regex: new RegExp("/symptoms"),
    },
  ];

  return (
    <List>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <ListItem
            className={props.light ? classes.listItemLight : undefined}
            button
            selected={link.regex.test(location.pathname)}
          >
            <ListItemIcon
              className={props.light ? classes.listItemLight : undefined}
            >
              {<link.icon color="inherit" />}
            </ListItemIcon>
            <ListItemText primary={link.name} color="inherit" />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

NavItems.propTypes = {
  light: PropTypes.bool.isRequired,
};

export default NavItems;
