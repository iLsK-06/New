import { NavLink } from 'react-router';

const LIENS = [
  { to: '/', label: 'Accueil' },
  { to: '/etudiants', label: 'Étudiants' },
  { to: '/contact', label: 'Contact' },
];

const classeLien = ({ isActive }) =>
  `p-2 rounded text-slate-800 hover:bg-slate-300 ${isActive ? 'bg-slate-300 font-semibold' : ''}`;

export default function Menu() {
  return (
    <aside className="w-full md:w-60 bg-slate-200 p-5 flex flex-col shrink-0">
      <span className="text-xs font-bold text-slate-600 uppercase mb-3 block">Menu</span>
      <nav className="flex flex-col gap-2">
        {LIENS.map(({ to, label }) => (
          <NavLink key={to} to={to} end className={classeLien}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
