import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Layout from './Layout';
import Home from './Home';
import Content from './Content';
import Contact from './Contact';

const ETUDIANTS_INITIAUX = [
  { id: 1, nom: 'Walid', note: 19 },
  { id: 2, nom: 'Yassine', note: 14 },
  { id: 3, nom: 'Abdelltife', note: 18 },
  { id: 4, nom: 'Ahmad', note: 9 },
];

export default function App() {
  const [etudiants, setEtudiants] = useState(ETUDIANTS_INITIAUX);

  return (
    <Routes>
      <Route element={<Layout etudiants={etudiants} />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/etudiants"
          element={<Content etudiants={etudiants} setEtudiants={setEtudiants} />}
        />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}