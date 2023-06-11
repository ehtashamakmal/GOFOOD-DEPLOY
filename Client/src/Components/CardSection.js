import { CardElement } from '@stripe/react-stripe-js'
import React from 'react'
import "./CardSection.css";

const CARD_ELEMENT_OPTIONS={
  style:{
    base:{
      color:"green",
      fontSize:"24px",
      fontFamily:"sans-serif",
      fontSmoothing:"antialiased",
      "::plaaceholder ":{
         color:"#dfdfdf",

      },
    },
    invalid:{
      color:"red",
      ":focus":{
        color:"red"
      }
    }
  }
}
 function CardSection() {
  return (
    <label>
        
    <div className='cardTitle'> Fill The Card details
    <br></br>
    <br></br>
<CardElement options={CARD_ELEMENT_OPTIONS}/>

    </div>
    </label>
  )
}

export default CardSection;