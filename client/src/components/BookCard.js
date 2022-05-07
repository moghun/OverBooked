import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { CardActionArea } from "@material-ui/core";

export default function BookCard(props) {
  return (
    <Card onClick={() => {}} sx={{ maxWidth: "350px", minWidth: "250px", padding: "15px", margin: "20px",  transition: ".3s ease", ':hover': {boxShadow: 20,}}}>
      <CardMedia
        component="img"
        height="200"
        image={props.imgurl}
        alt="book picture"
        style={{ objectFit: "contain" }}
      />
      <CardContent style={{ justifyContent: "center", display: "flex" }}>
        <Grid
          container
          spacing={0}
          margin="-25px"
          direction="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              paddingTop="10px"
              marginBottom="0px"
              textAlign="center"
            >
              {props.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="darkblue">
              {props.author}
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-around" alignItems="center">
            <Grid item>
              <Typography variant="subtitle2" color="text.secondary">
                {props.publisher}
              </Typography>
            </Grid>
            <Grid item>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {props.score}
                <StarIcon style={{ marginTop: "-4px", color: "gold"}} />
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="text.primary">
              {props.price} TL
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}