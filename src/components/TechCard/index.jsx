import { useContext, useState } from "react";
import { TechContext } from "../../providers/TechContext";
import { userContext } from "../../providers/UserContext";
import Pen from "../../assets/Vector.png";
import Trash from "../../assets/trash.png";
import styles from "./styles.module.scss";
import { EditTechModal } from "../EditTechModal";

export const TechCard = ({ tech }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { deleteTech, setEditingTech } = useContext(TechContext);

  const handleEditClick = () => {
    setEditingTech(tech);
    setModalOpen(true);
  };

  return (
    <li>
      <div className={styles.tech_card_left}>
        <h3>{tech.title}</h3>
        <span className={styles.mobile_only}>{tech.status}</span>
      </div>

      <div className={styles.tech_card_right}>
        <span className={styles.desktop_only}>{tech.status}</span>
        <button onClick={handleEditClick}>
          <img src={Pen} />
        </button>
        <button onClick={() => deleteTech.mutate(tech.id)}>
          <img src={Trash} />
        </button>
      </div>
      {isModalOpen && <EditTechModal onClose={() => setModalOpen(false)} />}
    </li>
  );
};
