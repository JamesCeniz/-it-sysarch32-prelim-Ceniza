import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex() {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [language, setLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response data
        setPokemonDetails(data.data);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      });
  }, [currentPage]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <center>
        <div className="button">
          <button onClick={() => handleLanguageChange('english')}>English</button>
          <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
          <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
          <button onClick={() => handleLanguageChange('french')}>French</button>
        </div>
      </center>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Back</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      <div className="pages">
      <p>Current Page: {currentPage}</p>
      <p>Total Pages: {totalPages}</p>
      </div>
      
      <div className="card-container">
        {pokemonDetails.length > 0 ? (
          pokemonDetails.map((pokemon) => (
            <div key={pokemon.id} className="card">
              <Pokemon {...pokemon} language={language} />
            </div>
          ))
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Pokedex;