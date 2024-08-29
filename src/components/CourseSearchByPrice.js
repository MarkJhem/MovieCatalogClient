

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseSearch = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const jwtToken = localStorage.getItem('token')

  const handleCourseSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/courses/course-price-range`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          minPrice: minPrice,
          maxPrice: maxPrice
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Courses by Price Range</h1>
      <form onSubmit={handleCourseSearch}>
        <div className="form-group">
          <label htmlFor="minPrice">Minimum Price</label>
          <input
            type="number"
            className="form-control"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxPrice">Maximum Price</label>
          <input
            type="number"
            className="form-control"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="mt-5">
        <h2>Search Results</h2>
        <ul className="list-group">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <li key={index} className="list-group-item">
                {course.title} - ${course.price}
              </li>
            ))
          ) : (
            <li className="list-group-item">No courses found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CourseSearch;
