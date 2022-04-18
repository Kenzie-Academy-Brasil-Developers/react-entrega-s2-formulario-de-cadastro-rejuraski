import "./index.css";
import happyface from "../../../img/happyface.png";

import { useHistory, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const Welcome = ({ dataBase }) => {
  const history = useHistory();
  const params = useParams();
  const info = dataBase.find((user) => user.email === params.email);

  return (
    <div className="container--welcome">
      <p className="welcome">Bem-vindo {info.username}</p>
      <img className="img" src={happyface} alt="carinha feliz" />
      <Button
        onClick={() => history.push("/")}
        variant="text"
        color="secondary"
      >
        Voltar
      </Button>
    </div>
  );
};

export default Welcome;
