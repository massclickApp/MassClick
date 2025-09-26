import React, { useRef } from 'react';
import Bangalore from "../../../assets/TopTourist/Bangalore.png";
import Chennai from "../../../assets/TopTourist/Chennai.png";
import Hyderabad from "../../../assets/TopTourist/Hyderabad.png";
import Ooty from "../../../assets/TopTourist/Ooty.png";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 

import './topTourist.css';

const trendingServices = [
  { id: 1, name: "Ooty", image: Ooty, alt: "Electrician" },
  { id: 2, name: "Bangalore", image: Bangalore, alt: "Parlour" },
  { id: 3, name: "Chennai", image: Chennai, alt: "Spa" },
  { id: 4, name: "Hyderabad", image: Hyderabad, alt: "Saloon" },
];

const TopTourist = () => {
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
      <div className="headerContent">
        <h2 className="sectionTitle">Top Tourist Places</h2>
      </div>
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

export default TopTourist;