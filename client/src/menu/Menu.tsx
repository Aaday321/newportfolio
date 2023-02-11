import React from 'react'
import Link from 'react-router-dom'
import './Menu.css'
import {motion} from 'framer-motion'

interface MENU_PROPS {
  MenuPackage: MenuPackage
}

interface MenuPackage {
  open: boolean,
  midAnimation:boolean,
  setMidAnimation:any,
  everyThree: number
}

function Menu({MenuPackage}:MENU_PROPS) {

  const {open, midAnimation, everyThree} = MenuPackage

  const myWork:Map<string,string> = new Map([
    ['Free Jac Nation','https://www.freejacnation.com/'],
    ['California TRANScends', 'https://www.catranscends.com/'],
    ['Queen Sheba','https://www.queenshebas.com/'],
    ['Experience M86','https://www.experiencem86.com/'],
  ])

  const displayProjectList = (): Array<JSX.Element> => {
    let returnableArray: Array<JSX.Element> = new Array()
    let key: number = 0
    for(let i of myWork){
      returnableArray.push(
        <li key={key} className='project-item'>
          <a href={i[1]} target="_blank">{i[0]}</a>
        </li>
      )
      key++
    }
    return returnableArray
  }

  

  return (
    <motion.nav className='menu'
    initial={{x:500}} animate={open ? 'open' : 'closed'}
    variants={{closed: {x:500}, open:{x:0}}}
    transition={(midAnimation && (everyThree % 3 !== 0)) ? {
      ease: "easeInOut",
      duration: .25,
      delay: 0.5 // Was 0.3, but I'm liking it better at 0.5
    }:{
      ease: "easeInOut",
      duration: .25,
      delay: 0.5
    }}
    >
      <div className="menu-inner">
        <h4>Projects</h4>
        <ul>
          {displayProjectList()}
        </ul>
      </div>
        
    </motion.nav>
  )
}

export default Menu