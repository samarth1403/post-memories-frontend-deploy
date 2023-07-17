import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./ReusableComponents/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Dropzone from "react-dropzone";
import {
  createAMemory,
  deleteUploadedImage,
  getMemory,
  resetImageState,
  updateMemory,
  uploadImage,
} from "../features/memory/memorySlice";
import Spinner from "./ReusableComponents/Spinner";

const UpdateMemoryComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const memoryId = location.pathname.split("/")[2];
  const { isLoading, gotMemory, image } = useSelector((state) => state.memory);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    tags: "",
    img: "",
    date:""
  });

  const stableGetMemory = useCallback(() => {
    dispatch(getMemory({ id: memoryId, Token: Token }));
  }, [memoryId]);

  useEffect(() => {
    stableGetMemory();
  }, [stableGetMemory]);

  useEffect(() => {
    setFormValues({title:gotMemory?.title , description:gotMemory?.description , tags:gotMemory?.tags,date : changeDateFormat(gotMemory?.date) , img : gotMemory?.image})
  },[gotMemory]);

  const [isImgUploaded, setIsImgUploaded] = useState(false);
  const { Token } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((formValues.img || image) !== null) {
      dispatch(
        updateMemory({
          body: {
            title: formValues?.title,
            description: formValues?.description,
            tags: formValues?.tags,
            date: formValues?.date,
            image: image || formValues?.img,
          },
          Token: Token,
          id: memoryId,
        })
      );
      setIsImgUploaded(false);
      setTimeout(() => {
        setFormValues(null);
        dispatch(resetImageState());
        navigate("/");
      }, 100);
    }
  };

  const stableHandleUploadImage = useCallback(() => {
    if (image !== null) {
      setIsImgUploaded(true);
    }
  }, [image]);

  useEffect(() => {
    stableHandleUploadImage();
  }, [stableHandleUploadImage]);

  const handleClickUploadImage = (file) => {
    dispatch(uploadImage(file));
    setTimeout(()=>{
    setFormValues({
      title: gotMemory?.title,
      description: gotMemory?.description,
      tags: gotMemory?.tags,
      date: changeDateFormat(gotMemory?.date),
      img: null,
    });
    },100)
  };

  const handleDeleteUploadedImage = (id) => {
    setFormValues({
      title: gotMemory?.title,
      description: gotMemory?.description,
      tags: gotMemory?.tags,
      date: changeDateFormat(gotMemory?.date),
      img: null,
    });
    dispatch(deleteUploadedImage({ id: id, Token: Token }));
  };

      const correctDateFormat = (inputDate) => {
        const [year, month, day] = inputDate.split("-");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };
      const changeDateFormat = (date) => {
        const newDate = new Date(date)?.toLocaleDateString();
        const [month, day, year] = newDate.split("/");
        const inputDate = [year, month, day].join("-");
        return correctDateFormat(inputDate);
      };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center p-8">
      <p className="font-roboto font-bold text-[#fff] text-3xl mb-8">
        Update a Memory
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "linear-gradient(180deg, #FFD976 0%, #FF6464 100%)",
        }}
        className="flex flex-col flex-no-wrap justify-center items-center w-[360px] lg:w-[450px] rounded-[30px]"
      >
        <div className="flex justify-start items-center bg-[#0D103C] w-[300px] lg:w-[400px] h-[75px] text-[#fff] text-[#fff] font-roboto font-[400] text-xl rounded-[15px] px-4 pr-8 m-4">
          <Dropzone
            onDrop={(acceptedFiles) => handleClickUploadImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <div className="flex flex-row">
                    {isLoading && <Spinner />}
                    {isLoading === false && (
                      <p className="cursor-pointer">
                        {isImgUploaded && formValues.img !== null
                          ? "Uploaded Image"
                          : "Upload Image of Memory"}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {formValues.img !== null && (
          <div className="flex flex-col flex-no-wrap justify-center items-center">
            {formValues?.img !== null && (
              <div className="relative">
                <div
                  onClick={() =>
                    handleDeleteUploadedImage(formValues?.img?.public_id)
                  }
                  className="btn-close absolute top-0 right-0 cursor-pointer"
                >
                  <AiFillCloseCircle className="text-3xl" />
                </div>
                <img
                  src={formValues?.img?.url}
                  alt=""
                  className="w-[200px] h-[200px] rounded-[15px] m-2"
                />
              </div>
            )}
          </div>
        )}
        {image !== null && (
          <div className="flex flex-col flex-no-wrap justify-center items-center">
            {isImgUploaded && image !== null && (
              <div className="relative">
                <div
                  onClick={() => handleDeleteUploadedImage(image.public_id)}
                  className="btn-close absolute top-0 right-0 cursor-pointer"
                >
                  <AiFillCloseCircle className="text-3xl" />
                </div>
                <img
                  src={image.url}
                  alt=""
                  className="w-[200px] h-[200px] rounded-[15px] m-2"
                />
              </div>
            )}
          </div>
        )}
        <Input
          className="form-control bg-[#0D103C] w-[300px] lg:w-[400px] h-[75px] text-[#fff] px-4  m-4"
          id="date"
          type="date"
          placeholder="Enter Expiry Date"
          name="date"
          value={formValues.date || ""}
          onChange={handleOnChange}
          // value={formik.values.expiry}
          // onChange={formik.handleChange("expiry")}
          // onBlur={formik.handleBlur("expiry")}
        />
        <Input
          className="bg-[#0D103C] w-[300px] lg:w-[400px] h-[75px] text-[#fff] px-4  m-4"
          id="title"
          type="text"
          placeholder="Title"
          name="title"
          value={formValues.title || ""}
          onChange={handleOnChange}
        />

        <textarea
          className="font-roboto font-[400] text-xl rounded-[15px] bg-[#0D103C] w-[300px] lg:w-[400px] h-[150px] text-[#fff]
            text-start p-4 m-4"
          id="description"
          type="text"
          placeholder="Description"
          name="description"
          value={formValues.description || ""}
          onChange={handleOnChange}
        />

        <Input
          className="bg-[#0D103C] w-[300px] lg:w-[400px] h-[75px] text-[#fff] px-4  m-4"
          id="tags"
          type="text"
          placeholder="Tags"
          name="tags"
          value={formValues.tags || ""}
          onChange={handleOnChange}
        />
        <button
          type="submit"
          style={{ boxShadow: "8px 8px 4px #0D103C" }}
          className="bg-[#fff] w-[135px] h-[75px] font-roboto font-bold text-2xl text-[#0D103C] rounded-[20px]  px-4 mx-4 mt-4 mb-8 align-left"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMemoryComponent;
