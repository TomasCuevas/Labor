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
  name: "",
  password: "",
  repeatPassword: "",
});

const formValidations = () => {
  return Yup.object({
    email: Yup.string().email().required().trim(),
    name: Yup.string().min(1).max(46).required().trim(),
    password: Yup.string().min(6).max(50).required().trim(),
    repeatPassword: Yup.string().min(6).max(50).required().trim(),
  });
};

//* store *//
import { useAuthStore } from "@/store";

const RegisterPage: NextPage = () => {
  const { onRegister } = useAuthStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: formValidations(),
    onSubmit: async (formValues, { setStatus }) => {
      if (formValues.password !== formValues.repeatPassword) {
        setStatus("Las contraseñas no coinciden.");
        return;
      }

      try {
        const { repeatPassword, ...values } = formValues;
        await onRegister(values);
        router.replace("/");
      } catch (error) {
        setStatus(error as string);
      }
    },
  });

  return (
    <AuthLayout
      title="Registrarse | Labor"
      description="Página para registrarse en Labor"
    >
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center px-4 md:px-0">
        <div className="flex w-full flex-col justify-center rounded-2xl bg-white/5 p-4 backdrop-blur-3xl sm:py-6 md:py-8 lg:py-10">
          <RegisterLoginSwitch />
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full flex-col gap-2"
          >
            <FormAuthInput
              inputChange={formik.handleChange}
              inputName="email"
              inputValue={formik.values.email}
              label="Correo electrónico"
            />
            <FormAuthInput
              inputChange={formik.handleChange}
              inputName="name"
              inputValue={formik.values.name}
              label="Nombre completo"
            />
            <FormAuthInput
              inputChange={formik.handleChange}
              inputName="password"
              inputValue={formik.values.password}
              inputType="password"
              label="Contraseña"
            />
            <FormAuthInput
              inputChange={formik.handleChange}
              inputName="repeatPassword"
              inputValue={formik.values.repeatPassword}
              inputType="password"
              label="Repita la contraseña"
            />
            <FormAuthButton
              isDisabled={
                formik.errors.email ||
                formik.errors.name ||
                formik.errors.password ||
                formik.errors.repeatPassword
                  ? true
                  : false
              }
              label="Registrarme"
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

export default RegisterPage;
