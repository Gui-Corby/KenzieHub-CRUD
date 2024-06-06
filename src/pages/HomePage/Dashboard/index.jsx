import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../../providers/UserContext";
import { CreateTechModal } from "../../../components/CreateTechModal";
import Logo from "../../../assets/Logo-logout.svg";
import PlusSign from "../../../assets/plus_sign.png";
import styles from "./styles.module.scss";
import { TechList } from "../../../components/TechList";

export const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, userLogout } = useContext(userContext);

  return (
    <main>
      <header className={styles.dashboard_header}>
        <img src={Logo} alt="" />
        <Link to="/login">
          <button onClick={userLogout}>Sair</button>
        </Link>
      </header>

      <section className={styles.user}>
        <div className={styles.user_info}>
          <h2>Olá, {user.name} </h2>
          <span>{user.course_module}</span>
        </div>
      </section>

      <section className="container_dashboard">
        <section className={styles.tech_section}>
          <div className={styles.tech_section_top}>
            <h2>Tecnologias</h2>
            <button onClick={() => setModalOpen(true)}>
              <img src={PlusSign} alt="" />
            </button>
          </div>

          <div className={styles.techList_box}></div>
        </section>

        <TechList />
      </section>
      {isModalOpen && <CreateTechModal onClose={() => setModalOpen(false)} />}
    </main>
  );
};
