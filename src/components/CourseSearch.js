
import React, { useState } from 'react';


const CourseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/courses/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for courses:', error);
    }
  };

  return (
    <div>
      <h2 className='mt-4'>Course Search</h2>
      <div className="form-group">
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary my-2" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul className='mt-4'>
        {searchResults.map(course => (
         <li key={course.id}>{course.name}</li>
        //  <CourseCard courseProp={course} key={course._id} />
          
        ))}
      </ul>
    </div>
  );
};

export default CourseSearch;
