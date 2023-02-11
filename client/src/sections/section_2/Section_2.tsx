import React, { useEffect, useState } from "react";
import Section_Header from "../Section_Header";
import New_User_sym from "../../assets/SVG_COMPS/New_User_sym";
import Arrow_Cir_sym from "../../assets/SVG_COMPS/Arrow_Cir_sym";
import Lock_sym from "../../assets/SVG_COMPS/Lock_sym";
import X_Cir_sym from "../../assets/SVG_COMPS/X_Cir_sym";
//import "./Section2.css";
import { APP_COLORS } from "../../assets/exportables";
import { SERVER_ROUTE } from "../../assets/exportables";
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { motion } from 'framer-motion';
import addSound from '../../assets/addSound.wav';
import deleteSound from '../../assets/deleteSound.wav';

const ALREADY_SIGNED_IN = "You're already signed in"
const NO_INPUT = 'Type in a username and password'
const NO_INPUT_2 = 'Create a username and password'

function Section_2() {
  const [display, setDisplay] = useState("flex");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [activeUser, setActiveUser] = useState(null)
  const [pwStyle, setPwStyle] = useState({})
  const [userInput, setUserInput] = useState("")
  const [userData, setUserData] = useState([])  
  
  const handleChange = (
    e:React.FormEvent<HTMLInputElement>,
    source: string ):void => {
    if(source == "userInput")setUserInput(e.currentTarget.value);
    if(activeUser)return
    switch(source){
      case "Username":setUsername(e.currentTarget.value); break;
      case "password":setPassword(e.currentTarget.value); break;
    }
  }

  useEffect(():void => {
    if(password.length <= 0)setPwStyle({})
    else setPwStyle({fontSize: 30})
  },[password])

  const logInProtocall = (res:any):void => {
    if(!activeUser){
      setMessage(res?.data?.msg)
      setUsername(res?.data?.token?.user.username)
      setDisplay("none")
      setActiveUser(res?.data?.token?.user)
      Cookies.set('token', res?.data?.token?.token)
      setPassword("Hire me! :)")
      setUserData(res.data.userData)
    }
  }

  const logOutProtocall = (res:any):void => {
    Cookies.remove('token')
    setPassword("")
    setDisplay("flex")
    setUsername("")
    setMessage("")
    setActiveUser(null)
  }

  const submitUserInput = (e:React.SyntheticEvent):void => {
    e.preventDefault()
    if(!userInput)return
    let sendableData: string = userInput.trim()
    let characters: boolean = false
    for(let i of sendableData)if(i != ' '){characters = true; break}
    if(!characters)return
    if(userInput.length > 25)sendableData =
      "I like that you're testing the limits. :) 25 characters max"
    axios.post(`${SERVER_ROUTE}/users`,{
      action: 'add-item',
      newUserData:sendableData,
      user: {username}
    })
      .then((r):void => {
        setUserData(r.data)
        setUserInput("")
        //new Audio(addSound).play()
      })
      .catch((r):void =>console.log(r))
  }
  
  const deleteItem = (item:any):void => {
    axios.post(`${SERVER_ROUTE}/users`,{
      action: 'delete-item',
      item:item,
      user: {username}
    })
      .then((r):void => {
          //new Audio(deleteSound).play()
          setUserData(r.data)
      })
  }

  const createNewUser = ():void => {
    if(activeUser){ setMessage(ALREADY_SIGNED_IN); return }
    if(username && password){
      axios.post(`${SERVER_ROUTE}/users`, {
        action: 'create_user',
        username,
        password: CryptoJS.SHA256(password).toString()
      })
        .then((r):void =>logInProtocall(r))
        .catch((r):void =>setMessage(r.response.data))
    }else{ setMessage(NO_INPUT_2); return }
  }

  const logIn = ():void => {
    if(activeUser){ setMessage(ALREADY_SIGNED_IN); return }
    if(username && password){
      axios.post(`${SERVER_ROUTE}/users`,{
        action: 'login',
        username,
        password: CryptoJS.SHA256(password).toString()
      })
        .then((r):void =>logInProtocall(r))
        .catch((r):void =>setMessage(r?.response?.data))
    }else setMessage(NO_INPUT)
  }

  const enterSubmit = ():void => {

  }

  const logOut = ():void => {
    if(!activeUser)return setMessage("You're not logged in")
    axios.post(`${SERVER_ROUTE}/users`,{
      action: 'logout',
      user: activeUser
    })
      .then((r):void =>logOutProtocall(r))
      .catch((r):void =>console.log(r))
  }
  
  useEffect(():void => {
    if(Number(Cookies.get('token')?.length) > 9){
      axios.post(`${SERVER_ROUTE}/users`,{
        action: "re-autherize",
        token: Cookies.get('token')
      })
      .then((r):void =>logInProtocall(r))
      .catch((r):void =>logOutProtocall(r))
    }
  },[activeUser])

  return (
    <>
      <Section_Header
        sectionTitle={
          <>
            Authentication
            <br />
            & Authorization
          </>
        }
        sectionNumber={1}
        background= {'var(--SOFT_COLOR)' ||
          "linear-gradient(99.65deg, #FFEA28 10.73%, #FFF59C 104.98%)"}
      />
      <div className="section-2-inner">

        <div className="section-2-left">
          <button
            className="create-user"
            onClick={createNewUser}
          >
            <New_User_sym color='var(--BLACK)' />
            Create User
          </button>

          <input
            className="log-input"
            type="text"
            disabled={!!activeUser}
            value={username}
            onChange={(e):void=>handleChange(e, "Username")}
            placeholder="Username"
          />

          <input
            className="log-input"
            type="password"
            style={pwStyle}
            value={password}
            disabled={!!activeUser}
            onChange={(e):void=>handleChange(e, "password")}
            placeholder="Password"
          />

          <p>{message}</p>

          <div className="log-btns">
            <button onClick={logOut} className="log-left">Log Out</button>
            <button onClick={logIn} className="log-right">Log In</button>
          </div>

        </div>
        <div className="section-2-right">

          <p className="user-data-title">User-specific data</p>
          <div className="inner">
              
            <div className="locked" style={{display:display}}>
                <Lock_sym color="var(--WHITE)"/>
            </div>

            <form className="data-form" onSubmit={(e):void=>submitUserInput(e)}>
                <div className="user-data">
                    <ul>
                      {userData?.map((item, key):JSX.Element => (
                          <motion.li
                            className="user-data-item"
                            key={key}
                            initial={{y:+100}}
                            animate={{y:0}}
                          >
                            {item}
                            <div onClick={():void =>deleteItem(item)}><X_Cir_sym color="var(--ACENT)"/></div>
                          </motion.li>
                      ))}
                    </ul>
                </div>
                <div className="input-row">
                    <input
                      type="text"
                      onChange={(e):void=>handleChange(e, 'userInput')}
                      value={userInput}
                      placeholder='Enter text'
                    />
                    <div onClick={(e):void=>submitUserInput(e)}><Arrow_Cir_sym color='var(--WHITE)'/></div>
                </div>
            </form>

          </div>

        </div>
      </div>
    </>
  );
}

export default Section_2;