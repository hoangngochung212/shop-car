import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyle from "./style";
import Fade from "react-reveal/Fade";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyle();
  console.log(product);
  return (
    <Fade top>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cardMedia}
          image={product.media.source}
          title={product.name}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: "600" }}>
              {product.name}
            </Typography>
          </div>
          <div className={classes.cardContent}>
            <Typography
              className="description"
              dangerouslySetInnerHTML={{ __html: product.description }}
              variant="body2"
              color="textSecondary"
            />
          </div>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </CardContent>

        <CardActions disableSpacing className={classes.cardActions}>
          <Button
            color="secondary"
            component={Link}
            to={`/product/${product.id}`}
          >
            Detail
          </Button>
          <IconButton
            aria-label="Add to Cart"
            onClick={(event) => onAddToCart(event, product.id, 1)}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </Fade>
  );
};

export default Product;
