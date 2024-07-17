// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Link } from "react-router-dom"

import CustomRoutes from "./CustomRoutes"

function App() {

  return (
    <div>
      <div className="flex flex-col p-[10px] items-center gap-[10px]">
          <Link to={"/"}>
            <h1 className="font-bold text-[25px] tracking-[8px]">Pokedex</h1>
          </Link>
      </div>
        
      <CustomRoutes/>
    </div>
  )
}

export default App
