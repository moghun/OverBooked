import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "../product-view/data";
import "../../components/Navigation_Bar/NavigationBar.css";
// import {Link} from "react-router-dom";

import axios from "axios";
import BookCard from "../../components/BookCard";
import { Grid } from "@mui/material";
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  const moveDot = (index) => {
    setCurrentSlide(index);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const getBooks = async () => {
    await axios
      .get("http://localhost:5001/api/users")
      .then((res) => {
        console.log("aa");
        console.log(res.data);
        const data = res.data;
        let bookList = [];
        /*         data.forEach(uni => {
        courseList = courseList.concat(...uni.courses)
      }); */

        console.log(bookList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBooks();
  });

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div>
      <div className="slider">
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
        {sliderData.map((slide, index) => {
          return (
            <div
              className={index === currentSlide ? "slide current" : "slide"}
              key={index}
            >
              {index === currentSlide && (
                <div>
                  <img src={slide.image} alt="slide" className="image" />
                  <div className="content">
                    <h2>{slide.heading}</h2>
                    <p>{slide.desc}</p>
                    <hr />
                    <form action="\productpage" method="get">
                      <button className="--btn --btn-primary">
                        Go To This Product{" "}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="container-dots">
          {Array.from({ length: 3 }).map((item, index) => (
            <div
              onClick={() => moveDot(index + 1)}
              className={currentSlide === index + 1 ? "dot active" : "dot"}
            ></div>
          ))}
        </div>
      </div>
      <Grid container direction="row" justifyContent="space-around">
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme2" author="author2" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme3" author="author3" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme4" author="author4" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme5" author="author5" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
      </Grid>
    </div>
  );
};

export default HomePage;
