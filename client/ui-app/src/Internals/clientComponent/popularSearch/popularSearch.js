import React, { useRef } from 'react';
import './CardCarousel.css';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import Cctv from "../../../assets/Popular/CCTV.png"
import Education from "../../../assets/Popular/Education.png"
import HotelRoom from "../../../assets/Popular/HotelRoom.png"
import Photography from "../../../assets/Popular/Photography.png"


const cardsData = [
    { title: 'CCTV', image: Cctv, buttonText: 'Enquire Now', color: '#E67E22', alt: 'CCTV camera installation' },
    { title: 'Hotels', image: HotelRoom, buttonText: 'Enquire Now', color: '#E67E22', alt: 'Modern hotel room' },
    { title: 'Photography', image: Photography, buttonText: 'Enquire Now', color: '#E67E22', alt: 'Photographer with camera' },
    { title: 'Education', image: Education, buttonText: 'Enquire Now', color: '#E67E22', alt: 'Graduation scroll' },
    { title: 'Education', image: Education, buttonText: 'Enquire Now', color: '#E67E22', alt: 'Graduation scroll' },


];

const CardCarousel = () => {
    const containerRef = useRef(null);

    const scrollRight = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('.card')?.offsetWidth || 350;
            const scrollAmount = cardWidth + 15;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('.card')?.offsetWidth || 350;
            const scrollAmount = cardWidth + 15;
            containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="carousel-container">
            <button className="nav-arrow left" onClick={scrollLeft}>
                <KeyboardDoubleArrowLeftIcon />
            </button>

            <div className="cards-wrapper" ref={containerRef}>
                {cardsData.map((card, index) => (
                    <div className="card" key={index}>
                        <div className="card-image-wrapper">
                            <img src={card.image} alt={card.alt} className="card-image" />
                        </div>

                        <div className="card-content" style={{ backgroundColor: card.color }}>
                            <h3 className="card-title">{card.title}</h3>
                            <button className="enquire-button">{card.buttonText}</button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="nav-arrow right" onClick={scrollRight}>
                <KeyboardDoubleArrowRightIcon />
            </button>
        </div>
    );
};

export default CardCarousel;