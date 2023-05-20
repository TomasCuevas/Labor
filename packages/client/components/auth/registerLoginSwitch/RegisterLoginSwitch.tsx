import Link from "next/link";
import { useRouter } from "next/router";

export const RegisterLoginSwitch: React.FC = () => {
  const router = useRouter();

  return (
    <div className="mb-5 flex items-center gap-2">
      <Link href="/auth/login">
        <span
          className={
            router.pathname === "/auth/login"
              ? "cursor-pointer border-b-2 border-emerald text-xl font-light text-white"
              : "cursor-pointer border-b-2 border-[#0000] text-xl font-light text-light"
          }
        >
          Iniciar sesión
        </span>
      </Link>
      <span className="text-md text-light">o</span>
      <Link href="/auth/register">
        <span
          className={
            router.pathname === "/auth/register"
              ? "cursor-pointer border-b-2 border-emerald text-xl font-light text-white"
              : "cursor-pointer border-b-2 border-[#0000] text-xl font-light text-light"
          }
        >
          Registrarse
        </span>
      </Link>
    </div>
  );
};
