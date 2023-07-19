import React from 'react';
import { BiLogOutCircle } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import person from "../images/person.svg";

const Header = () => {
  const {user} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.info("Logged Out Successfully");
    localStorage.clear();
    window.location.pathname = "/";
    navigate("/");
  };
  return (
    <div className="flex flex-row flex-wrap justify-center sm:justify-center items-center w-[100%] mt-8 px-16">
      <div className="flex grow justify-center items-center my-2">
        <Link to="/">
          <p className="leading-snug ont-roboto font-bold text-center items-center text-[#FEE77A] text-5xl lg:ml-36">
            {`Memories `}
            <span className="font-medium text-3xl align-middle">
              {user !== null ? `of ${user?.name}` : ""}
            </span>
          </p>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center my-2">
        <Link to="/add-memory-page">
          <MdAddCircleOutline className="text-5xl text-[#fff] mx-6" />
        </Link>
        <Link
          to={user === null ? "/sign-in-page" : "/my-profile"}
          className="my-2 mx-4"
        >
          {user === null ? (
            <img src={person} alt="person icon" />
          ) : (
            <div className="w-[40px] h-[40px] bg-red-200 flex flex row justify-center items-center rounded-full">
              <p className="font-roboto font-bold text-xl text-center">
                {user?.name?.substr(0, 1)}
              </p>
            </div>
          )}
        </Link>
        {user !== null && (
          <button
            className="font-roboto font-bold text-xl text-center text-white mx-2"
            onClick={handleLogout}
          >
            <BiLogOutCircle className="text-5xl text-[#fff] mx-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Header