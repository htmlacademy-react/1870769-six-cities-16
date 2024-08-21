import React, { ChangeEvent, JSX } from 'react';
import { getTitleForRatingStar } from '../../utils';

type Rating = {
  rating: number | null;
  onChange: (rating: number) => void;
}

function Rating({rating, onChange}: Rating): JSX.Element {
  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(evt.target.value));
  };

  return (
    <div className="reviews__rating-form form__rating">
      {
        [5, 4, 3, 2, 1].map((starNumber: number) => (
          <React.Fragment key={starNumber}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={starNumber}
              id={`${starNumber}-stars`}
              type="radio"
              checked={rating === starNumber}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${starNumber}-stars`}
              className="reviews__rating-label form__rating-label"
              title={getTitleForRatingStar(starNumber)}
            >
              <span style={{width: '80%'}}></span>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))
      }
    </div>
  );
}

export default Rating;
