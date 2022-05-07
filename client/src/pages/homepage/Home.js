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


const HomePage = () => {


  const [allsale, setallsale] = useState([]);
  const [topprod, settopprod] = useState([]);

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
        setallsale(res.data);
        console.log(res.data);
        return res.data;
    } catch (err){}
  }
  
  const getTopProducts = async () => {
    try{
        const res = await axios.get("http://localhost:5001/api/products?top=10");
        settopprod(res.data);
        console.log(res.data);
        return res.data;
    } catch (err){}
  }
  
  getAllProducts();
  getSaleProducts();
  getTopProducts();





  const goallproducts = useRef(null);
  const gomoststarts = useRef(null);
  const gocampaign = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };



  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentSlide2, setCurrentSlide2] = useState(1);
  const slideLength = allsale.length;
  const slideLength2 = topprod.length;

  const autoScroll = true;
  const autoScroll2 = true;
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
    setCurrentSlide2(currentSlide2 === slideLength2 - 1 ? 0 : currentSlide2 + 1);
    console.log("next");
  };

  const prevSlide2 = () => {
    setCurrentSlide2(currentSlide2 === 0 ? slideLength2 - 1 : currentSlide2 - 1);
    console.log("prev");
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
    if (autoScroll2) {
      auto2();
    }
    return () => clearInterval(slideInterval2);
  }, [currentSlide2]);

  return (
    <div className="total">
      <ScrollToTop />

      <div className="some-container">

      <Button onClick={() => scrollToSection(gomoststarts)} className="btn">Go To Most Stars</Button>
      <Button onClick={() => scrollToSection(gocampaign)} className="btn3">Go To In Campaign</Button>

      </div>

      <div className="slider">

        <AiFillBackward className="arrow prev" onClick={prevSlide} />
        <AiFillForward className="arrow next" onClick={nextSlide} />
        {allsale.map((slide, index) => {
          return (
            <div
              className={index === currentSlide ? "slide current" : "slide"}
              key={index}
            >
              {index === currentSlide && (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={slide.img} alt="slide"/>
                  <div className="content">
                    <p>MOST STARS PRODUCTS</p>
                    <h2>{slide.name}</h2>
                    <p>{slide.description}</p>
                    <hr />
                    <form action={"/productpage/" + slide._id} method="get">
                      <button className="--btn --btn-primary">
                        Go To This Product
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

      <div className="slider2">

        <AiFillBackward className="arrow prev" onClick={prevSlide2} />
        <AiFillForward className="arrow next" onClick={nextSlide2} />
        {topprod.map((slide, index) => {
          return (
            <div
              className={index === currentSlide2 ? "slide current" : "slide"}
              key={index}
            >
              {index === currentSlide2 && (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={slide.img} alt="slide"/>
                  <div className="content">
                    <p>{slide.name}</p>
                    <hr />
                    <form action={"/productpage/" + slide._id} method="get">
                      <button className="--btn --btn-primary">
                        Go To This Product
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

      <div class="upper-container2" ref={gomoststarts}>
        <p style = {{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 40, color: "white"}}>
          MOST STARS
        </p>
      </div>

      <Grid container direction="row" justifyContent="space-around">
        {

          
        allsale.map((AllSales)=>(


          <BookCard onclick = {AllSales._id} name = {AllSales.name} author = {AllSales.author} imgurl = {AllSales.img} publisher = {AllSales.publisher} price = {AllSales.cost}></BookCard>




        ))
        }
      </Grid>

      <div class="upper-container2" ref={gocampaign}>
        <p style = {{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 40, color: "white"}}>
          IN CAMPAIGN
        </p>
      </div>

      <Grid container direction="row" justifyContent="space-around">
        {

          
        topprod.map((AllSales)=>(


          <BookCard onclick = {AllSales._id} name = {AllSales.name} author = {AllSales.author} imgurl = {AllSales.img} publisher = {AllSales.publisher} price = {AllSales.cost}></BookCard>




        ))
        }
      </Grid>

    </div>
  );
};

export default HomePage;
