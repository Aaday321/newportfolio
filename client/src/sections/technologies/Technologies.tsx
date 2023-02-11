import React, { useEffect, useState } from 'react'
import SVG_HOLDER from './assets/Javascript'
//import './Tech.css'
import svg1 from './assets/tech_1.svg'
import svg2 from './assets/tech_2.svg'
import svg3 from './assets/tech_3.svg'
import svg4 from './assets/tech_4.svg'
import svg5 from './assets/tech_5.svg'
import svg6 from './assets/tech_6.svg'
import svg7 from './assets/tech_7.svg'
import svg8 from './assets/tech_8.svg'
import svg9 from './assets/tech_9.svg'
import svg10 from './assets/tech_10.svg'
import svg11 from './assets/tech_11.svg'
import svg12 from './assets/tech_12.svg'
import svg13 from './assets/tech_13.svg'
import svg14 from './assets/tech_14.svg'
import svg15 from './assets/tech_15.svg'
import svg16 from './assets/tech_16.svg'
import svg17 from './assets/tech_17.svg'
import svg18 from './assets/tech_18.svg'
import svg19 from './assets/tech_19.svg'
import svg20 from './assets/tech_20.svg'
import svg21 from './assets/tech_21.svg'
import svg22 from './assets/tech_22.svg'
import svg23 from './assets/tech_23.svg'
import svg24 from './assets/tech_24.svg'
import svg25 from './assets/tech_25.svg'
import svg26 from './assets/tech_26.svg'
import svg27 from './assets/tech_27.svg'
import svg28 from './assets/tech_28.svg'
import svg29 from './assets/tech_29.svg'
import svg30 from './assets/tech_30.svg'
import svg31 from './assets/tech_31.svg'
import Hand_sym from '../../assets/SVG_COMPS/Hand_sym'
import { PopUpPackage } from '../../assets/exportables'



function Technologies({popUpPackage}:any) {
  
  const any: any = null
  const [files, setFiles] = useState([])

  const {togglePopUp}:PopUpPackage = popUpPackage

  const mappable = ():number[] => {
    let returnableArray:Array<any> = []
    for (let i = 1; i < 31; i++) {
      returnableArray.push(i)
      
    }
    return returnableArray
  }
  
  const arr = [
    svg30,svg31,
    svg1,svg3,svg4,
    svg6,svg7,svg8,
    svg9,svg10,
    svg12,svg14,
    svg16,
    svg18,svg20,
    svg22,svg23
    ,svg25,
    svg27,svg28,svg2,
  ]
  const BTN_TEXT: JSX.Element = (
    <>
      Hollar at me
      <Hand_sym color='white'/>
    </>
  );
  return (
    <div className='tech-section'>
        <h2 className='tech-title'>Technologies</h2>
        <div className="tech-list">
            { true && arr.map((item, key):any=>{
              return <SVG_HOLDER key={key} size={70} file={item}/>//{/*item.slice(item.length-6, item.length-4)*/}</>
            })}
            
        </div>
        <button onClick={()=>togglePopUp()} className="hollar-btn">{'Get in touch'}</button>
    </div>
    
  )
}

export default Technologies