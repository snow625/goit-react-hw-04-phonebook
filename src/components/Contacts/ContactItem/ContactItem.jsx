import { memo } from "react";
import PropTypes from "prop-types";
import s from "./contactItem.module.css";
function ContactItem(props) {
  const { number, name, onClick, id } = props;

  return (
    <li className={s.item}>
      <p>{`${name}: ${number}`}</p>
      <button
        onClick={(e) => {
          onClick(id);
        }}
        className={s.btn}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}
ContactItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default memo(ContactItem);
