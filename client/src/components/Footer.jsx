import logo from '../../images/logo2.png'

export default function Footer() {
  return (
    <div className='w-full flex md:justify-center justify-between items-center flex-col p-4'>
      <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
        <div className='flex flex-[0.5] justify-center items-center'>
          <img src={logo} alt='logo' className='w-48'/>
        </div>
        <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            <a href="https://coinmarketcap.com/" target="_blank" rel="noopener noreferrer">Market</a>
          </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            <a href="https://conotoxia.com/cryptocurrencies/cryptocurrency-rates" target="_blank" rel="noopener noreferrer">Exchange</a>
          </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            <a href="https://www.tutorialspoint.com/solidity/index.htm" target="_blank" rel="noopener noreferrer">Tutorials</a>
          </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'>
            <a href="https://money.com/best-crypto-wallets/" target="_blank" rel="noopener noreferrer">Wallets</a>
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center flex-col mt-5'>
        <p className='text-white text-sm text-center'>Come Join Us</p>
        <p className='text-white text-sm text-center'>info@crypto-savvy.org</p>
      </div>
      <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5'/>
      <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
        <p className='text-white text-sm text-center'>@crypto-savvy 2024</p>
        <p className='text-white text-sm text-center'>All rights reserved</p>
      </div>
    </div>
  )
};
