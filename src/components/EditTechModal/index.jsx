import { TechContext } from "../../providers/TechContext";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

export const EditTechModal = ({ onClose }) => {
  const { editTech, editingTech, setEditingTech } = useContext(TechContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editingTech ? editingTech.title : "",
      status: editingTech ? editingTech.status : "",
    },
  });

  const onSubmit = (formData) => {
    editTech.mutate(formData);
    reset();
  };

  useEffect(() => {
    if (editingTech) {
        reset({
            title: editingTech.title,
            status: editingTech.status,
        });
        
    }
  }, [editingTech, reset]);

  console.log(editingTech);

  return (
    <div className={styles.modalOverlay} role="dialog">
      <div className={styles.modalBox}>
        <div className={styles.modal_top}>
          <h2>Tecnologia Detalhes</h2>
          <button onClick={onClose} style={{ color: "var(--grey-1)" }}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="tech">Nome</label>
          <input
            type="text"
            id="tech"
            name="tech"
            defaultValue={editingTech ? editingTech.title : ""}
            disabled
          />

          <label htmlFor="level">Selecionar Status</label>

          <select name="level" id="level" {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>

          <button type="submit">Salvar alterações</button>
        </form>
      </div>
    </div>
  );
};
