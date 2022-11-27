import React from 'react'
import {Map} from "leaflet"

type Props = {
    map: Map | null
}

const NavBar = ({map}: Props) => {

    const filterButtons = [
        {name: "All", clickHandler: ()=>map?.setView([51.505, -0.09], 3)},
        {name: "USA", clickHandler: ()=>map?.setView([36.38591277287654, -95.537109375], 5)},
        {name: "Europe", clickHandler: ()=>map?.setView([50.29800189829936, 11.088744448835037], 5)},
        {name: "Asia", clickHandler: ()=> map?.setView([4.740859164225317, 136.93319490902033], 4)},
        {name: "Middle East", clickHandler: ()=>map?.setView([32.438570492931, 53.7728104716948], 5)},
    ]

  return (
    <div className="navbar" >
        <div>
            Avalanche Staking Node Locations
        </div>
        <div className="filter-holder" >
            {filterButtons.map((item)=>{
                return <div onClick={item.clickHandler} >{item.name}</div>
            })}
        </div>
    </div>
  )
}

export default NavBar