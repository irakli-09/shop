import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SubmitModel } from './pages/SubmitModel';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Basket } from './pages/Basket';
import { AdminSubmissions } from './pages/AdminSubmissions';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmitModel />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/admin" element={<AdminSubmissions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
