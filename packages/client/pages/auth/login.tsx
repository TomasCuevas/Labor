import { NextPage } from "next";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

//* components *//
import {
  FormAuthButton,
  FormAuthInput,
  FormErrorMessage,
  RegisterLoginSwitch,
} from "@/components/auth";

//* layout *//
import { AuthLayout } from "@/layouts";

//* form-initial-values and form-validations *//
const initialValues = () => ({
  email: "",
  password: "",
});

const formValidations = () => {
  return Yup.object({
    email: Yup.string().email().required().trim(),
    password: Yup.string().min(6).max(50).required().trim(),
  });
};

//* store *//
import { useAuthStore } from "@/store";

const LoginPage: NextPage = () => {
  const { onLogin } = useAuthStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: formValidations(),
    onSubmit: async (formValues, { setStatus }) => {
      try {
        await onLogin(formValues);
        router.replace("/");
      } catch (error) {
        setStatus(error as string);
      }
    },
  });

  return (
    <AuthLayout
      title="Iniciar sesión | Labor"
      description="Página para iniciar sesión en Labor"
    >
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center px-4 md:px-0">
        <div className="flex w-full flex-col justify-center rounded-2xl bg-white/5 p-4 backdrop-blur-3xl sm:py-6 md:py-8 lg:py-10">
          <RegisterLoginSwitch />
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full flex-col gap-2 sm:gap-4"
          >
            <FormAuthInput
              inputChange={formik.handleChange}
              inputName="email"
              inputValue={formik.values.email}
              label="Correo electrónico"
            />
            <FormAuthInput
              inputChange={formik.handleChange}
              inputName="password"
              inputValue={formik.values.password}
              inputType="password"
              label="Contraseña"
            />
            <FormAuthButton
              isDisabled={
                formik.errors.email || formik.errors.password ? true : false
              }
              label="Iniciar sesión"
              type="submit"
            />
            {formik.status ? (
              <FormErrorMessage message={formik.status} />
            ) : null}
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
