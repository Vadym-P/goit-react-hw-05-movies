import Navigation from '../Navigation';
import s from './AppBar.modeule.css';

export default function AppBar() {
  return (
    <header className={s.header__bar}>
      <Navigation />
    </header>
  );
}
