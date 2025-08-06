import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage/HomePage';
import { RedirectHandler } from './components/pages/RedirectHandler/RedirectHandler';
import { NotFound } from './components/pages/NotFound/Notfound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortId" element={<RedirectHandler />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}