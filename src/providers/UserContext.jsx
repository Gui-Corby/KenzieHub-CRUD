import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tech, setTech] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("@USERID");
    const token = localStorage.getItem("@TOKEN");

    const autoLogin = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        setTech(data.techs);
        navigate("/");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("@USERID");
        localStorage.removeItem("@TOKEN");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      autoLogin();
    }
  }, [navigate]);

  const userLogin = async (formData) => {
    try {
      const { data } = await api.post("/sessions", formData);
      setUser(data.user);
      setTech(data.user.techs);
      localStorage.setItem("@USERID", data.user.id);
      localStorage.setItem("@TOKEN", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível fazer Login, tente novamente");
    }
  };

  const userRegister = async (formData) => {
    try {
      const { data } = await api.post("/users", formData);

      toast.success("Conta criada com sucesso!");
      setUser(data);

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Ops! Algo deu errado");
    }
  };

  const userLogout = () => {
    setUser(null);
    setTech([]);
    localStorage.removeItem("@USERID");
    localStorage.removeItem("@TOKEN");
    navigate("/");
  };

  return (
    <userContext.Provider
      value={{
        user,
        tech,
        setTech,
        userLogin,
        userRegister,
        userLogout,
        loading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
