import s from './PageTitle.module.css';

export default function PageTitle({ text }) {
  return <h1 className={s.title}>{text}</h1>;
}
