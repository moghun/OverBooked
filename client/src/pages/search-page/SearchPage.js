import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  ListSubheader,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import BookCard from "../../components/BookCard";

function SearchPage() {
  const [filter, setFilter] = useState(0);
  const [includeBook, setIncludeBook] = useState(false);
  const [includeComic, setincludeComic] = useState(false);
  const [includeMagazine, setIncludeMagazine] = useState(false);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Grid container margin="50px">
        <Grid
          item
          xs={2}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          padding="20px"
          sx={{ border: 1, borderColor: "lightgray" }}
        >
          <Button>Remove filters</Button>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            subheader={<ListSubheader>Categories</ListSubheader>} dense={true}
          >
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary="Book" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary="Comic" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary="Magazine" />
            </ListItem>
          </List>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            subheader={<ListSubheader>Sub-Categories</ListSubheader>} dense={true}
          >
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={true}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary="Novel" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary="Poem" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary="Science" />
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          container
          xs={10}
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          {/* Main grid */}
          <Grid
            item
            container
            justifySelf="center"
            maxWidth="600px"
            flexDirection="row"
            justifyContent="space-around"
          >
            <FormControl variant="standard" sx={{ minWidth: "220px" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Filter by
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filter}
                onChange={onFilterChange}
              >
                <MenuItem value={0}>No filter</MenuItem>
                <MenuItem value={1}>Price descending</MenuItem>
                <MenuItem value={2}>Price ascending</MenuItem>
                <MenuItem value={3}>Rating descending</MenuItem>
                <MenuItem value={4}>Rating ascending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="space-around" display="flex">
            {/* Results of search and outcome of filters (right) */}
            <BookCard
              name="deneme1"
              author="author1"
              imgurl="/images/animalfarm.jpg"
              publisher="yayınevi"
              price="87.99 TL"
              score="3.7/5.0"
            ></BookCard>
            <BookCard
              name="deneme1"
              author="author1"
              imgurl="/images/animalfarm.jpg"
              publisher="yayınevi"
              price="87.99 TL"
              score="3.7/5.0"
            ></BookCard>
            <BookCard
              name="deneme1"
              author="author1"
              imgurl="/images/animalfarm.jpg"
              publisher="yayınevi"
              price="87.99 TL"
              score="3.7/5.0"
            ></BookCard>
            <BookCard
              name="deneme1"
              author="author1"
              imgurl="/images/animalfarm.jpg"
              publisher="yayınevi"
              price="87.99 TL"
              score="3.7/5.0"
            ></BookCard>
            <BookCard
              name="deneme1"
              author="author1"
              imgurl="/images/animalfarm.jpg"
              publisher="yayınevi"
              price="87.99 TL"
              score="3.7/5.0"
            ></BookCard>
            <BookCard
              name="deneme1"
              author="author1"
              imgurl="/images/animalfarm.jpg"
              publisher="yayınevi"
              price="87.99 TL"
              score="3.7/5.0"
            ></BookCard>
            <BookCard
              name="deneme1"
              author="author1"
              imgurl="/images/animalfarm.jpg"
              publisher="yayınevi"
              price="87.99 TL"
              score="3.7/5.0"
            ></BookCard>
          </Grid>
          {/* TODO: Create a map function to Grid items */}
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchPage;
