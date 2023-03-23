// pkgs:

// utils:
import { Link } from 'react-router-dom';
import './style.sass';

// comps:

// component>>>
export const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="wing logo-wrapper">
        <Link to="/" className="logo"></Link>
      </div>
      <div className="wing sun-icon">
        <div className="sun"></div>
      </div>
    </header>
  );
};
