import "./styles/index.scss";
import 'react-toastify/dist/ReactToastify.css';
import { RoutesMain } from "./routes";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <RoutesMain />
      <ToastContainer />
    </>
  );
};

