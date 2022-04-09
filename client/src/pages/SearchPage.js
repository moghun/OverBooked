import { Box, Button, Card, Grid } from "@mui/material";
import React from "react";
import BookCard from "../components/BookCard";

const SearchPage = () => {
  return (
    <div>
      <Grid
        container
        padding="40px"
        justifyContent="space-around"
      > {/* Main grid */}
        <Grid item xs={3} justifyContent="space-around" display="flex">
          {/* Filtering card part (left) */}
          <Card direction="column" justifyContent="center" display="flex" style={{ minWidth: "300px" }}>
            <Box justifyContent="center" display="flex">deneme</Box>
          </Card>
        </Grid>
        <Grid item container xs={9} justifyContent="space-around" display="flex">
          {/* Results of search and outcome of filters (right) */}
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        </Grid>
        {/* TODO: Create a map function to Grid items */}
      </Grid>
    </div>
  );
};

export default SearchPage;
