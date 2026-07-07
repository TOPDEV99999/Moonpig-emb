import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'regenerator-runtime';
import CardSection from './CardSection';
import ReactPaginate from 'react-paginate';

const CardListing = ({ spinner }) => {
  // State
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filters, setFilters] = useState({
    IsLandscape: 'All',
    searchTerm: '',
  });
  const [hasError, setHasError] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 20;
  const pageCount = Math.ceil(filteredCards.length / perPage);
  const offset = currentPage * perPage;

  useEffect(() => {
    const getCards = async () => {
      try {
        const { data } = await axios(
          'https://cors-anywhere.herokuapp.com/https://search.moonpig.com/api/products?size=300&fq=card_shop_id:1'
        ); //https://cors-anywhere.herokuapp.com/
        setCards(data.Products);
      } catch (err) {
        setHasError(true);
      }
    };
    getCards();
  }, []);

  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i');
    setFilteredCards(
      cards.filter((item) => {
        return (
          regexSearch.test(item.Title) &&
          (filters.IsLandscape === item.IsLandscape ||
            filters.IsLandscape === 'All')
        );
      })
    );
  }, [filters, cards]);

  const handleFilterChange = (event) => {
    const target = event.target;
    const value =
      target.name === 'IsLandscape'
        ? Number(event.target.value)
        : event.target.value;
    const newObj = { ...filters, [event.target.name]: value };
    setFilters(newObj);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <main>
        <section className="container mt-4">
          <div className="search-header">
            <div className="search" id="search">
              <p>Search:</p>
              <input
                onChange={handleFilterChange}
                aria-label="handle filter"
                name="searchTerm"
                value={filters.searchTerm}
                className="filter-type"
              />
            </div>

            <select
              onChange={handleFilterChange}
              aria-label="handle filter"
              name="IsLandscape"
              value={filters.IsLandscape}
              className="select"
            >
              <option value="All">All</option>
              <option value={0}>Portrait</option>
              <option value={1}>Landscape</option>
            </select>
          </div>
          <Link to="/" id="back" className="btn btn-dark mt-3 mb-3">
            Back
          </Link>
          <div className="row">
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              disabledClassName={'pagination__link--disabled'}
              activeClassName={'pagination__link--active'}
            />
            {cards.length > 0 ? (
              (filters.IsLandscape !== '' || filters.searchTerm !== ''
                ? filteredCards
                : cards
              )
                .filter(
                  (card) => card.ProductCategory.Name === 'greeting cards'
                )
                .slice(offset, offset + perPage)
                .map((card) => {
                  return <CardSection key={card.MoonpigProductNo} {...card} />;
                })
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
          </div>
        </section>
      </main>
    </>
  );
};

export default CardListing;
