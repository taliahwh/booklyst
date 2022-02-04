import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star fa-xs'
              : value >= 0.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star fa-xs'
              : value >= 1.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star fa-xs'
              : value >= 2.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star fa-xs'
              : value >= 3.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star fa-xs'
              : value >= 4.5
              ? 'fas fa-star-half-alt fa-xs'
              : 'far fa-star fa-xs'
          }
        ></i>
      </span>
      <span className="text-sm text-gray-700"> {text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#fde047',
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
