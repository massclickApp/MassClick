import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clientLogin } from '../../redux/actions/authAction.js';

import './home.css';

const BusinessListing = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState('');

    const categories = [
        "Construction Company", "Travels", "Events", "Education", "Hotels",
        "Spa", "Real Estate", "Interior Designer", "Dealers", "CCTV", "Manufacturer", "Hostels"
    ];

    // Fetch client token and businesses
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                // Step 1: Get client token
                const tokenData = await dispatch(clientLogin());
                const token = tokenData.accessToken;
                setAccessToken(token);

                // Step 2: Fetch businesses from protected API
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBusinesses(response.data);
            } catch (err) {
                console.error("Error fetching businesses:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusinesses();
    }, [dispatch]);

    const filteredBusinesses = businesses.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="business-listing">
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <h1>India's Best Local Business Search Engine</h1>
                    </div>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`navigation ${isMobileMenuOpen ? 'nav-open' : ''}`}>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#categories">Add a business</a></li>
                            <li><a href="#cities">Categories</a></li>
                            <li><a href="#about">My Account</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <Box className="container">
                    <Box className="hero-content">
                        <Typography variant="h4" gutterBottom>
                            Search local business in India
                        </Typography>

                        <Box
                            className="search-container"
                            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                        >
                            <TextField
                                label="Search for businesses, services..."
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => console.log("Search clicked")}
                            >
                                Search
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </section>

            {/* Categories Section */}
            <section className="categories">
                <div className="container">
                    <h3>Popular Categories</h3>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <div
                                key={category}
                                className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Businesses */}
            <section className="business-listings">
                <div className="container">
                    <h3>{selectedCategory === 'All' ? 'All Businesses' : selectedCategory}</h3>

                    {isLoading ? (
                        <div className="loading">Loading businesses...</div>
                    ) : filteredBusinesses.length === 0 ? (
                        <div className="no-results">
                            No businesses found. Try a different search term or category.
                        </div>
                    ) : (
                        <div className="business-cards">
                            {filteredBusinesses.map(business => (
                                <div key={business.id} className="business-card">
                                    <div className="business-image">
                                        <img
                                            src={`https://via.placeholder.com/300x200/4f46e5/ffffff?text=${encodeURIComponent(business.name)}`}
                                            alt={business.name}
                                        />
                                    </div>
                                    <div className="business-info">
                                        <h4>{business.name}</h4>
                                        <p className="category">{business.category}</p>
                                        <p className="location">{business.location}</p>
                                        <div className="rating">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span key={i} className={i < Math.floor(business.rating) ? 'star filled' : 'star'}>
                                                    ★
                                                </span>
                                            ))}
                                            <span className="rating-value">({business.rating})</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2023 Indian Business Directory. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default BusinessListing;
