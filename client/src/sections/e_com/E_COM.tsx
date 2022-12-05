import React, {useState, useEffect, useRef, createRef} from 'react'
import Section_Header from '../Section_Header'
import axios from 'axios'
import { SERVER_ROUTE } from '../../assets/exportables'
import './Ecom.css'

function E_COM() {

    
    let nullish:any = null
    const placeHolderArray:any[] = []
    const [total, setTotal] = useState(0)
    const [storeItems, setStoreItems] = useState([])
    const [cartItems, setCartItems] = useState(placeHolderArray)
    
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

    const getTotal = ():number =>{
        let cartTotal:number = 0
        for(let i of cartItems)cartTotal += i.itemPrice
        return Math.floor(cartTotal)*0.01
    }

    const displayPrice = (price: number):string => `$${price*0.01}`

    const addToCart = (item:any):void => setCartItems((current)=>[item, ...current])

    const fillStore = ():void => {
        axios.get(`${SERVER_ROUTE}/store-items`)
            .then((r)=>setStoreItems(r.data))
    }



    useEffect(fillStore,[])

    //Update Total
    useEffect(()=>setTotal(getTotal()),[cartItems])


 
  return (
    <>
        

        <Section_Header
            sectionTitle={<>E-Commerce</>}
            sectionNumber={2}
            background = 
            'linear-gradient(99.65deg, #FFF6A4 10.73%, #FFF383 104.98%)'
        />
    
        <div className="e-com-inner">
            <div className="e-com-inner-left">
                <>
                { storeItems.map((item:any, index:number):JSX.Element => (
                    <div className="item" key={index}>
                        <div
                            className="color"
                            style={{backgroundColor: item.itemColor}}
                            onClick={()=>addToCart(item)}
                        >
                            <p className="label">{item.itemName}</p>
                        </div>  
                        <p className="price" style={{color: item.itemColor}}>
                            {displayPrice(item.itemPrice)}
                        </p>
                    </div>
                ))}
                </>
            </div>

            <div className="e-com-inner-right">
                <div className="cart">
                    <>
                    {
                        displayCartItems().map((item, index)=>(        
                            <div className="item" key={index}>
                                <div
                                    className="color"
                                    style={{backgroundColor: item.itemColor}}
                                >
                                    <p className="label">{item.itemName}</p>
                                </div>  
                                <p className="price" style={{color: item.itemColor}}>
                                    {displayPrice(item.itemPrice)} x{getCount(item)} 
                                </p>
                            </div>
                        ))
                    }
                    </>
                    <div className="total-row">Total: ${total}</div>
                    <div className="gold-base"></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default E_COM