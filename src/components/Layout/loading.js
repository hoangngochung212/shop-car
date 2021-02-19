import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import logo from "../../assets/shop-logo.png";

const useStyles = makeStyles((theme) => ({
  loading: {
    position: "fixed",
    // left: 0,
    // right: 0,
    // top: "calc(50% - 20px)",
    // margin: "auto",
    // height: "40px",
    // width: "40px",
    "& img": {
      position: "absolute",
      height: "26px",
      width: "auto",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
    },
  },
}));

const Loading = (props) => {
  const classes = useStyles();

  return (
    <div className={`backdrop ${classes.loading}`}>
      <img src={logo} alt="" />
      <CircularProgress />
    </div>
  );
};

export default Loading;
