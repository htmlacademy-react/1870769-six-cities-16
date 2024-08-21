import { ChangeEvent, useState } from 'react';
import Rating from '../comments/rating';

const MAX_LENGTH_COMMENT = 300;
const MIN_LENGTH_COMMENT = 50;

function CommentForm(): JSX.Element {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <Rating rating={rating} onChange={setRating} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setReview(evt.target.value)}
        maxLength={MAX_LENGTH_COMMENT}
        minLength={MIN_LENGTH_COMMENT}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                  To submit review please make sure to set
          <span className="reviews__star">rating</span>
                   and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={rating === null || review.length < MIN_LENGTH_COMMENT}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
