import React from 'react';
import './cards.css';

const Cards = ({
    imageSrc,
    title,
    rating,
    reviews,
    address,
    details,
    phone,
    whatsapp, // Note: The actual number is not used in the UI based on your image
    ...props
}) => {

    return (
        <div className="base-card" {...props}>
            
            {/* 1. Image Block */}
            <div className="card-image-container">
                <img
                    src={imageSrc}
                    alt={`${title} thumbnail`}
                    className="card-image"
                />
            </div>

            {/* 2. Content Block */}
            <div className="card-content">

                {/* Meta Section (Rating, Reviews, Title) */}
                <div className="card-meta">
                    {/* Rating Badge */}
                    <span className="rating-badge">
                        {rating}
                    </span>
                    {/* Reviews */}
                    <span style={{ marginRight: '10px' }}>{reviews} Ratings</span>
                    {/* Title */}
                    <h2 className="card-title" style={{ marginLeft: '10px' }}>
                        {title}
                    </h2>
                </div>

                {/* Address */}
                <p className="card-address" style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>
                    {address}
                </p>

                {/* Details (Experience/Category) */}
                <p className="card-details" style={{ fontSize: '14px', color: '#333', margin: '0 0 15px 0', fontWeight: 'bold' }}>
                    {details}
                </p>

                {/* Action Buttons */}
                <div className="card-actions">
                    
                    {/* Phone Button (Orange) */}
                    <button className="card-action-button phone-button">
                        {/* Assuming Font Awesome is linked: fa-phone icon */}
                        <i className="fa fa-phone" style={{ marginRight: '5px' }}></i> {phone}
                    </button>

                    {/* WhatsApp Button (Green) */}
                    <button className="card-action-button whatsapp-button">
                        {/* Assuming Font Awesome is linked: fa-whatsapp icon */}
                        <i className="fa fa-whatsapp" style={{ marginRight: '5px' }}></i> WhatsApp
                    </button>

                    {/* Send Enquiry Button (Blue) */}
                    <button className="card-action-button enquiry-button">
                        Send Enquiry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cards;