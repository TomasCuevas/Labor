import { FormEvent } from "react";
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

//* store *//
import { useAuthStore } from "../../store";

const RegisterPage: NextPage = () => {
  const { onRegister } = useAuthStore();

  const {
    email,
    name,
    password,
    repeatPassword,
    onInputChange,
    setError,
    error,
  } = useForm({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });

  const router = useRouter();

  //! start register
  const startRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const result = await onRegister({ email, name, password });
    result.ok ? router.replace("/") : setError(result.message);
  };

  return (
    <AuthLayout
      title="Registrarse | Labor"
      description="Página para registrarse en Labor"
    >
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center px-4 md:px-0">
        <div className="flex w-full flex-col justify-center rounded-2xl bg-white/5 p-4 backdrop-blur-3xl sm:py-6 md:py-8 lg:py-10">
          <RegisterLoginSwitch />
          <form onSubmit={startRegister} className="flex w-full flex-col gap-2">
            <FormAuthInput
              inputChange={onInputChange}
              inputName="email"
              inputValue={email}
              label="Correo electrónico"
            />
            <FormAuthInput
              inputChange={onInputChange}
              inputName="name"
              inputValue={name}
              label="Nombre completo"
            />
            <FormAuthInput
              inputChange={onInputChange}
              inputName="password"
              inputValue={password}
              inputType="password"
              label="Contraseña"
            />
            <FormAuthInput
              inputChange={onInputChange}
              inputName="repeatPassword"
              inputValue={repeatPassword}
              inputType="password"
              label="Repita la contraseña"
            />
            <FormAuthButton
              isDisabled={
                email.length < 1 || name.length < 1 || password.length < 6
              }
              label="Registrarme"
              type="submit"
            />
            {error ? <FormErrorMessage message={error} /> : null}
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
