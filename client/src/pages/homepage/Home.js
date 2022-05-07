import { useState, useEffect, useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillForward, AiFillBackward } from "react-icons/ai";
import { sliderData } from "./data";
import "../../components/Navigation_Bar/NavigationBar.css";
import { Button } from "@material-ui/core";
import ScrollToTop from "../../components/Scroll/ScrollToTop";

// import {Link} from "react-router-dom";

import axios from "axios";
import BookCard from "../../components/BookCard";
import { Grid } from "@mui/material";

const getAllProducts = async () => {
  try{
      const res = await axios.get("http://localhost:5001/api/products");
      console.log(res.data);
      return res.data;
  } catch (err){}
};

const getSaleProducts = async () => {
  try{
      const res = await axios.get("http://localhost:5001/api/products?sale=true");
      console.log(res.data);
      return res.data;
  } catch (err){}
}

const getTopProducts = async () => {
  try{
      const res = await axios.get("http://localhost:5001/api/products?top=10");
      console.log(res.data);
      return res.data;
  } catch (err){}
}

/*const allProducts = getAllProducts();*/
const saleProducts = getSaleProducts();
const topProducts = getTopProducts();

const HomePage = () => {

<<<<<<< HEAD
=======
  const goallproducts = useRef(null);
  const gomoststarts = useRef(null);
  const gocampaign = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };



>>>>>>> 52119ad (homepage and profile page final updates set up)
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentSlide2, setCurrentSlide2] = useState(1);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let slideInterval2;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  const nextSlide2 = () => {
    setCurrentSlide2(currentSlide2 === slideLength - 1 ? 0 : currentSlide2 + 1);
    console.log("next");
  };

  const prevSlide2 = () => {
    setCurrentSlide2(currentSlide2 === 0 ? slideLength - 1 : currentSlide2 - 1);
    console.log("prev");
  };

  const moveDot = (index) => {
    setCurrentSlide(index);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function auto2() {
    slideInterval2 = setInterval(nextSlide2, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    setCurrentSlide2(0);
  }, []);

 
 
  
  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);


  useEffect(() => {
    if (autoScroll) {
      auto2();
    }
    return () => clearInterval(slideInterval2);
  }, [currentSlide2]);

  return (
    <div className="total">
      <ScrollToTop />

      <div className="some-container">


      <Button onClick={() => scrollToSection(goallproducts)} className="btn">Go To All Products</Button>
      <Button onClick={() => scrollToSection(gomoststarts)} className="btn2">Go To Most Stars</Button>
      <Button onClick={() => scrollToSection(gocampaign)} className="btn3">Go To In Campaign</Button>

      </div>

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

      <br/>
      <br/>

      <div className="slider2">

        <AiFillBackward className="arrow prev" onClick={prevSlide2} />
        <AiFillForward className="arrow next" onClick={nextSlide2} />
        {sliderData.map((slide, index) => {
          return (
            <div
              className={index === currentSlide2 ? "slide current" : "slide2"}
              key={index}
            >
              {index === currentSlide2 && (
                <div>
                  <img src={slide.image} alt="slide" className="image" />
                  <div className="content">
                    <p>CAMPAIGN PRODUCTS</p>
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
      </div>

      <br/>
      <br/>

      <div class="upper-container2" ref={goallproducts}>
        <p style = {{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 40, color: "white"}}>
          All Products
        </p>
      </div>

      <Grid container direction="row" justifyContent="space-around">
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme2" author="author2" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme3" author="author3" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme4" author="author4" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme5" author="author5" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
      </Grid>

      <div class="upper-container2" ref={gomoststarts}>
        <p style = {{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 40, color: "white"}}>
          MOST STARS
        </p>
      </div>

      <Grid container direction="row" justifyContent="space-around">
        <BookCard name="deneme1" author="author1" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme2" author="author2" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme3" author="author3" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme4" author="author4" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
        <BookCard name="deneme5" author="author5" imgurl="/images/animalfarm.jpg" publisher="yayınevi" price="87.99 TL" score="3.7/5.0"></BookCard>
      </Grid>

      <div class="upper-container2" ref={gocampaign}>
        <p style = {{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 40, color: "white"}}>
          IN CAMPAIGN
        </p>
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
