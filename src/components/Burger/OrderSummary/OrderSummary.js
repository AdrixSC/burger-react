import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    //convertir el objeto de ingredientes en matriz
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igkey => {
        return (
        <li key={igkey}>
            <span style={{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}
        </li>)
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
}

export default orderSummary;