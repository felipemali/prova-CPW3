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
    if (open) {
      setTimeout(() => {
        setOpen(!open);
      }, 500);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={handleOpen}>
        <img src={iconFilter} alt="" /> Filtros
      </button>
      {open ? (
        <ul className={styles.menu}>
          <li className="menu-item">
            <button
              onClick={() => {
                setOrderBy("relevant");
                handleOpen();
              }}
            >
              Relevância
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setOrderBy("latest");
                handleOpen();
              }}
            >
              Recentes
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setOrientation("portrait");
                handleOpen();
              }}
            >
              Retrato
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setOrientation("landscape");
                handleOpen();
              }}
            >
              Paisagem
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default DropDown;
