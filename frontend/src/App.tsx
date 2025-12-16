import LoadingScreen from './LoadingScreen';
import TopPage from './top/Page';
import useIsLoading from './useIsLoading';
import ResultPage from './result/Page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  const { isLoading, startLoading, stopLoading } = useIsLoading();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />}></Route>
          <Route
            path="/result"
            element={
              <ResultPage
                isLoading={isLoading}
                startLoading={startLoading}
                stopLoading={stopLoading}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
