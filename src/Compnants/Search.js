import React from 'react';

const SearchComponent = ({ data, searchQuery }) => {
  const filteredResults = data.filter((item) => {
    const searchFields = [item.title, item.author, item.topic];
    console.log(searchFields);
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
        
      {filteredResults.length > 0 ? (
        <div className='items'>
          {filteredResults.map((result) => (
            <div key={result.id} className='itembox'>
              <h2>{result.title}</h2>
              <p>{result.description}</p>
              <p>Author: {result.author}</p>
              <p>Topic: {result.topic}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchComponent;
