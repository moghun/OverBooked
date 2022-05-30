import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container, Grid, Link } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { CardActionArea } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";

export default function BookCard(props) {
  const currUser = useSelector((state) => state.user.currentUser);
  const [fav, setFav] = React.useState(false);

  return (
    <Card
      sx={{
        width: "220px",
        height: "330px",
        underline: "none",
        padding: "5px",
        margin: "20px",
        transition: ".3s ease",
        ":hover": { boxShadow: 20 },
      }}
    >
      <Container sx={{ padding: "0px", marginBottom: "-30px", marginLeft: "158px" }}>
        {fav && (
          <IconButton
            onClick={() => {
              setFav(!fav);
            }}
            style={{ padding: "0px", color: "red" }}
          >
            <Favorite></Favorite>
          </IconButton>
        )}
        {!fav && (
          <IconButton
            onClick={() => {
              setFav(!fav);
            }}
            style={{ padding: "0px", color: "red" }}
          >
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </IconButton>
        )}
      </Container>
      <Link
        href={"/productpage/" + props.id}
        underline="none"
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          height="170"
          image={props.imgurl}
          alt="book picture"
          style={{ objectFit: "contain" }}
        />
        <CardContent
          sx={{
            justifyContent: "space-around",
            display: "flex",
            height: "165px",
          }}
        >
          <Grid
            container
            spacing={0}
            margin="-15px"
            direction="column"
            flex="1"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item>
              <Typography
                gutterBottom
                underline="none"
                variant="body1"
                component="div"
                marginBottom="0px"
                textAlign="center"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {props.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="darkblue"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }}
              >
                {props.author}
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-around"
              alignItems="center"
              marginTop="-3px"
            >
              <Grid item>
                <Typography
                  maxWidth="130px"
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {props.publisher}
                </Typography>
              </Grid>
              <Grid item>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {props.score}
                    <StarIcon style={{ marginTop: "-4px", color: "gold" }} />
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <>
              {props.amount === 0 ? (
                <Typography color="red">Sold Out</Typography>
              ) : props.beforeprice !== -1 ? (
                <Grid item>
                  <Typography
                    sx={{ textDecorationLine: "line-through", color: "red" }}
                  >
                    {props.beforeprice} $
                  </Typography>
                </Grid>
              ) : (
                <></>
              )}
            </>

            <Grid item>
              <Typography>{props.price} $</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Link>
    </Card>
  );
}
