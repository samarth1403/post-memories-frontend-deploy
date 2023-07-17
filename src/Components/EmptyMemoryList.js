import React from 'react';
import { Link } from 'react-router-dom';

const EmptyMemoryList = () => {
  return (
    <div className="">
      <div
        style={{
          background:
            "linear-gradient(179.96deg, #D9D9D9 0.03%, rgba(217, 217, 217, 0) 112.46%)",
        }}
        className="flex flex-col flex-wrap justify-center items-center w-[360px] sm:w-[400px] md:w-[500px] lg:w-[700px] rounded-tl-[50px] rounded-br-[50px] md:rounded-tl-[100px] md:rounded-br-[100px] px-4 py-8 mx-12 my-4"
      >
      
        <div
          style={{
            background: "linear-gradient(180deg, #FFD976 0%, #FF6464 100%)",
          }}
          className="flex flex-col flex-wrap justify-center items-center w-[260px] sm:w-[300px] md:w-[400px] lg:w-[500px] md:rounded-tl-[100px] md:rounded-br-[100px] rounded-tl-[50px] rounded-br-[50px] px-4 py-6 m-8
        "
        >
          <p className="font-roboto font-bold leading-normal text-[#0D103C] text-2xl md:text-3xl text-center m-8">
            Create your memories on the block
          </p>
          <Link to="/add-memory-page">
            <button
              style={{ boxShadow: "8px 8px 4px #0D103C" }}
              className="bg-[#fff] font-roboto font-bold leading-normal text-[#0D103C] text-2xl md:text-3xl text-center m-2 md:mb-16 px-8 py-4 rounded-[20px]"
            >
              Create Memory
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyMemoryList