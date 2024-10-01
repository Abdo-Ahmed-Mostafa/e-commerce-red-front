import React, { useState } from "react";
import loginIcon from "../../assest/signin.gif";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../../helpers/imageTobase64";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
const SingUp = () => {
  const [showPassword, setSowPassword] = useState(false);
  const [showConfirmPassword, setSowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePic: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (data.password == data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.singUp.url, {
        method: SummaryApi.singUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.massage);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.massage);
      }
    } else {
      toast.error("please check your password and confirm password");
    }
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return toast.error("No file selected");
    }

    const imagePic = await imageTobase64(file);
    setData({ ...data, profilePic: imagePic });
  };
  return (
    <section id="singup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 pb-4 cursor-pointer pt-2 text-center absolute bottom-0 w-full">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleUploadPic(e)}
                />
              </label>
            </form>
          </div>
          <form
            className="pt-6 flex flex-col gap-3"
            onSubmit={(e) => handelSubmit(e)}
          >
            <div className="grid  ">
              <label className="p-2">Name : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                  placeholder="enter your name"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid  ">
              <label className="p-2">Email : </label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  value={data.email}
                  required
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
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setSowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="p-2">Confirm Password : </label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={data.confirmPassword}
                  required
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setSowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sing up
            </button>
          </form>
          <p className="my-4">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingUp;
