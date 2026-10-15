import { Outlet } from 'react-router';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

export default function Layout({ etudiants }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <Menu />
        <Outlet />
      </div>
      <Footer etudiants={etudiants} />
    </div>
  );
}
