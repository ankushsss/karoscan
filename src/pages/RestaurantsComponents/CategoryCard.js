import { Delete, Star } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

export const CategoryCard = (props) => {
  return (
     <div className="card" >
    <div className="card__image" style={{textAlign:"right"}}>
       <img style={{height:"180px"}} src="https://simpleindianrecipes.com/portals/0/sirimages/Masala-Dosa-M.jpg" alt="Salad" />
       <Button><Delete/></Button>
    </div>
    <div className="card__info">
       <div className="car__info--title">
          <h3 style={{textTransform:"uppercase"}}>{props.category.item_name}</h3>
          <p>Fresh & sweet</p>
       </div>
       <div className="card__info--price">
          <Star/><Star/><Star/><Star/>
         <p>Rs{props.category.item_regular_price}</p>
       </div>
    </div>
 </div>
  )
}
