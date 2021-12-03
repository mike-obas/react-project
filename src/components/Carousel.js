import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import PageLoaderHandler from "../utils/PageLoaderHandler";
import useStyles from "../styles/Carousel";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function CarouselComponent() {
const theme = useTheme();
const smallScreen = useMediaQuery(theme.breakpoints.down(600));
  var items = [
    {
      src: smallScreen
        ? "images/carousel/carouselM1.jpg"
        : "images/carousel/carousel1.jpg",
      href: "televisions",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM2.jpg"
        : "images/carousel/carousel2.jpg",
      href: "refrigerators",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM3.jpg"
        : "images/carousel/carousel3.jpg",
      href: "commercial_oven",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM4.jpg"
        : "images/carousel/carousel4.jpg",
      href: "lentz",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM5.jpg"
        : "images/carousel/carousel5.jpg",
      href: "kitchen_rack",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM6.jpg"
        : "images/carousel/carousel6.jpg",
      href: "microwave_oven",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM7.jpg"
        : "images/carousel/carousel7.jpg",
      href: "commercial_cookers",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM8.jpg"
        : "images/carousel/carousel8.jpg",
      href: "blenders",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM9.jpg"
        : "images/carousel/carousel9.jpg",
      href: "home_theatre",
    },
    {
      src: smallScreen
        ? "images/carousel/carouselM10.jpg"
        : "images/carousel/carousel10.jpg",
      href: "microwave_oven",
    },
    {
      src: smallScreen
        ? "images/carousel/carousel11.jpg"
        : "images/carousel/carousel11.jpg",
      href: "public_address_system",
    },
  ];
  const classes = useStyles();

  useEffect(() => {
    new Splide("#image-slider", {
      type: "fade",
      rewind: true,
      speed: 1000,
      interval: 5000,
      heightRatio: 0.5,
      lazyLoad: "nearby",
      autoplay: true,
    }).mount();
  }, []);

  return (
    <div id="image-slider" className={`splide ${classes.splide}`}>
      <div className="splide__arrows">
        <IconButton
          className={`splide__arrow splide__arrow--prev ${classes.buttonWrapper}`}
        >
          <NavigateNextIcon className={classes.button} />
        </IconButton>
        <IconButton
          className={`splide__arrow splide__arrow--next ${classes.buttonWrapper}`}
        >
          <NavigateNextIcon className={classes.button} />
        </IconButton>
      </div>

      <div className="splide__track">
        <div className="splide__list">
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Item(props) {
  const triggerPageLoader = PageLoaderHandler();
  const classes = useStyles();
  return (
    <div className="splide__slide">
      <Link to={props.item.href} onClick={triggerPageLoader}>
        <img
          className={classes.images}
          data-splide-lazy={props.item.src}
          alt="display advert images"
        />
      </Link>
    </div>
  );
}

export default CarouselComponent;
