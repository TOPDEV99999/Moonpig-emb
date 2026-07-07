import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';

const CardDetails = ({ spinner }) => {
  // State
  const [card, setCard] = useState(null);
  const [hasError, setHasError] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    dots: true,
  };

  // Params
  const { MoonpigProductNo } = useParams();

  useEffect(() => {
    const getCard = async () => {
      try {
        const { data } = await axios(
          `https://cors-anywhere.herokuapp.com/https://www.moonpig.com/uk/api/product/product/?mpn=${MoonpigProductNo}`
        ); // https://cors-anywhere.herokuapp.com/
        setCard(data);
      } catch (err) {
        setHasError(true);
      }
    };
    getCard();
  }, [MoonpigProductNo]);

  return (
    <>
      {card ? (
        <section className="card-show container mt-4">
          <Link to="/cards" className="btn btn-dark mb-3">
            Back to cards
          </Link>
          <h2 className="text-center text-white">{card.Title}</h2>
          <hr />
          <div className="row">
            <div className="card-image col-12 col-md-6 details">
              <Slider>
                {card.ImageUrls.map((image) => {
                  return (
                    <div key={card.Title}>
                      <img src={image.ImageUrl} alt={image.ImageNo} />
                    </div>
                  );
                })}
              </Slider>
              {/* <img src={card.ImageUrls} alt={card.Title} /> */}
            </div>
            <div className="card-details col-12 col-md-6">
              <h4>
                <span>📙</span> Information
              </h4>
              <p>{card.AdditionalInfo}</p>
              <hr />
              {card.InStock ? (
                <p className="text-success">In Stock</p>
              ) : (
                <p className="text-danger">Out of Stock</p>
              )}

              <hr />

              <a
                className="btn btn-dark mb-3"
                href={card.ProductUrl}
                target="_blank"
              >
                Buy Now
              </a>
            </div>
          </div>
        </section>
      ) : (
        <>
          {hasError ? (
            <h2 className="display-5 text-center">Oh! Something went wrong</h2>
          ) : (
            <img className="spinner" src={spinner} alt="Spinner gif" />
          )}
        </>
      )}
    </>
  );
};

export default CardDetails;
