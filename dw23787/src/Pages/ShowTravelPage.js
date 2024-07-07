import React, { useEffect, useState } from 'react';
import Saudation from '../Components/ShowTravelPageComponents/Saudation';
import CategorySelection from '../Components/ShowTravelPageComponents/CategorySelection';
import TravelCard from '../Components/TravelCard';
import { GetTravels } from '../Services/TravelsService';
import Pagination from 'react-bootstrap/Pagination';
import NotFoundPage from '../Components/NotFoundPage';

function ShowTravelPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [travelCards, setTravelCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const clearSearch = () => {
    setSearchText("");
    fetchTravelCards(currentPage, selectedCategory, "");
  };

  const getSearch = () => {
    fetchTravelCards(currentPage, selectedCategory, searchText);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchTravelCards(1, category, searchText);
  };

  const fetchTravelCards = (page, category, search) => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    GetTravels(storedUser.id, page, 10, category, search)
      .then((data) => {
        setTravelCards(data.travelCards.$values);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        setTravelCards([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTravelCards(1, selectedCategory, searchText);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTravelCards(page, selectedCategory, searchText);
  };

  return (
    <div className='container mt-4 d-flex flex-column min-vh-100' style={{ backgroundColor: '#f8f9fa' }}>
      <Saudation />
      <div className="input-group mt-4">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          value={searchText}
          onChange={(event) => { setSearchText(event.target.value); }}
        />
        <div className="input-group-append">
          <span className="input-group-text border-0" onClick={getSearch} style={{ cursor: 'pointer' }} id="search-addon">
            <i className="fas fa-search"></i>
          </span>
          {searchText && (
            <span className="input-group-text border-0" onClick={clearSearch} style={{ cursor: 'pointer' }}>
              <i className="fas fa-times"></i>
            </span>
          )}
        </div>
      </div>
      <CategorySelection selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
      
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="travel-cards-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {travelCards.length > 0 ? (
            travelCards.map((travel) => (
              <div key={travel.id} style={{ flex: '1 0 200px', margin: '10px' }}>
                <TravelCard id={travel.id} image={travel.image} title={travel.name} />
              </div>
            ))
          ) : (
            <NotFoundPage info="No travel cards available" option="Reload the page" to="/"/>
          )}
        </div>
      )}

      <Pagination className="mt-4">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map(pageNumber => (
          <Pagination.Item key={pageNumber + 1} active={pageNumber + 1 === currentPage} onClick={() => handlePageChange(pageNumber + 1)}>
            {pageNumber + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
}

export default ShowTravelPage;
