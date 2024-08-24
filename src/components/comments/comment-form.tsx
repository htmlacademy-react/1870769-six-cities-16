import { ChangeEvent, useState } from 'react';
import Rating from '../comments/rating';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hook';
import { sendCommentsAction } from '../../store/api-actions';

const MAX_LENGTH_COMMENT = 300;
const MIN_LENGTH_COMMENT = 50;

type commentFormTypes = {
  id: string | undefined;
}

function CommentForm({id}: commentFormTypes): JSX.Element | null {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const buttonDisabled =
   rating === 0 ||
  review.length < MIN_LENGTH_COMMENT ||
  review.length > MAX_LENGTH_COMMENT ||
  isSubmitting;

  const clearForm = () => {
    setRating(0);
    setReview('');
    setErrorMessage(null);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const sending = async () => {
      if (id === undefined) {
        return;
      }

      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        await dispatch(sendCommentsAction({
          id,
          comment: review,
          rating,
        }));
        clearForm();
      } catch {
        setErrorMessage('Ошибка отправки отзыва. Попробуйте еще раз.');
      } finally {
        setIsSubmitting(false);
      }
    };
    sending();
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <Rating rating={rating} onChange={setRating} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        maxLength={MAX_LENGTH_COMMENT}
        minLength={MIN_LENGTH_COMMENT}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setReview(evt.target.value)}
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
          disabled={buttonDisabled}
        >
          Submit
        </button>
      </div>

      {errorMessage && <p className="reviews__error">{errorMessage}</p>}
    </form>

  );
}

export default CommentForm;
