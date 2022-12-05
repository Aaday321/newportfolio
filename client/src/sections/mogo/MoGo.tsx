import React, {useState, createRef, useEffect} from 'react'
import Section_Header from '../Section_Header'
import lottie from 'lottie-web'
import menuAnimation from '../../assets/data.json'
import toggleAnimation from '../../assets/data2.json'
import './MoGo.css'

function MoGo() {
    let Menu: any = null;
    let ref:any = createRef()
    let toggleRef:any = createRef()
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
                loop:false
            }))
            toggleRef = null
        }
    },[])

    useEffect(()=>{
        if(dark == 'dark'){setBackground('#222222'); setTextColor('white')}
        else {setBackground('#e8d3bc'); setTextColor('black')}
    },[dark])
    

//setInterval(()=>console.log(toggle?.currentFrame),1000)

  return (
    <>
        <Section_Header
            sectionTitle={<>Motion Graphics x Web Design</>}
            sectionNumber={3}
            background={background}
            textColor={textColor}
        />
        <div className="extra-div">
        <div className="section-mogo" style={{backgroundColor: background}}>
        <div
            className='menu-btn'
            style={{height:400, width:400, position:'relative', top:55, color:'white'}}
            ref={animationContainer} 
            onClick={()=>{
                    if(open === 'closed'){
                        setOpen('open')
                        menu.playSegments([menu.currentFrame,119], true);
                    }else if(open === 'open'){
                        setOpen('closed')
                        menu.playSegments([menu.currentFrame,15], true);
                    }
            }}
        >
        

        </div>
        <div
            className='dark-toggle'
            style={{height:500, width:500, color:'white'}}
            ref={toggleRef} 
            onClick={()=>{
                    if(dark === 'light' && toggle.currentFrame > 170){
                        console.log(1);
                        setDark('dark')
                        toggle.playSegments([170,80], true);
                    }else if(dark === 'dark'&& toggle.currentFrame < 80){
                        console.log(2);
                        setDark('light')
                        toggle.playSegments([80,170], true);
                    }else if(dark == 'light'){
                        setDark('dark')
                        toggle.playSegments([170,80], true);
                        console.log(3);
                    }else if(dark == 'dark'){
                        console.log(4);                        
                        setDark('light')
                        toggle.playSegments([80, 170], true);
                    }
            }}
        ></div>
        
        </div>
        {/* <div className="info-popup" style={{height:300, width: '100%',
            backgroundColor:'white',}}></div> */}
        </div>
    </>
  )
}

export default MoGo