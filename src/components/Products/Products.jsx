import React from "react";
import { Container, Grid } from "@material-ui/core";
import Product from "./Product/Product";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    maxWidth: "100%",
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  root: {
    flexGrow: 1,
  },
}));

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Container fixed>
        <div className={classes.toolbar} />
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
};
export default Products;
