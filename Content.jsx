import { useState } from 'react';
import StudentCard from './StudentCard';

const VIDE = { id: '', nom: '', note: '' };

export default function Content({ etudiants, setEtudiants }) {
  const [oEtudiant, setOEtudiant] = useState(VIDE);
  const [erreur, setErreur] = useState('');

  const enEdition = oEtudiant.id !== '';
  const nextId = etudiants.length > 0 ? Math.max(...etudiants.map((e) => e.id)) + 1 : 1;

  const reinitialiser = () => {
    setOEtudiant(VIDE);
    setErreur('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nom, note } = oEtudiant;

    if (!nom.trim() || note === '') {
      setErreur('Veuillez remplir tous les champs !');
      return;
    }

    const noteNum = Number(note);
    if (noteNum < 0 || noteNum > 20) {
      setErreur('Erreur : La note doit être comprise entre 0 et 20 !');
      return;
    }

    const donnees = { nom: nom.trim(), note: noteNum };

    setEtudiants((prev) =>
      enEdition
        ? prev.map((etd) => (etd.id === oEtudiant.id ? { ...etd, ...donnees } : etd))
        : [...prev, { id: nextId, ...donnees }]
    );
    reinitialiser();
  };

  const supprimerEtudiant = (id) => {
    setEtudiants((prev) => prev.filter((etd) => etd.id !== id));
    if (oEtudiant.id === id) reinitialiser();
  };

  const chargerPourModification = (etd) => {
    setOEtudiant(etd);
    setErreur('');
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOEtudiant((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Liste des étudiants</h2>

      {erreur && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-semibold">
          {erreur}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row gap-4 items-center shadow-sm w-full"
      >
        <div className="w-full md:w-20">
          <input
            type="text"
            value={`ID: ${enEdition ? oEtudiant.id : nextId}`}
            disabled
            className="w-full bg-slate-200 text-slate-500 border border-slate-300 p-2 rounded-lg outline-none text-center font-bold"
          />
        </div>

        <input
          type="text"
          placeholder="Nom de l'étudiant"
          name="nom"
          value={oEtudiant.nom}
          onChange={onInputChange}
          className="w-full md:flex-1 border border-slate-300 p-2 rounded-lg outline-none focus:border-blue-500"
        />

        <input
          type="number"
          placeholder="Note /20"
          name="note"
          value={oEtudiant.note}
          onChange={onInputChange}
          className="w-full md:w-32 border border-slate-300 p-2 rounded-lg outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className={`w-full md:w-auto px-5 py-2 text-white font-semibold rounded-lg transition-colors ${
            enEdition ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {enEdition ? 'Modifier' : 'Ajouter'}
        </button>

        {enEdition && (
          <button
            type="button"
            onClick={reinitialiser}
            className="w-full md:w-auto px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            Annuler
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {etudiants.map((item) => (
          <StudentCard
            key={item.id}
            etd={item}
            onDelete={supprimerEtudiant}
            onEdit={chargerPourModification}
          />
        ))}
      </div>
    </main>
  );
}
