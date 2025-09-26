import React, { useRef } from 'react';
import CarMechanic from "../../../assets/services/carService.png";
import Parlours from "../../../assets/services/parlours.png"
import Msand from "../../../assets/services/Msand.png"
import Hotels from "../../../assets/services/Hotels.png"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 

import './trendingSearch.css';

const trendingServices = [
  { id: 1, name: "Hostels", image: CarMechanic, alt: "Electrician" },
  { id: 2, name: "Parlours", image: Parlours, alt: "Parlour" },
  { id: 3, name: "M sand", image: Msand, alt: "Spa" },
  { id: 4, name: "Hotel", image: Hotels, alt: "Saloon" },
];

const TrendingSearchesCarousel = () => {
  const carouselRef = useRef(null);
  const scrollAmount = 280; 

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="trendingSection">
      {/* Updated Header with a Subtitle for better context */}
      <div className="headerContent">
        <h2 className="sectionTitle">Trending Searches Near You</h2>
        <p className="sectionSubtitle">Stay updated with the latest local and international trends.</p>
      </div>
      {/* --- Carousel Navigation Buttons --- */}
      <div className="carouselControls">
        <div 
          className="scrollIndicator left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <KeyboardDoubleArrowLeftIcon className="arrow" />
        </div>
        <div 
          className="scrollIndicator right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <KeyboardDoubleArrowRightIcon className="arrow" />
        </div>
      </div>
      {/* --- Carousel Cards Container --- */}
      <div className="carouselWrapper">
        <div className="carouselContainer" ref={carouselRef}>
          {trendingServices.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="cardLink"
            >
              <div className="cardImageWrapper">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="cardImage"
                />
              </div>
              <div className="cardInfo">
                <p className="cardName">{service.name}</p>
                <div className="exploreLink">
                    Explore <ChevronRightIcon className="exploreArrow" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSearchesCarousel;