import React, {useState, createRef, useEffect, useRef} from 'react'
import Section_Header from '../Section_Header'
import lottie from 'lottie-web'
import menuAnimation from '../../assets/data.json'
import toggleAnimation from '../../assets/day-night_3.json'
import './MoGo.css'

function MoGo() {
    let Menu: any = null;
    let ref:any = useRef()
    let toggleRef:any = useRef()
    const [background, setBackground] = useState('white')
    const [textColor, setTextColor] = useState('black')
    const [menu, setMenu] = useState(Menu)
    const [toggle, setToggle] = useState(Menu)
    const [animationContainer, setAnimationContainer] = useState(ref)
    const [open, setOpen] = useState('closed')
    const [dark, setDark] = useState('dark')

    useEffect(()=>{
        if(ref?.current){
            setMenu ( lottie.loadAnimation({
                container: ref?.current,
                animationData: menuAnimation,
                autoplay: false,
                loop:false
            }))
            
            ref = null
        }
        if(toggleRef?.current){
            setToggle ( lottie.loadAnimation({
                container: toggleRef?.current,
                animationData: toggleAnimation,
                autoplay: false,
                loop:false,
            }))
            
            toggleRef = null
        }
    },[])




    // useEffect([toggle])

    useEffect(()=>{
        if(dark == 'dark'){ setBackground('var(--ACENT)'); setTextColor('white') }
        else {  setBackground('var(--SOFT_COLOR)'); setTextColor('black') }
    },[dark])
    

  return (
    <>
        <Section_Header
            sectionTitle={<>Web Design x<br/>Motion Graphics</>}
            sectionNumber={3}
            background={background}
            textColor={textColor}
        />
        <div className="extra-div">
        <div className="section-mogo" style={{backgroundColor: background}}>
        <div className="lottie-div"><div
            className='menu-btn'
            ref={animationContainer} 
            onClick={()=>{
                    if(open === 'closed'){
                        setOpen('open')
                        menu.playSegments([menu.currentFrame,119], true);
                    }else if(open === 'open'){
                        setOpen('closed')
                        menu.playSegments([menu.currentFrame,22], true);
                    }
            }}
        >
        

        </div></div>
        <div className="lottie-div">
        <div
            className='dark-toggle'
            style={{color:'white'}}
            ref={toggleRef} 
            onClick={()=>{
                setDark((currentDark)=>{
                    if(currentDark === 'dark'){
                        toggle.playSegments([80,170], true);
                        return 'light'
                    }else{
                        toggle.playSegments([130,60], true);
                        return 'dark'
                    }
                })
            }}
        ></div></div>
        
        </div>
        {/* <div className="info-popup" style={{height:300, width: '100%',
            backgroundColor:'white',}}></div> */}
        </div>
    </>
  )
}

export default MoGo