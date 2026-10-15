function Groupe({ titre, liste, couleur }) {
  return (
    <div className="flex-1">
      <h3 className="text-sm font-bold mb-2">
        {titre} ({liste.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {liste.length === 0 && <span className="text-slate-400 text-sm">Aucun</span>}
        {liste.map((e) => (
          <span key={e.id} className={`footer-badge ${couleur} text-white text-sm px-2 py-1 rounded`}>
            {e.nom} : {e.note}/20
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Footer({ etudiants }) {
  const admis = etudiants.filter((e) => e.note >= 10);
  const refuses = etudiants.filter((e) => e.note < 10);

  return (
    <footer className="footer-bar bg-slate-800 text-white p-4 shrink-0 max-h-40 overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-4 md:gap-12">
        <Groupe titre="Admis" liste={admis} couleur="bg-green-600" />
        <Groupe titre="Refusés" liste={refuses} couleur="bg-red-600" />
      </div>
    </footer>
  );
}
