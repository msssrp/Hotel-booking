import React from 'react'
import FirstImg from '../img/1407953244000-177513283.webp'
import SecImg from '../img/cq5dam.web.1280.1280.jpeg'
import ThirdImg from '../img/Hotel-Room-Types_4.webp'
import FourtImg from '../img/ice-2108712-99709224-376800.jpg'
import FiftImg from '../img/pasted image 0.png'


function PopularDestinations() {

   

  return (
    <div className='flex justify-center items-center mt-[6.25rem] font-Inter'>
        <div className='grid grid-rows-2 grid-cols-4 gap-4 grid-rows-[320px_90px]  w-[37.5rem]'>
        <a className='cursor-pointer col-span-4' onClick={()=> handleOnclick()}><img className='h-[100%] w-[100%]  rounded-md' src={FirstImg} alt="" /></a>
        <a className='cursor-pointer' onClick={()=> handleOnclick(2)}><img src={SecImg} className='h-[100%] w-[100%] rounded-md' alt="" /></a>
        <a className='cursor-pointer' onClick={()=> handleOnclick(3)}><img src={ThirdImg} className='h-[100%] w-[100%] rounded-md' alt="" /></a>
        <a className='cursor-pointer' onClick={()=> handleOnclick(4)}><img src={FourtImg} className='h-[100%] w-[100%] rounded-md' alt="" /></a>
        <a className='cursor-pointer' onClick={()=> handleOnclick(5)}><img src={FiftImg} className='h-[100%] w-[100%] rounded-md' alt="" /></a>
        </div>
        <div className='flex flex-col w-[24rem] h-[250px] ml-[7.5rem]'>
            <div className="head-topic font-bold text-[36px] mb-[0.625rem]">
                <p>Popular <br/>Destination</p>
            </div>
            <div>
                <span className='text-[#9CA3AF]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo sed accusamus, at impedit expedita beatae.</span>
            </div>
            <div className='mt-[14px]'>
            <a className='border border-[#9CA3AF] p-[10px] rounded-md cursor-pointer text-center text-[14px] text-[#8A91A1]'>Start Your Search</a>
            </div>
        </div>
    </div>
  )
}

export default PopularDestinations