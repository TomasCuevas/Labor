import { FormEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import {
  FormAuthButton,
  FormAuthInput,
  FormErrorMessage,
  RegisterLoginSwitch,
} from "@/components/auth";

//* layout *//
import { AuthLayout } from "@/layouts";

//* hooks *//
import { useForm } from "@/hooks";

//* store *//
import { useAuthStore } from "@/store";

const LoginPage: NextPage = () => {
  const { onLogin } = useAuthStore();

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
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center px-4 md:px-0">
        <div className="flex w-full flex-col justify-center rounded-2xl bg-white/5 p-4 backdrop-blur-3xl sm:py-6 md:py-8 lg:py-10">
          <RegisterLoginSwitch />
          <form
            onSubmit={startLogin}
            className="flex w-full flex-col gap-2 sm:gap-4"
          >
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
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
