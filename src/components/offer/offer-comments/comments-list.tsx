import { OfferComments } from '../../../types/offer-types/offer-comment-types';
import { formatDate } from '../../../utils';
import CommentForm from './comment-form';

type OfferCommentsTypes = {
  comments: OfferComments;
}

function CommentList({comments}: OfferCommentsTypes): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

      <ul className="reviews__list">
        {
          comments.map(({id, user, rating, comment, date}) => (
            <li className="reviews__item" key={id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={user.avatarUrl}
                    width="54" height="54"
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">
                  {user.name}
                </span>
                <span className="offer__user-status">
                  {user.isPro && 'Pro'}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: rating * 20}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {comment}
                </p>
                <time className="reviews__time" dateTime={date}>{formatDate(date)}</time>
              </div>
            </li>
          ))
        }
      </ul>

      <CommentForm />
    </section>
  );
}

export default CommentList;
