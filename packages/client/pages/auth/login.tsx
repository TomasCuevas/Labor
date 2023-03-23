import { useContext, FormEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import {
  FormAuthButton,
  FormAuthInput,
  FormErrorMessage,
  RegisterLoginSwitch,
} from "../../components/auth";

//* layout *//
import { AuthLayout } from "../../layouts";

//* hooks *//
import { useForm } from "../../hooks/useForm";

//* context *//
import { AuthContext } from "../../context";

const LoginPage: NextPage = () => {
  const { onLogin } = useContext(AuthContext);
  const { email, password, onInputChange, formValues, setError, error } =
    useForm({
      email: "",
      password: "",
    });

  const router = useRouter();

  //! start login
  const startLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await onLogin(formValues);
    if (result.ok) {
      router.replace("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthLayout
      title="Iniciar sesión | Labor"
      description="Página para iniciar sesión en Labor"
    >
      <div className="flex w-full flex-col justify-center">
        <RegisterLoginSwitch />
        <form onSubmit={startLogin} className="flex w-full flex-col gap-2">
          <FormAuthInput
            inputChange={onInputChange}
            inputName="email"
            inputValue={email}
            label="Correo electrónico"
          />
          <FormAuthInput
            inputChange={onInputChange}
            inputName="password"
            inputValue={password}
            inputType="password"
            label="Contraseña"
          />
          <FormAuthButton
            isDisabled={email.length < 1 || password.length < 6}
            label="Iniciar sesión"
            type="submit"
          />
          {error ? <FormErrorMessage message={error} /> : null}
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
