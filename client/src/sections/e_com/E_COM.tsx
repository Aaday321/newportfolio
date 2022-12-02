import React, {useState, useEffect, useRef, createRef} from 'react'
import Section_Header from '../Section_Header'
import axios from 'axios'
import { SERVER_ROUTE } from '../../assets/exportables'
import lottie from 'lottie-web'
import menuAnimation from '../../assets/data.json'
import './Ecom.css'

function E_COM() {
    const obj:any = {}
    const placeHolderArray:any[] = []
    const [price, setPrice] = useState(1)
    const [storeItems, setStoreItems] = useState([])
    const [cartItems, setCartItems] = useState(placeHolderArray)
    const [loadedOnce, setLoadedOnce] = useState(0)
    const [myLottie, setMyLottie] = useState(obj)

    const displayPrice = (price: number):string => `$${price*0.01}`

    const addToCart = (item:any):void => setCartItems((current)=>[item, ...current])

    const fillStore = ():void => {
        axios.get(`${SERVER_ROUTE}/store-items`)
            .then((r)=>setStoreItems(r.data))
    }

    const inc = ():string =>{
        if(!loadedOnce){
            setTimeout(()=>setLoadedOnce((c)=>c+1),0)
            
            return "one"
        }else return 'two'
    }

    let animationContainer:any = createRef()

    useEffect(fillStore,[])

    useEffect(()=>console.log(cartItems),[cartItems])

    useEffect(():any=>
    {
        setMyLottie(lottie.loadAnimation({
            container: animationContainer?.current,
            animationData: menuAnimation,
            autoplay: false
        }))
        animationContainer = null
    },[])

    return(
        <div onClick={()=>myLottie.play()} className={'WOW'} ref={animationContainer ? animationContainer : ''}>
        </div>
    )

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
                        cartItems.map((item, index)=>(
                        
                            <div className="item" key={index}>
                                
                        <div
                            className="color"
                            style={{backgroundColor: item.itemColor}}
                        >
                            <p className="label">{item.itemName}</p>
                        </div>  
                        <p className="price" style={{color: item.itemColor}}>
                            {displayPrice(item.itemPrice)}
                        </p>
                    </div>
                        ))
                    }
                    </>
                </div>
            </div>
        </div>
    </>
  )
}

export default E_COM