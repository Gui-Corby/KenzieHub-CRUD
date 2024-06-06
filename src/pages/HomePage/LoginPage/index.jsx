import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo-logout.svg";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import { userContext } from "../../../providers/UserContext";

export const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { userLogin } = useContext(userContext);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const onSubmit = (data) => {
    userLogin(data, navigate);
  }

  return (
    <main className={styles.main_login}>
      <section className="container_login">
        <header className={styles.header_login}>
          <img src={Logo} alt="" />
        </header>

        <div className={styles.form_box}>
          <div className={styles.top_form}>
            <h2>Login</h2>
          </div>

          <form onSubmit={handleSubmit(userLogin)}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Digite aqui seu email"
              {...register("email")}
            />

            <label htmlFor="password">Senha</label>

            <div className={styles.password_box}>
              <input
                type={visible ? "text" : "password"}
                id="password"
                placeholder="Digite aqui sua senha"
                {...register("password")}
              />
              <div
                className={styles.password_icon}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>

            <button type="submit">Entrar</button>

            <p>Ainda não possui uma conta?</p>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <span className={styles.link_to_register}>Cadastre-se</span>
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
};
