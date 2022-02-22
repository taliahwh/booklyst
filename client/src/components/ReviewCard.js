import React from 'react';
import parse from 'html-react-parser';

import Rating from '../components/Rating';

const ReviewCard = ({ review }) => {
  return (
    <div className="block p-6 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm ">
      {/* Card Flex Container */}
      <div className="card-container grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0">
        <div className="image-container col-span-1">
          <img
            className="w-14 h-14"
            src={review.user.imageURL}
            alt={review.user.name}
          />
        </div>
        {/*  Card Content */}
        <div className="content-container flex flex-col space-y-2 col-span-1 sm:col-span-11">
          <div className="review-heading flex justify-between">
            <div className="flex space-x-2 text-sm text-gray-800">
              <span className="font-semibold">{review.user.name}</span>
              <Rating
                value={review.rating}
                text={`rated it ${review.rating} stars`}
              />
              <p className="text-sm text-gray-600">• {review.date}</p>
            </div>
          </div>

          {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5> */}
          <p className="font-normal text-gray-700 line-clamp-5 hover:line-clamp-none">
            {parse(review.bodyHTML)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
