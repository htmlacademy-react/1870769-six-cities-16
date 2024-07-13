import MainPage from '../../pages/main-page/main-page';
import Footer from '../footer/footer';
import Header from '../header/header';

type AppScreenProps = {
  offerCardCount: number;
}

function App({offerCardCount}: AppScreenProps): JSX.Element {
  return (
    <>
      <Header />
      <MainPage offerCardCount={offerCardCount} />
      <Footer />
    </>
  );
}

export default App;
