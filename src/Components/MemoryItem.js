import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { deleteMemory, deleteUploadedImage, getMemory, updateMemory } from '../features/memory/memorySlice';
import { getUser } from '../features/user/userSlice';
import {useNavigate } from "react-router-dom";

const MemoryItem = ({memory}) => {

  const dispatch = useDispatch();
  const [openImageModal , setOpenImageModal] = useState(false);
  const {Token} = useSelector((state)=>state.user);
  const {gotMemory} = useSelector((state)=>state.memory);
  const imageId = gotMemory?.image?.public_id;
  const navigate = useNavigate();
  const handleClickDelete = (id) => {
    dispatch(getMemory({id,Token}));
    // eslint-disable-next-line no-restricted-globals
    if(confirm("Are you sure to Delete")=== true){
      dispatch(deleteMemory({ id, Token }));
      setTimeout(() => {
        dispatch(deleteUploadedImage({ id: imageId, Token: Token }));
        dispatch(getUser({ Token: Token }));
      }, 100);
    }
  }

  let DateNew = new Date(memory?.date).toDateString();

  const handleClickEdit = (id) => {
    navigate(`/update-memory-page/${id}`);
  }

  const handleClick = (url) => {
    setOpenImageModal(true);
    setTimeout(()=>{
      setOpenImageModal(false);
    },1000)
  }

  return (
    <div
      className="relative flex flex-col flex-no-wrap flex-shrink-0 justify-center rounded-[33px] min-[320px]:w-[300px] sm:w-[380px] mb-12 mt-4 px-4"
      style={{
        borderRadius: "50px",
        background:
          "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.76) 0.01%, #C58AFF 0.02%, #E1C6FC 100%)",
      }}
    >
      {openImageModal && (
        <div className="absolute">
          <img
            src={memory?.image?.url}
            alt="Memory Item"
            className="min-[320px]:w-[300px] min-[320px]:h-[300px] sm:w-[380px] sm:h-[380px] rounded-[20px] cursor-pointer"
          />
        </div>
      )}
      <div className="flex flex-row flex-no-wrap justify-center items-start my-2">
        <img
          onClick={() => {
            handleClick(memory?.image?.url);
          }}
          src={memory?.image?.url}
          alt="Memory Item"
          className="min-[320px]:w-[140px] min-[320px]:h-[140px] sm:w-[200px] sm:h-[200px] rounded-[20px] my-4 cursor-pointer"
        />
        <div className="flex flex-col flex-no-wrap px-4 justify-center items-start">
          <div className="font-roboto font-normal text-md px-2 mt-3">
            Memory of <p className="font-bold">{DateNew}</p>
          </div>
          <p className="font-roboto font-bold text-lg px-2 mt-3">
            {memory?.title}
          </p>

          {/* <div className="flex flex-row flex-no-wrap justify-between px-2 pt-3 pb-6">
          <button className="px-4 mr-4 py-2 rounded-[12px]">Like</button>
          <button
            onClick={handleClickDelete}
            className="px-4 mr-4 py-2 rounded-[12px]"
          >
            Delete
          </button>
        </div> */}
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="font-roboto font-medium text-md px-2 mt-3">
          #{memory?.tags}
        </p>
        <p className="font-roboto text-justify font-medium text-md px-2 mt-3">
          {memory?.description}
        </p>
      </div>
      <div className="flex flex-row flex-no-wrap justify-between items-center px-2 pb-4 px-6">
        <button
          onClick={() => handleClickEdit(memory?._id)}
          className="btn-close"
        >
          <GrEdit className="text-2xl text-[#0D103C]" />
        </button>
        <button
          onClick={() => handleClickDelete(memory?._id)}
          className="btn-close"
        >
          <MdDelete className="text-3xl text-[#0D103C]" />
        </button>
      </div>
    </div>
  );
}

export default MemoryItem