import React from 'react';
import { ImSpinner3 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className='flex  flex-col justify-center items-center my-36'>
       <ImSpinner3 size={50} className='text-primary  animate-spin'/>
       <h2 className='text-gray-700 text-lg'>Please Wait</h2>
    </div>
  )
}

export default Spinner
