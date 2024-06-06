import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Logo from "../../../assets/Logo-Register.svg";
import { useContext } from "react";
import { userContext } from "../../../providers/UserContext";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const validatePasswordConfirmation = (value) => {
    const password = getValues("password");
    return value === password || "Senhas não conferem";
  };

  const { userRegister } = useContext(userContext);
  return (
    <main className={styles.main_register}>
      <section className="container_register">
        <header className={styles.header_register}>
          <img src={Logo} alt="" />
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span className={styles.link_to_login}>Voltar</span>
          </Link>
        </header>

        <div className={styles.form_box}>
          <div className={styles.top_form}>
            <h2>Crie sua conta</h2>

            <p>Rápido e grátis, vamos nessa</p>
          </div>

          <form onSubmit={handleSubmit(userRegister)}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Digite aqui seu nome"
              {...register("name", { required: "Nome é obrigatório" })}
            />

            {errors.name && <p>{errors.name.message}</p>}

            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Digite aqui seu email"
              {...register("email", { required: "Email é obrigatório" })}
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite aqui sua senha"
              {...register("password", { required: "Senha é obrigatório" })}
            />

            {errors.password && <p>{errors.password.message}</p>}

            <label htmlFor="password_confirm">Confirmar Senha</label>
            <input
              type="password"
              id="password_confirm"
              placeholder="Digite novamente sua senha"
              {...register("password_confirm", {
                validate: validatePasswordConfirmation,
                required: "Confirmação de senha é obrigatória",
              })}
            />

            {errors.password_confirm && (
              <p>{errors.password_confirm.message}</p>
            )}

            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              id="bio"
              placeholder="Fale sobre você"
              {...register("bio", { required: "Bio é obrigatória" })}
            />

            {errors.bio && <p>{errors.bio.message}</p>}

            <label htmlFor="contact">Contato</label>
            <input
              type="text"
              id="contact"
              placeholder="Opção de contato"
              {...register("contact", { required: "Contato é obrigatório" })}
            />

            {errors.contact && <p>{errors.contact.message}</p>}

            <label htmlFor="course_module">Selecionar módulo</label>

            <select
              name="course_module"
              id="course_module"
              {...register("course_module", {
                required: "Seleção de módulo é obrigatório",
              })}
            >
              <option value="Primeiro módulo (Introdução ao Frontend)">Primeiro Módulo</option>
              <option value="Segundo módulo (Frontend Avançado)">Segundo Módulo</option>
              <option value="Terceiro módulo (Introdução ao Backend)">Terceiro Módulo</option>
              <option value="Quarto módulo (Backend Avançado)">Quarto Módulo</option>
            </select>

            {errors.course_module && <p>{errors.course_module.message}</p>}

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </section>
    </main>
  );
};
