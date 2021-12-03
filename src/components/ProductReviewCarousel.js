import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { IconButton } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import useStyles from "../styles/Carousel";

function ProductReviewCarousel(props) {
  const {
    imageInfo :{
    productImages,
    productName
    }
  } = props;

  const classes = useStyles();
  useEffect(() => {
    let secondarySlider = new Splide("#secondary-slider", {
      fixedWidth: 50,
      height: 50,
      gap: 4,
      cover: true,
      isNavigation: true,
      pagination: false,
      arrows: false,
      lazyLoad: "sequential",
      breakpoints: {
        600: {
          fixedWidth: 45,
          height: 45,
        },
      },
    }).mount();

    let primarySlider = new Splide("#image-slider", {
      rewind: true,
      pagination: false,
      heightRatio: 0.8,
      speed: 1000,
      interval: 5000,
      lazyLoad: "nearby",
      autoplay: true,
      type: "fade",
    });

    primarySlider.sync(secondarySlider).mount();
  }, []);

  const images = productImages ? (productImages.map(image => 
    <div className="splide__slide" key={image}>
    <img
      className={classes.previewImages}
      data-splide-lazy={image}
      alt={productName}
    />
  </div>
   )) : <p>....Cant's seem to find this product</p>

  return (
    <div>
      <div id="image-slider" className={`splide ${classes.splide}`}>
        <div className="splide__arrows">
          <IconButton
            className={`splide__arrow splide__arrow--prev ${classes.buttonWrapper}`}
            size="small"
          >
            <ChevronRight className={classes.button} />
          </IconButton>
          <IconButton
            className={`splide__arrow splide__arrow--next ${classes.buttonWrapper}`}
            size="small"
          >
            <ChevronRight className={classes.button} />
          </IconButton>
        </div>

        <div className="splide__track">
          <div className="splide__list">
           { images }
          </div>
        </div>
      </div>

      <div id="secondary-slider" className="splide" 
      style={{ 
        margin: '7px auto 0px',
        width: '85%' 
      }}
      >
        <div className="splide__track">
          <div className="splide__list">
          { images }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReviewCarousel;
