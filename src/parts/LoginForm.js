import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import users from "constants/api/users";

import { setAuthorizationHeader } from "configs/axios";

import { populateProfile } from "store/actions/users";
import Input from "components/Form/Input";
import fieldErrors from "helpers/fieldErrors";

import useForm from "helpers/hooks/useForm";

function LoginForm({ history }) {
  const dispatch = useDispatch();

  const [{ email, password }, setState] = useForm({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState(null);

  function submit(e) {
    e.preventDefault();

    users
      .login({ email, password })
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        users.details().then((detail) => {
          dispatch(populateProfile(detail.data));
          const production =
            process.env.REACT_APP_FRONTPAGE_URL === "https://dimaspurwanto.xyz"
              ? "Domain = dimaspurwanto.xyz"
              : "";
          localStorage.setItem(
            "BWAMICRO:token",
            JSON.stringify({
              ...res.data,
              email: email,
            })
          );

          const redirect = localStorage.getItem("BWAMICRO:redirect");
          const userCookie = {
            name: detail.data.name,
            thumbnail: detail.data.avatar,
          };

          const expires = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          );

          document.cookie = `BWAMICRO:user=${JSON.stringify(
            userCookie
          )}; expires=${expires.toUTCString()}; path:/; ${production}`;

          history.push(redirect || "/");
        });
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
        console.log(err?.response?.data?.message);
      });
  }
  const ERRORS = fieldErrors(errors);

  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-5/12 hidden sm:block justify-end pt-24 pr-16">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div
            className="absolute border-orange-400 border-2 -mt-8 -ml-16 left-0"
            style={{ width: 370, height: 550 }}
          ></div>
          <div className="absolute w-full h-full -mb-8 -ml-8">
            <img
              src="/assets/images/tamara caem.jpg"
              alt="Mbak tamara caem juga"
            />
          </div>
          <div
            className="absolute z-10 bg-white bottom-0 right-0 py-3 px-4 -mr-12"
            style={{ width: 290 }}
          >
            <p className="text-gray-900 mb-2">
              Metode belajar yang santai dan seru seperti nonton film drakor
            </p>
            <span className="text-gray-600">Yana, Apps Developer</span>
          </div>
        </div>
      </div>

      <div className="w-1/12 hidden sm:block"></div>

      <div className="w-full sm:w-3/12">
        <h1 className="text-4xl text-gray-900 mb-6">
          <span className="font-bold">Selesaikan</span> yang <br />
          Kamu <span className="font-bold">Mulai</span>
        </h1>
        <form onSubmit={submit}>
          <div className="flex flex-col">
            <Input
              value={email}
              error={ERRORS?.email?.message}
              name="email"
              type="email"
              onChange={setState}
              placeholder="Alamat email kamu"
              labelName="Alamat Email"
            />
          </div>

          <div className="flex flex-col">
            <Input
              value={password}
              error={ERRORS?.password?.message}
              name="password"
              type="password"
              onChange={setState}
              placeholder="Password kamu"
              labelName="Password"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner rounded-md text-white px-6 py-3 mt-2 w-full"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
