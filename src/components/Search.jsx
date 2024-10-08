import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Card from './Card';
import Loader from './Loader';

function Search() {
  const { query } = useParams(); // Retrieve search term from URL
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slicedData, setSlicedData] = useState([]); // New state for sliced data
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 5; // Number of articles to display per page
  const pageSize = 10; // Number of articles fetched per request

  useEffect(() => {
    if (!query) return; // Don't trigger if no query is set

    setIsLoading(true);
    setError(null);

    fetch(`https://aconews-u4xs.onrender.com/search?search=${query}&page=${currentPage}&max=${pageSize}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(myJson => {
        console.log('Fetched data:', myJson); // Log the response data

        // Check if data structure is correct
        if (myJson && myJson.articles) {
          setData(myJson.articles);
        } else {
          setError('Unexpected data format');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    setSlicedData(data.slice(startIndex, endIndex));
    console.log(slicedData);
  }, [data, currentPage]);

  function handlePrev() {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  function handleNext() {
    const totalPages = Math.ceil(data.length / articlesPerPage);
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    console.log(totalPages);
  }

  return (
    <>
      {/* Search Input and Button */}
      <div className="search-bar my-5 flex justify-center">
        <input
          type="text"
          placeholder="Search news..."
          className="search-input p-2 border rounded mr-2"
          defaultValue={query} // Show current query in the input field
          disabled // Input is disabled during search to avoid changes
        />
        <button
          onClick={() => window.location.reload()} // Reload to re-fetch with current query
          className="search-btn bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? slicedData.map((element, index) => (
          <Card
            title={element.title}
            description={element.description}
            imgUrl={element.image}
            publishedAt={element.publishedAt}
            url={element.url}
            author={element.source.name}
            source={element.source.name}
            key={index}
          />
        )) : <Loader />}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button
            disabled={currentPage <= 1}
            className='pagination-btn'
            onClick={handlePrev}
          >
            Prev
          </button>
          <p className='font-semibold opacity-80'>
            {currentPage}
          </p>
          <button
            disabled={currentPage >= Math.ceil(data.length / articlesPerPage)}
            className='pagination-btn'
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Search;
