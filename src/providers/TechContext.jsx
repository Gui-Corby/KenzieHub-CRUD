import { api } from "../services/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useContext, useState, createContext } from "react";
import { userContext } from "./UserContext";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
  const { tech, setTech } = useContext(userContext);

  const [editingTech, setEditingTech] = useState({
    id: "",
    status: "",
  });

  const client = useQueryClient();

  const revalidate = () => {
    client.invalidateQueries({ queryKey: ["techs"] });
  };

  const createTech = useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/users/techs", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@TOKEN")}`,
        },
      });
      setTech([...tech, response.data]);
      return response;
    },
    catch(error) {
      console.error("Erro ao adicionar tecnologia: ", error);
      throw error;
    },
    onSuccess: revalidate,
  });

  const deleteTech = useMutation({
    mutationFn: async (deletingId) => {
      return await api.delete(`/users/techs/${deletingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@TOKEN")}`,
        },
      });
    },
    onSuccess: (data, variables) => {
      setTech((prevTech) => prevTech.filter((tech) => tech.id !== variables));
      revalidate();
    },
  });

  const editTech = useMutation({
    mutationFn: async (formData) => {
      const response = await api.put(`/users/techs/${editingTech.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@TOKEN")}`,
        },
      });
      setEditingTech(response.data);
      setTech((prevTech) =>
        prevTech.map((tech) =>
          tech.id === editingTech.id ? response.data : tech
        )
      );
      return response;
    },
    onSuccess: () => {
      revalidate();
    },
  });

  return (
    <TechContext.Provider
      value={{ createTech, deleteTech, editTech, editingTech, setEditingTech }}
    >
      {children}
    </TechContext.Provider>
  );
};
