"use client";

import { Formik } from "formik";
import Link from "next/link";
import Input from "../components/ui/Input";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/ui/Button";

export default function Page() {
  const router = useRouter();
  const [loginIsInvalid, setLoginIsInvalid] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (values.email === "email@email" && values.password === "password") {
      router.push("/dashboard");
    } else {
      setLoginIsInvalid(true);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  return (
    <div className="h-screen bg-[url('/images/bg_login.jpg')] bg-center">
      <div className="bg-black/10 backdrop-blur-[1px] w-screen h-screen flex flex-col items-center justify-center">
        <div className="bg-slate-100 p-10 rounded-lg">
          <h1 className="text-3xl text-center mb-10">Entrar</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await handleSubmit(values);
              setSubmitting(false);
            }}
            validationSchema={LoginSchema}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              isSubmitting,
              touched,
            }) => (
              <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  label="E-mail"
                  value={values.email}
                  onChange={handleChange}
                  errors={errors.email && touched.email ? errors.email : ""}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  label="Senha"
                  value={values.password}
                  onChange={handleChange}
                  errors={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
                {loginIsInvalid && (
                  <span className="text-red-700">
                    E-mail ou senha inválidos
                  </span>
                )}
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  color="primary"
                >
                  Entrar
                </Button>
              </form>
            )}
          </Formik>
          <Link href="/create-account">
            <Button type="button" color="primaryOutline" className="mt-3">Não tem uma conta? Crie uma agora.</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
