import React, {useState, useEffect, useRef, createRef} from 'react'
import Section_Header from '../Section_Header'
import axios from 'axios'
import { SERVER_ROUTE } from '../../assets/exportables'
//import './Ecom.css'
import Dinero from 'dinero.js'
import X_Cir_sym from '../../assets/SVG_COMPS/X_Cir_sym'
import low from '../../assets/STORE_LOW_SFX.wav'
import med from '../../assets/STORE_MED_SFX.wav'
import high from '../../assets/STORE_HIGH_SFX.wav'
import deleteSound from '../../assets/deleteSound.wav';
import { motion } from 'framer-motion'

function E_COM() {

    
    let nullish:any = null
    const placeHolderArray:any[] = []
    const [total, setTotal] = useState(0)
   
    const [cartItems, setCartItems] = useState(placeHolderArray)
    const [justClicked, setJustClicked] = React.useState<any>(null)

    const storeItemsC = [
        {

            _id: '6395619430b49b7290f8e6c7',
            itemName:
                "A",
            itemColor:
                "N/A",
            itemPrice:
                50
        },
        {
            _id: '639561e030b49b7290f8e6c9',
            itemName: "D",
            itemColor: "N/A",
            itemPrice: 100,
        },
        {
            _id:'639561ec30b49b7290f8e6cb',
            itemName: "E",
            itemColor: "N/A",
            itemPrice: 150
        }
    ]
    const [storeItems, setStoreItemsC] = useState(storeItemsC)
    
    const getCount = (item:any):number =>{
        let count: number = 0
        for(let i of cartItems)if(i==item)count++
        return count
    }

    const displayCartItems = ():Array<any> => {
        let returnableArray: Array<any> = new Array()
        for(let i of cartItems)if(!returnableArray.includes(i))returnableArray.push(i)
        return returnableArray
    }

    const getTotal = ():any =>{
        let cartTotal:number = 0
        for(let i of cartItems)cartTotal += i.itemPrice
        return( Dinero({ amount: cartTotal, currency: 'USD' }).toFormat('$0.00'))
    }

    const displayPrice = (price: number):string => Dinero({ amount: price, currency: 'USD' }).toFormat('$0.00')

    const addToCart = (item:any, source:string):void => {

        setJustClicked(source)

        setTimeout(()=>setJustClicked(false),110)
         /*switch(source){
            case 'A': new Audio(high).play(); break;
            case 'D': new Audio(med).play(); break;
            case 'E': new Audio(low).play(); break;
        }*/
        
        setCartItems((current)=>[...current, item])
    }

    const fillStore = ():void => {
        axios.get(`${SERVER_ROUTE}/store-items`)
            .then((r)=>{})
            .catch((r)=>console.log('CATCH', r))
    }

    const purchaseItems = ():void => {
        if(!cartItems.length)return
        let shippableArray:Array<any> = new Array()
        for(let i of cartItems){
            let itemPlaced = false
            for(let j of shippableArray)if(j?.item.itemName === i.itemName){j.quantity++; itemPlaced=true; break}
            if(itemPlaced)continue
            shippableArray.push({item: i, quantity:1})
        }
        axios.post(`${SERVER_ROUTE}/store-items`,{
            action: 'buy-items',
            items: shippableArray
        })
            .then((r)=>{
                window.location = r.data
            })
            .catch((r):void=>console.log(r))
    }

    useEffect(fillStore,[])
   // useEffect(()=>console.log(justClicked),[justClicked])
    useEffect(()=>{
        //console.log(storeItems.map)
        //console.log(storeItems)
    },[storeItems])


    //Update Total 
    useEffect(()=>setTotal(getTotal()),[cartItems])

    const justClickedFunc = (source:string):any => {
        const scale: number = 0.9
        switch(justClicked){    
            case 'A': return source == justClicked && {scale}
            case 'D': return source == justClicked && {scale}
            case 'E': return source == justClicked && {scale}
        }
    }
 
  return (
    <>
        

        <Section_Header
            sectionTitle={<>E-Commerce &<br/>Secure Checkout</>}
            sectionNumber={2}
            background = { 'var(--MEDIUM)'||
            'linear-gradient(99.65deg, #FFF6A4 10.73%, #FFF383 104.98%)'}
        />
    
        <div className="e-com-inner">
            <div className="e-com-inner-left">
                <>
                { storeItems.map((item:any, index:number):JSX.Element => (
                    <motion.div className="item" key={index}
                    whileTap={{ scale: 0.9 }}
                    >
                        <div
                            className="color"
                            style={{backgroundColor: 'var(--PRIMARY)'}}
                            onClick={()=>{

                                addToCart(item, item.itemName)
                            }}
                        >
                            <p className="label">{item.itemName}</p>
                        </div>  
                        <p className="price" style={{color: 'var(--BLACK)'}}>
                            {displayPrice(item.itemPrice)}
                        </p>
                    </motion.div>
                ))}
                </>
            </div>

            <div className="e-com-inner-right">
                <div className="cart">
                    <ul style={{display: !!(cartItems.length) ? 'block' : 'grid'}}>
                    {   !!(cartItems.length) ? 
                        displayCartItems().map((item, index)=>(        
                            <li className="cart-item" key={index} >
                                    <motion.div
                                        animate={justClicked ? justClickedFunc(item.itemName) : {scale: 1}}
                                        transition={{ duration: 0.01, delay:0}}
                                        className="color"
                                        
                                        style={{backgroundColor: 'var(--PRIMARY)'}}
                                    >
                                        <p className="label">{item.itemName}</p>
                                    </motion.div>  
                                    <p className="price" style={{color: 'var(--BLACK)'}}>
                                        {displayPrice(item.itemPrice)} x{getCount(item)} 
                                    </p>
                                    <div onClick={()=>{
                                        //new Audio(deleteSound).play()
                                        setCartItems((currentItems)=>currentItems.filter((cItem)=>cItem != item))
                                    }}
                                    className="cart-x"><X_Cir_sym color='var(--ACENT)'/></div>
                                {/*
                                    !!(index+1 - displayCartItems()?.length) && //won't display on last item
                                    <div className='cart-line'></div>
                                 */}
                            </li>
                        ))
                        :
                        'Cart is empty'
                    }
                    </ul>
                    <div className="total-row">Total: {total}</div>
                    <button className="buy-button" onClick={purchaseItems}>Purchase</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default E_COM