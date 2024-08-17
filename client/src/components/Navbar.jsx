import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

import logo from '../../images/logo2.png'
import { useState } from 'react'

const NavbarItem = ({ title, classProps }) => {
  let url = ''
  if (title === "Market") {
    url = "https://coinmarketcap.com/"
  } else if (title === "Exchange") {
    url = "https://conotoxia.com/cryptocurrencies/cryptocurrency-rates"
  } else if (title === "Tutorials") {
    url = "https://www.tutorialspoint.com/solidity/index.htm"
  } else if (title === "Wallets") {
    url = "https://money.com/best-crypto-wallets/"
  }
  return (
  <li className={`mx-4 cursor-pointer ${classProps}`}>
    <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
  </li>
  )
}

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.4] flex-initial justify-center items-center'>
        <img src={logo} alt="logo" className='w-64'/>
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => {
          return <NavbarItem key={item+index} title={item} />
        })}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md green-glassmorphism text-white animate-slide-in 
            "
          >
            <li className='text-xl w-full my-2'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavbarItem key={item+index} title={item} classProps="my-2 text-lg" />
            )}
          </ul>
        )}
      </div>
    </nav>
  )
};
