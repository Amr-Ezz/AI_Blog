import React from 'react'

const Navbar = () => {
  return (
<div className="bg-[#27293d] flex items-center p-4 shadow-md text-[#fff]">
<h1 className='font-bold text-xl text-[#00c6ff]'>Blog AI</h1>
<div className='flex-grow'></div>
<div className=' flex flex-col px-4'>
  <p>UserName</p>
  <p>User@gmail.com</p>


</div>
<button className='button-base bg-[#00c6ff] text-[#1e1e2f]
  hover:bg-[#00a5dd]'> Logout</button>
</div>
  )
}

export default Navbar