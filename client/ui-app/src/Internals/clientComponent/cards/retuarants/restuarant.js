import React from 'react';
import './restuarants.css';
import BackgroundRest from "../../../../assets/cards/Background-Rest.jpg"


const RestuarantCards = () => {
  return (
    <div className="restaurant-page-container">

      <header className="hero-banner">
        <h1 className="hero-title">IT'S ALL ABOUT FOOD</h1>
        <div className="hero-actions">
          <div className="action-card booking">
            <span className="icon">😀</span>
            <p className="title">Book A Table</p>
            <p className="subtitle">Make Reservation</p>
          </div>

          <div className="action-card trending">
            <span className="icon">🍲</span>
            <p className="title">WHAT'S TRENDING?</p>
            <p className="subtitle">Try It Yourself</p>
          </div>

          <div className="action-card ordering">
            <span className="icon">🛵</span>
            <p className="title">ORDER FOOD</p>
          </div>
        </div>
      </header>


      <section className="category-cards-section">
        <div className="cards-grid">
          <div className="category-card indian-flavours">
            <div
              className="card-image-wrapper"
              style={{ backgroundImage: `url(${BackgroundRest})` }}
            ></div>
            <div className="card-content">
              <h3 className="card-title">Indian Flavours</h3>
              <ul className="category-list">
                <li>- Chettinad</li>
                <li>- South Indian</li>
                <li>- Pure Veg</li>
                <li>- Biryani</li>
              </ul>
              <a href="#" className="more-link">- More</a>
            </div>
          </div>

          <div className="category-card global-cuisines">
            <div className="card-image-wrapper"></div>
            <div className="card-content">
              <h3 className="card-title">Global Cuisines</h3>
              <ul className="category-list">
                <li>- Afghani</li>
                <li>- Burmese</li>
                <li>- Continental</li>
                <li>- Mexican</li>
              </ul>
              <a href="#" className="more-link">- More</a>
            </div>
          </div>


          <div className="category-card nightlife">
            <div className="card-image-wrapper"></div>
            <div className="card-content">
              <h3 className="card-title">Nightlife</h3>
              <ul className="category-list">
                <li>- Pubs</li>
                <li>- Discotheques</li>
                <li>- Lounge Bars</li>
                <li>- Restaurants & Bars</li>
              </ul>
              <a href="#" className="more-link">- More</a>
            </div>
          </div>

          <div className="category-card quick-bites">
            <div className="card-image-wrapper"></div>
            <div className="card-content">
              <h3 className="card-title">Quick Bites</h3>
              <ul className="category-list">
                <li>- Bakeries</li>
                <li>- Coffee Shops</li>
                <li>- Fast Food</li>
                <li>- Pizza Outlets</li>
              </ul>
              <a href="#" className="more-link">- More</a>
            </div>
          </div>

          <div className="category-card sweet-tooth">
            <div className="card-image-wrapper"></div>
            <div className="card-content">
              <h3 className="card-title">Sweet Tooth</h3>
              <ul className="category-list">
                <li>- Cake Shops</li>
                <li>- Desserts</li>
              </ul>
              <a href="#" className="more-link">- More</a>
            </div>
          </div>

          <div className="category-card foodie">
            <div className="card-image-wrapper"></div>
            <div className="card-content">
              <h3 className="card-title">Foodie</h3>
              <ul className="category-list">
                <li>- Oye Punjab</li>
                <li>- Shawarmas</li>
                <li>- Sizzlers</li>
                <li>- Unique Themes</li>
              </ul>
              <a href="#" className="more-link">- More</a>
            </div>
          </div>

        </div>

        <div className="view-all-wrapper">
          <button className="view-all-btn">
            View All Categories
          </button>
        </div>
      </section>
    </div>
  );
};

export default RestuarantCards;