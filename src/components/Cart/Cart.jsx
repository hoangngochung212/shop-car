import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fade,
} from "@material-ui/core";
import CartItems from "./CartItems/CartItems";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {},
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cartDetails: {
    display: "flex",
    marginTop: "10%",
    marginBottom: "5%",
    flexWrap: "wrap",
    maxWidth: "100%",
    justifyContent: "space-between",
  },
}));

const Cart = ({
  cart,
  handleEmptyCart,
  handleRemoveCart,
  handleUpdateCart,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    handleEmptyCart();
    setOpen(false);
  };

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart. start adding some!
      <Link to="/" className={classes.link}>
        Start adding some!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
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
              Do you want to delete all shopping cart?
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
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItems
              item={item}
              handleRemoveCart={handleRemoveCart}
              handleUpdateCart={handleUpdateCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant="h4">
          Subtotal:{" "}
          <span style={{ color: "#ee3636" }}>
            {cart.subtotal.formatted_with_symbol}
          </span>
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            type="button"
            variant="contained"
            color="primary"
          >
            Check out
          </Button>
        </div>
      </div>
    </>
  );
  if (!cart.line_items) return "loading....";
  return (
    <Container style={{ marginTop: "64px" }}>
      <div className={classes.toolbar}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      </div>
    </Container>
  );
};

export default Cart;
