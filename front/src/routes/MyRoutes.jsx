import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

// Lazy load the components
const Home = lazy(() => import('./../pages/main/Home'));
const Single = lazy(() => import('./../pages/Single/Single'));
const List = lazy(() => import('./../pages/List/List'));
const Search = lazy(() => import('./../pages/Search/Search'));
const Media = lazy(() => import('./../pages/Media/Media'));
const Docs = lazy(() => import('./../pages/Docs/Docs'));
const News = lazy(() => import('./../pages/News/News'))
const Digital = lazy(() => import('./../pages/News/Digital'))
const Vacancy = lazy(() => import('./../pages/Vacancy/Vacancy'))
const Laws = lazy(() => import('../pages/Laws/Laws'))


const LoadingComponent = () => (
  <div style={{
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0'
  }}>
    <CircularProgress />
  </div>
);

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<List />} />
          <Route path="/article" element={<Single />} />
          <Route path="/search" element={<Search />} />
          <Route path="/media" element={<Media />} />
          <Route path="/laws" element={<Laws />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/news" element={<News />} />
          <Route path="/digital" element={<Digital />} />
          <Route path="/vacancy" element={<Vacancy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default MyRoutes;
