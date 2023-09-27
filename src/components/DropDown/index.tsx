import { useState } from "react";
import styles from "./styles.module.css";
import iconFilter from "../../assets/img/icon-filter.png";
import { setFiltersProps } from "../../pages/Home";

type DropDownProps = {
  setOrientation: (value: string) => void;
  setOrderBy: (value: string) => void;
};
const DropDown = ({ setOrientation, setOrderBy }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={handleOpen}>
        <img src={iconFilter} alt="" /> Filtros
      </button>
      {open ? (
        <ul className={styles.menu}>
          <li className="menu-item">
            <button onClick={() => setOrderBy("relevant")}>Relevância</button>
          </li>

          <li>
            <button onClick={() => setOrderBy("latest")}>Recentes</button>
          </li>
          <li>
            <button onClick={() => setOrientation("portrait")}>Retrato</button>
          </li>
          <li>
            <button onClick={() => setOrientation("landscape")}>
              Paisagem
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default DropDown;
