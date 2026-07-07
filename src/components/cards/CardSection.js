import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

const CardSection = ({
  ProductImage,
  Price,
  Reviews,
  Description,
  MoonpigProductNo,
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4 p-0">
      <Link to={`/cards/${MoonpigProductNo}`}>
        <div id="card-details" className="card text-center h-100 shadow">
          <div className="card-image">
            <img src={ProductImage.Link.Href} alt={Description} />
          </div>
          <div className="card-footer text-center">
            <p>
              Price from {Price.Currency}
              {Price.Value}
            </p>
            {Reviews.AverageStarReviewRating ? (
              <ReactStars
                count={5}
                value={Reviews.AverageStarReviewRating}
                edit={false}
                half={true}
                size={15}
              />
            ) : (
              <p>Not yet rated</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardSection;
