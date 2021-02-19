import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
  },
  w100: {
    width: "100%",
  },
  emptyButton: {
    minWidth: "120px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  text: {
    color: "#585555",
    padding: "0 16px",
    textAlign: "justify",
    letterSpacing: "1px",

    [theme.breakpoints.down("xs")]: {
      textIndent: "6px",
    },
    [theme.breakpoints.up("sm")]: {
      textIndent: "36px",
    },
    backgroundColor: "#bec6c7",
  },
  checkoutButton: {
    minWidth: "150px",
  },
  btn: {
    padding: "42px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
}));

const ProductDetail = ({ products, onAddToCart }) => {
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  let { productId } = useParams();
  const filterProduct = () => {
    const newProduct = products.filter((item) => item.id === productId);
    setProduct(newProduct[0]);
  };
  useEffect(() => {
    filterProduct();
  }, []);
  console.log(product);
  return (
    <div>
      {product && (
        <Container fixed style={{ marginTop: "64px" }}>
          <Button
            size="medium"
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            style={{ marginBottom: "24px" }}
          >
            Back
          </Button>
          <Card className={classes.card}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <img
                  src={product.media.source}
                  alt=""
                  className={classes.w100}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardContent>
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{ fontWeight: "600", paddingTop: "20px" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ color: "#ee3636", fontWeight: "600" }}
                  >
                    {product.price.formatted_with_symbol}
                  </Typography>
                  <Typography
                    className={classes.text}
                    variant="h6"
                    gutterBottom
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    color="primary"
                  ></Typography>
                  <div className={classes.btn}>
                    <Button
                      className={classes.emptyButton}
                      size="large"
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={(e) => onAddToCart(e, product.id, 1)}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      component={Link}
                      to="/checkout"
                      size="large"
                      className={classes.checkoutButton}
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={(e) => onAddToCart(e, product.id, 1)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default ProductDetail;
