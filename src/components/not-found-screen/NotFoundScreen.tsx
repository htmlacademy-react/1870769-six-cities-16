import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="container">
      <h1>404 Not Found</h1>
      <Link style={{ color: 'blue', textDecoration: 'underline' }} to='/'>Go to Main page</Link>
    </div>
  );
}

export default NotFoundScreen;
