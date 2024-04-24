"use client";
import React, { useEffect, useState } from "react";
import Button from "../../../components/base/button/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import TextLoading from "@/components/base/loading/text-loading";

const Signup = () => {
  const useAu = useAuth();
  const router = useRouter();

  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // check email format
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignup = () => {
    // if signup ok
    if (email === "" || password === "") {
      setErrorMessage("Ecrire email et mot de passe s'il vous plaît");
    } else {
      if (validateEmail(email)) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // console.log(user);
            if (
              typeof window !== "undefined" &&
              typeof localStorage !== "undefined"
            ) {
              localStorage.setItem("is-login", "true");
              router.push("/");
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          });
      } else {
        setErrorMessage("Email n'est pas validate");
      }
    }
  };

  useEffect(() => {
    const logStatus = useAu.isLoggedin();
    setLogin(logStatus);
    setLoading(false);
  });

  return (
    <div>
      {loading || isLogin ? (
        <TextLoading />
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  S'inscrire
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>

                  <div className="text-red-500">{errorMessage}</div>
                  <div className="text-center">
                    <Button
                      title="S'inscrire'"
                      onClick={handleSignup}
                      bgColor="blue"
                    />
                  </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                    Vous avez un compte?
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2 hover:cursor-pointer"
                      href="/auth/login"
                    >
                      Connecter
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Signup;
