import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";
const ChangeUserRole = ({
  email,
  name,
  role,
  userId,
  setOpenUpdateRole,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {
    console.log("done");
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId,
        role: userRole,
      }),
    });
    const dataResponse = await fetchResponse.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      setOpenUpdateRole(false);
      callFunc();
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0  h-full w-full  flex justify-between items-center bg-slate-200 bg-opacity-50 ">
      <div className="w-full mx-auto bg-white shadow-md p-4 max-w-xs">
        <div>
          <button
            className="block ml-auto"
            onClick={() => setOpenUpdateRole(false)}
          >
            <IoMdClose />
          </button>
        </div>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Email :{email}</p>
        <p>Name :{name}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className=" w-fit mx-auto block  py-1 px-3 bg-red-600 text-white hover:bg-red-700 rounded-full  "
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
