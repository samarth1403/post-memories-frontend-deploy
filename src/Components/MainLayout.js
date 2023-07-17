import React from 'react'
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from 'react-router-dom';
import Header from './Header';
import {ToastContainer} from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        className="text-xl"
      />
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout