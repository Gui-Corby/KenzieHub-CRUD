import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useContext } from "react";
import { TechContext } from "../../providers/TechContext";

export const CreateTechModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createTech } = useContext(TechContext)

  const onSubmit = (formData) => {
    createTech.mutate(formData, {
      onSuccess: () => {
        reset();
        onClose();
      },
      onError: (error) => {
        console.log(error);
      },
    })
  }

  return (
    <div className={styles.modalOverlay} role="dialog">
      <div className={styles.modalBox}>
        <div className={styles.modal_top}>
          <h2>Cadastrar Tecnologia</h2>
          <button onClick={onClose} style={{ color: "var(--grey-1)" }} >X</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="tech">Nome</label>
          <input type="text" id="tech" name="tech" {...register("title")} />

          <label htmlFor="level">Selecionar Status</label>

          <select name="level" id="level" {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>

          <button type="submit">Cadastrar Tecnologia</button>
        </form>
      </div>
    </div>
  );
};
