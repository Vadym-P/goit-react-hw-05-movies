import PropTypes from 'prop-types';
import s from './Profile.module.css';

export default function Profile({ name, tag, location, avatar, stats }) {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.description}>
          <img src={avatar} alt={name} className={s.avatar} />
          <p className={s.name}>{name}</p>
          <p className={s.tag}>{'@' + tag}</p>
          <p className={s.location}>{location}</p>
        </div>
        <ul className={s.list}>
          <li className={s.item}>
            <span className={s.label}>Followers</span>
            <span className={s.quantity}>{stats.followers}</span>
          </li>
          <li className={s.item}>
            <span className={s.label}>Views</span>
            <span className={s.quantity}>{stats.views}</span>
          </li>
          <li className={s.item}>
            <span className={s.label}>Likes</span>
            <span className={s.quantity}>{stats.likes}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
};
