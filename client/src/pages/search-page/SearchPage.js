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
import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard";
import { useLocation } from "react-router-dom";


function avgrating(items) {
  var totalrate = 0;
  for (var i = 0; i < items.rating.length; i++) {
    totalrate += items.rating[i].rating;
  }

  if (isNaN(totalrate / items.rating.length)) {
    return 0;
  }
  return (totalrate / items.rating.length).toFixed(1);
}


function SearchPage() {
  const location = useLocation();
  const searchQuery = useMemo(() => location.pathname.split("/")[2]);
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState(0);
  const [includeBook, setIncludeBook] = useState(false);
  const [includeComic, setincludeComic] = useState(false);
  const [includeMagazine, setIncludeMagazine] = useState(false);


  useEffect(() => {
    console.log(searchQuery);
    const findProduct = async (query) => {
      try{
        var res;
        if(query === ""){
          res = await axios.get("http://localhost:5001/api/products");
        } else{
          res = await axios.get("http://localhost:5001/api/products/find?q="+query);
        }
          
          setSearchResults(res.data);
          console.log(searchResults);
          //return res.data;
      } catch (err){}
  }
  findProduct(searchQuery);
  }, []);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortByFilter = (arr) => {
    if (filter === 1){
      return arr.sort((a, b) => (a.cost < b.cost ? 1 : -1));
    } else if (filter === 2){
      return arr.sort((a, b) => (a.cost > b.cost ? 1 : -1));
    } else {
      return arr;
    }
  }

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
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="space-around" display="flex">
            {/* Results of search and outcome of filters (right) */}
            {sortByFilter(searchResults).map((book) => (
              <BookCard 
              onclick={book._id}
              name={book.name}
              author={book.author}
              imgurl={book.img}
              publisher={book.publisher}
              price={book.cost}
              score={avgrating(book)}></BookCard>
            ))}
          </Grid>
          {/* TODO: Create a map function to Grid items */}
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchPage;
