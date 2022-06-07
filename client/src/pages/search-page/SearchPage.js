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
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState(0);
  const [catFilter, setCatFilter] = useState([]);
  const [includeBook, setIncludeBook] = useState(false);
  const [includeComic, setincludeComic] = useState(false);
  const [includeMagazine, setIncludeMagazine] = useState(false);

  useEffect(() => {
    const findProduct = async (query) => {
      try {
        var res;
        if (query === "") {
          res = await axios.get("http://localhost:5001/api/products");
        } else {
          res = await axios.get(
            "http://localhost:5001/api/products/find?q=" + query
          );
        }

        setSearchResults(res.data);
        //return res.data;
      } catch (err) {}
    };
    findProduct(searchQuery);
  }, []);

  useEffect(() => {
    searchResults.map((product) => {
      if (!categories.includes(product.category)) {
        var newArr = categories.slice();
        newArr.push(product.category);
        setCategories(newArr);
      }
    });
  }, [searchResults, categories]);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortByFilter = (arr) => {
    if (catFilter.length > 0) {
      arr = arr.filter(function (product) {
        return catFilter.includes(product.category);
      });
    }
    if (filter === 1) {
      return arr.sort((a, b) => (a.cost < b.cost ? 1 : -1));
    } else if (filter === 2) {
      return arr.sort((a, b) => (a.cost > b.cost ? 1 : -1));
    } else if (filter === 3) {
      return arr.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (filter === 4) {
      return arr.sort((a, b) => (a.name < b.name ? 1 : -1));
    } else {
      return arr;
    }
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
            subheader={<ListSubheader>Categories</ListSubheader>}
            dense={true}
          >
            {categories.map((cat) => (
              <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    id={cat}
                    tabIndex={-1}
                    disableRipple
                    onChange={(event) => {
                      if (event.target.checked) {
                        setCatFilter(catFilter.concat([event.target.id]));
                      } else {
                        var newArr = catFilter.slice();
                        var index = newArr.indexOf(event.target.id);
                        if (index > -1) {
                          newArr.splice(index, 1);
                        }
                        setCatFilter(newArr);
                      }
                    }}
                  ></Checkbox>
                </ListItemIcon>
                <ListItemText primary={cat} />
              </ListItem>
            ))}
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
                <MenuItem value={3}>Name ascending (A-Z)</MenuItem>
                <MenuItem value={4}>Name descending (Z-A)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="space-around" display="flex">
            {/* Results of search and outcome of filters (right) */}
            {sortByFilter([...searchResults]).map((book) => (
              <BookCard
                id={book._id}
                name={book.name}
                amount={book.amount}
                author={book.author}
                imgurl={book.img}
                publisher={book.publisher}
                price={book.cost}
                score={avgrating(book)}
                beforeprice={book.before_sale_price}
              ></BookCard>
            ))}
          </Grid>
          {/* TODO: Create a map function to Grid items */}
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchPage;
