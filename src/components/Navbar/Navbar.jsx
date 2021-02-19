import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/shop-logo.png";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 0;
const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    height: "52px",
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },
  image: {
    marginRight: "10px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none !important",
    },
  },
}));

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Container fixed style={{ height: "100%" }}>
          <Box display="flex" alignItems="center" height="100%">
            <Typography variant="h6" className={classes.title} color="inherit">
              <Link to="/" className={classes.link}>
                <img
                  src={logo}
                  alt=""
                  height="25px"
                  className={classes.image}
                />
                <span style={{ color: "#000" }}> Shop Car </span>
              </Link>
            </Typography>
            <div className={classes.grow} />

            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart item"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
