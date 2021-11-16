import s from "./WrapperContainer.module.css";

export default function WrapperContainer({ children }) {
  return <div className={s.wrapper}>{children}</div>
}
