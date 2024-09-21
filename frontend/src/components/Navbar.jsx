import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {IoMenuSharp} from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
const navLinks=[
    {name:"Home", path:"/"},
    {name:"About us", path:"/about-us"},
    {name:"privacy Policy", path:"/privacy-policy"},
    {name:"Contact us", path:"/contact-us"},
]
const Navbar = () => {
    const [isMenuOpen, setIsmenuOpen]=useState(false);
    const toggleMenu = () => setIsmenuOpen(!isMenuOpen);
  return (
    <header className='bg-white py-6 border '>
        <nav className='container sm:max-w-[1200px] mx-auto flex justify-between px-5'>
            <a href='/'>
            <img src='/logo.png' className='h-12'/>
            </a>
            <ul className='sm:flex hidden  items-center gap-8'>
               {
                navLinks.map((list, index)=>(
                    <li key={index}>
                        <NavLink to={`${list.path}`} className={({isActive})=>
                        isActive? "active":""

                        }>{list.name}</NavLink>
                    </li>
                ))
               }
               <li>
                <NavLink to='/login'>Login</NavLink>
               </li>
            </ul>
             {/* toggle menu  */}
            <div className='flex items-center sm:hidden'>
                <button onClick={toggleMenu} className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm'>
                    {
                        isMenuOpen? <IoClose className='size-6'/>:<IoMenuSharp className='size-6'/>
                    }
                    </button>
            </div>
        </nav>
         {/* mobile menu items  */}
         {
            isMenuOpen &&  (
                <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50 '>
                {
                 navLinks.map((list, index)=>(
                     <li className='mt-5 px-4'>
                         <NavLink onClick={()=>setIsmenuOpen(false)} to={`${list.path}`} className={({isActive})=>
                         isActive? "active":""
 
                         }>{list.name}</NavLink>
                     </li>
                 ))
                }
                <li className='px-4 mt-5'>
                 <NavLink to='/login'>Login</NavLink>
                </li>
             </ul>
            )
         }
    </header>
  )
}

export default Navbar