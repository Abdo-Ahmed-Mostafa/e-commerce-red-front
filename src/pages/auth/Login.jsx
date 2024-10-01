import React, { useContext, useState } from "react";
import loginIcon from "../../assest/signin.gif";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Context from "../../context";
const Login = () => {
  const [showPassword, setSowPassword] = useState(false);
  const { fetchCartProductCount } = useContext(Context);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.singIn.url, {
        method: SummaryApi.singIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataAPi = await dataResponse.json();
      if (dataAPi.success) {
        toast.success(dataAPi.massage);
        navigate("/");
        await fetchUserDetails();
        fetchCartProductCount();
      }
      if (dataAPi.error) {
        toast.error(dataAPi.massage);
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <section id="login" className="min-h-[calc(100vh-120px)]">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20  mx-auto">
            <img src={loginIcon} alt="login icons" className="rounded-full" />
          </div>
          <form
            className="pt-6 flex flex-col gap-3"
            onSubmit={(e) => handelSubmit(e)}
          >
            <div className="grid  ">
              <label className="p-2">Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="p-2">Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setSowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forget-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forget Password
              </Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="my-4">
            Don't have account ?{" "}
            <Link
              to={"/sing-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sing Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
