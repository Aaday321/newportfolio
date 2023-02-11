import React, {useRef, useState} from 'react'
import './Popup.css'
import emailjs from 'emailjs-com'
import Back_arrow from '../../assets/SVG_COMPS/Back_arrow'
import { PopUpPackage } from '../../assets/exportables'
import { motion } from 'framer-motion'


function Pop_up({popUpPackage}:any) {

  const variants = {
    'open':{y: 0},
    'closed':{y:800}
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const {popUpDisplay, togglePopUp, popOpen}:PopUpPackage = popUpPackage

  const handleChange = (e:React.FormEvent<any>, source:string):void => {
    switch(source){
      case 'name': setName(e.currentTarget.value); break;
      case 'email': setEmail(e.currentTarget.value); break;
      case 'message': setMessage(e.currentTarget.value); break;
    }
  }

  const sendEmail = (e:any) => {
    e.preventDefault();

    if(!name || !email || !message)return
    
    const sendableData:any = {
       name: name,
       email: email,
       message: message
    }
    //console.log(sendableData)

    emailjs.sendForm('service_3yoyjzf', 'template_n7ea30i', e.target, 'bN1FC9ACeIM2aZQL7')
      .then((result) => {
          //console.log(result.text);
          setName(''); setEmail(''); setMessage('')
          togglePopUp()
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <motion.div
      animate={popOpen ? 'open' : 'closed'} 
      variants={variants}
      transition={{
        ease: "easeInOut",
        duration: .25,
      }}
      className="pop-up" style={{display:popUpDisplay}}>
      <div className="pop-up-back"
        onClick={togglePopUp}
      ><Back_arrow/></div>
      <form onSubmit={sendEmail}>
        
        <h2 className="form-title">Shoot me a message</h2>
        <h3 className="form-sub-title">I respond fast.</h3>
        <div className="form-row-1">
          <input
            type="text"
            className="form-short"
            placeholder='Name'
            value={name}
            name={'name'}
            onChange={(e)=>handleChange(e, 'name')}
          />
          <input
            type="text"
            className="form-short"
            placeholder='Email'
            value={email}
            name={'email'}
            onChange={(e)=>handleChange(e, 'email')}
          />
        </div>
        <textarea
          className="form-large"
          placeholder='Message'
          value={message}
          name={'message'}
          onChange={(e)=>handleChange(e, 'message')}
        />
        <button className="pop-up-send">Send</button>
      </form>
    </motion.div>
  )
}

export default Pop_up