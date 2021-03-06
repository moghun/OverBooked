import { useState, useEffect, useRef } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillForward,
  AiFillBackward,
} from "react-icons/ai";
import "../../components/Navigation_Bar/NavigationBar.css";
import { Button } from "@material-ui/core";
import ScrollToTop from "../../components/Scroll/ScrollToTop";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LeftArrow from "../homepage/left-arrow.svg";
import RightArrow from "../homepage/right-arrow.svg";

import axios from "axios";
import BookCard from "../../components/BookCard";
import { Grid } from "@mui/material";
import HomeMain1 from "./HomeMain1";

//in order to have sequence products with slider

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <img src={LeftArrow} alt="prevArrow" {...props} />
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <img src={RightArrow} alt="nextArrow" {...props} />
);

const mainProperties = {
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const carouselProperties = {
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const carouselProperties2 = {
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  dots: true,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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

const HomePage = () => {
  const [allsale, setallsale] = useState([]);
  const [topprod, settopprod] = useState([]);
  const [allprod, settallprod] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      settallprod(res.data);
      return res.data;
    } catch (err) {}
  };

  const getSaleProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/products?sale=true"
      );
      setallsale(res.data);
    } catch (err) {}
  };

  const getTopProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products?top=10");
      settopprod(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    getAllProducts();
    getSaleProducts();
    getTopProducts();
  }, []);

  const goallproducts = useRef(null);
  const gomoststarts = useRef(null);
  const gocampaign = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const [currentSlide2, setCurrentSlide2] = useState(1);
  const slideLength2 = topprod.length;

  const autoScroll2 = true;
  let slideInterval2;
  let intervalTime = 5000;

  const nextSlide2 = () => {
    setCurrentSlide2(
      currentSlide2 === slideLength2 - 1 ? 0 : currentSlide2 + 1
    );
  };

  const prevSlide2 = () => {
    setCurrentSlide2(
      currentSlide2 === 0 ? slideLength2 - 1 : currentSlide2 - 1
    );
  };

  function auto2() {
    slideInterval2 = setInterval(nextSlide2, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide2(0);
  }, []);

  useEffect(() => {
    if (autoScroll2) {
      auto2();
    }
    return () => clearInterval(slideInterval2);
  }, [currentSlide2]);

  return (
    <div>
      <HomeMain1 />
      <div className="some-container">
        <Button
          onClick={() => scrollToSection(gomoststarts)}
          className="btn3"
          color="grey"
          style={{ marginRight: "10px" }}
        >
          Check Recent Products
        </Button>
        <Button
          onClick={() => scrollToSection(gocampaign)}
          className="btn3"
          color="grey"
          style={{ marginLeft: "10px" }}
        >
          Check Products on sale
        </Button>
      </div>

      <br />
      <br />

      <div style={{ margin: "30px" }} className="carousel">
        <Slider {...carouselProperties}>
          {allprod.map((AllSales) =>
            AllSales.amount === 0 || AllSales.img === "" ? (
              false
            ) : (
              <BookCard
                id={AllSales._id}
                name={AllSales.name}
                amount={AllSales.amount}
                author={AllSales.author}
                imgurl={AllSales.img}
                publisher={AllSales.publisher}
                price={AllSales.cost}
                score={avgrating(AllSales)}
                beforeprice={AllSales.before_sale_price}
              ></BookCard>
            )
          )}
        </Slider>
      </div>

      <br />
      <br />

      <div class="upper-container2" ref={gomoststarts}>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 40,
            color: "black",
          }}
        >
          RECENTLY ADDED PRODUCTS
        </p>
      </div>

      <div style={{ margin: "30px" }} className="carousel">
        <Slider {...carouselProperties2}>
          {topprod.map((AllSales) =>
            AllSales.amount === 0 || AllSales.img === "" ? (
              false
            ) : (
              <BookCard
                id={AllSales._id}
                name={AllSales.name}
                amount={AllSales.amount}
                author={AllSales.author}
                imgurl={AllSales.img}
                publisher={AllSales.publisher}
                price={AllSales.cost}
                score={avgrating(AllSales)}
                beforeprice={AllSales.before_sale_price}
              ></BookCard>
            )
          )}
        </Slider>
      </div>

      <div class="upper-container2" ref={gocampaign}>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 40,
            color: "black",
          }}
        >
          ON SALE
        </p>
      </div>

      <div style={{ margin: "30px" }} className="carousel">
        <Slider {...carouselProperties2}>
          {allsale.map((AllSales) => (
            <BookCard
              id={AllSales._id}
              name={AllSales.name}
              amount={AllSales.amount}
              author={AllSales.author}
              imgurl={AllSales.img}
              publisher={AllSales.publisher}
              price={AllSales.cost}
              score={avgrating(AllSales)}
              beforeprice={AllSales.before_sale_price}
            ></BookCard>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomePage;
