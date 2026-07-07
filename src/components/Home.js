import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CardSection from './cards/CardSection';
import Slider from 'react-slick';

const Home = ({ spinner }) => {
  // State
  const [cards, setCards] = useState([]);
  const [hasError, setHasError] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getCards = async () => {
      try {
        const { data } = await axios(
          'https://cors-anywhere.herokuapp.com/https://search.moonpig.com/api/products?size=5&fq=card_shop_id:1'
        ); // https://cors-anywhere.herokuapp.com/
        setCards(data.Products);
      } catch (err) {
        setHasError(true);
      }
    };
    getCards();
  }, []);

  console.log(cards);

  return (
    <>
      <main className="container pink text-center justify-content-center align-items-center mt-5">
        <Link to="/cards" id="shop-button" className="btn btn-dark mb-5">
          <h1>Shop Cards</h1>
        </Link>
        {cards.length > 0 ? (
          <Slider {...settings}>
            {cards
              .filter((card) => card.ProductCategory.Name === 'greeting cards')
              .map((card) => {
                return <CardSection key={card.MoonpigProductNo} {...card} />;
              })}
          </Slider>
        ) : (
          <>
            {hasError ? (
              <h2 className="display-5 text-center">
                Oh! Something went wrong
              </h2>
            ) : (
              <img className="spinner" src={spinner} alt="Spinner gif" />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Home;
