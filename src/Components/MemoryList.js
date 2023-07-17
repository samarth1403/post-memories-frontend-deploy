import React  from 'react'
import { useSelector } from 'react-redux';
import MemoryItem from './MemoryItem'

const MemoryList = () => {
  const {gotUser} = useSelector((state)=>state.user);

  const renderedMemoriesList = gotUser?.memories.map((memory)=>{
    return (
      <div key={memory?._id}>
        <MemoryItem memory={memory}/>
      </div>
    );
  })
  return (
    <div className="flex flex-row flex-wrap justify-center items-start px-8">
      {renderedMemoriesList}
    </div>
  );
}

export default MemoryList