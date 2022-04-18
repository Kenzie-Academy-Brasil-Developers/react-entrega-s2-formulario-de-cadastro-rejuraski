import "./index.css";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const Form = ({ dataBase, setDataBase }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Required field")
      .min(3, "Mínimo 3 caracteres"),
    email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Mínimo 8 caracteres")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "A senha deve conter pelo menos um caractere maiúsculo, um número e um caractere especial"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "A senha não corresponde"),
    terms: yup.boolean().isTrue("Os termos não foram aceitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onRegister = (data) => {
    delete data.confirmPassword;
    console.log(data);
    setDataBase([...dataBase, data]);
    history.push(`/welcome/${data.email}`);
  };

  return (
    <div className="container--form">
      <form className="form" onSubmit={handleSubmit(onRegister)}>
        <TextField
          {...register("username")}
          margin="dense"
          label="Nome"
          variant="standard"
          required
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}

        <TextField
          {...register("email")}
          margin="dense"
          label="Email"
          variant="standard"
          required
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <TextField
          {...register("password")}
          margin="dense"
          type="password"
          label="Senha"
          variant="standard"
          required
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        <TextField
          {...register("confirmPassword")}
          margin="dense"
          type="password"
          label="Confirme sua senha"
          variant="standard"
          required
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}

        <Button type="submit" variant="text" color="secondary">
          Crie sua conta
        </Button>
      </form>
    </div>
  );
};

export default Form;
