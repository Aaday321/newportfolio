import { useEffect, useState, useRef } from 'react'
import Section_1 from './sections/section_1/Section_1'
import Section_Header from './sections/Section_Header'
import './App.css'
import Menu_sym from './assets/SVG_COMPS/Menu_sym'
import Section_2 from './sections/section_2/Section_2'
import E_COM from './sections/e_com/E_COM'
import MoGo from './sections/mogo/MoGo'
import Technologies from './sections/technologies/Technologies'
import Menu from './menu/Menu'
import myMenu from './assets/myMenu2.json'
import lottie from 'lottie-web'
import {motion} from 'framer-motion'
import Pop_up from './sections/pop_up/Pop_up'



function App() {
  let menuRef:any = useRef()
  const ANY:any = null
  const [animMenu, setAnimMenu] = useState(ANY)
  const [myMenuRef, setMyMenuRef] = useState(menuRef)
  useState
  const [ darkMode, setDarkMode ] = useState('light')
  const [open, setOpen] = useState(false)
  const [display, setDisplay] = useState('none')
  const [everyThree, setEveryThree] = useState(1)
  const [midAnimation, setMidAnimation] = useState(false)
  const [bgDisplay, setBgDisplay] = useState('none')
  const [popUpDisplay, setPopUpDisplay] = useState('none')
  const [menuZIndex, setMenuZIndex] = useState(3)
  const [popOpen, setPopOpen] = useState(false)
  
  const ROW3_TEXT: string =
  "At the intersection of technology and social justice where curiosity is my protest"

  useEffect(()=>{
    if(menuRef?.current){
      setAnimMenu ( lottie.loadAnimation({
          container: menuRef?.current,
          animationData: myMenu,
          autoplay: false,
          loop:false,
      }))
      menuRef = null
  }
  },[])

  const closeMenu = ():void =>{
    togglePopUp('close')
    setOpen(false)
    setBgDisplay('none')
    if(!open)return
    if(animMenu.currentFrame > 3 && animMenu.currentFrame < 85)setMidAnimation(true)
    setOpen(false)
    if(animMenu.currentFrame > 160)animMenu.playSegments([90,0], true);
    else animMenu.playSegments([animMenu.currentFrame,0], true);
  }
  
  const openMenu = ():void =>{
    setOpen(true)
    window.scrollTo(0,0)
    setTimeout(()=>setBgDisplay('block'),300) 
    if(animMenu.currentFrame > 3 && animMenu.currentFrame < 85)setMidAnimation(true)
    setDisplay('block')
    setOpen(true)
    if(everyThree % 3 === 0)animMenu.playSegments([animMenu.currentFrame,165], true);
    else animMenu.playSegments([animMenu.currentFrame,90], true);
    //setEveryThree((c)=>c+1)
  }


  const togglePopUp = (close:string):void => {

    let ready:any = false
    if(popUpDisplay == 'none' && !!!close){
      setPopOpen(true)
      setBgDisplay('block')
      setMenuZIndex(0)
      setPopUpDisplay('block')
    }else{
      setPopOpen(false)
      setTimeout(()=>{
        setBgDisplay('none')
        setMenuZIndex(3)
        setPopUpDisplay('none')
      },250)
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
        if(!open){setDisplay('none'); setBgDisplay('none')}
        else{setDisplay('block'); setBgDisplay('block')}
      },1000)
  },[open])

  const MenuPackage = {
    open,
    midAnimation,
    setMidAnimation,
    everyThree
  }
  const PopUpPackage = {
    togglePopUp,
    popUpDisplay,
    popOpen
  }

  return (
    <div className='home_page' onScroll={closeMenu}>
      <div className="header">
        <h3 className="ade">Ade</h3>
        <div style={{height: 50, zIndex: menuZIndex}} className="menu-sym" ref={myMenuRef}
          onClick={()=>{
            if(open === false)openMenu()
            else closeMenu()
          }}
          onScroll={closeMenu}
        ></div>
      </div>
      <div className="menu-container" style={{display:display}}><Menu MenuPackage={MenuPackage}/></div>
      <div className="layover" onClick={closeMenu} style={{display:bgDisplay}}></div>
      <Section_1 popUpPackage={PopUpPackage}/>
      <div className="key-skills">
        <p id='key-p' className="key-skills-text"  >
          Key Skills
        </p>
        {/* <div className="key-underline"></div> */}
      </div>
      <Pop_up popUpPackage={PopUpPackage}/>
      <Section_2 />
      <E_COM/>
      <MoGo/>
      <Technologies popUpPackage={PopUpPackage}/>
    </div>
  )
}

export default App
