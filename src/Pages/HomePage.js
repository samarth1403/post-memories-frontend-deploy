import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyMemoryList from '../Components/EmptyMemoryList'
import MemoryList from '../Components/MemoryList'
import { getUser } from '../features/user/userSlice'
import Spinner from '../Components/ReusableComponents/Spinner'

const HomePage = () => {
    const dispatch = useDispatch();
    const { Token, gotUser, isLoading } = useSelector((state) => state.user);

    useEffect(() => {
      dispatch(getUser({ Token: Token }));
    }, []);

  return (
    <div className="flex flex-row flex-no-wrap justify-center items-start w-[100%] px-6 py-8">
      {!isLoading && 
      <>
      
    { gotUser?.memories?.length > 0 ? (
        <MemoryList />
      ) : (
        <EmptyMemoryList />
      )}
      
      </>  
      }

  
      {isLoading && <Spinner/> }
    </div>
  );
}

export default HomePage