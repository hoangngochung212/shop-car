import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Fade from "react-reveal/Fade";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
}));

const CartItems = ({ item, handleUpdateCart, handleRemoveCart }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    handleRemoveCart(item.id);
    setOpen(false);
  };
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Notice
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOk} color="secondary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Card>
        <CardMedia
          image={item.media.source}
          alt=""
          className={classes.media}
        ></CardMedia>
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h6">{item.name}</Typography>
          </div>
          <div className={classes.cardContent}>
            <Typography variant="h6" style={{ color: "#ee3636" }}>
              {item.line_total.formatted_with_symbol}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.cartActions}>
          <div className={classes.buttons}>
            <Button
              type="button"
              size="small"
              onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <Typography>{item.quantity}</Typography>
            <Button
              type="button"
              size="small"
              onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={handleClickOpen}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CartItems;
