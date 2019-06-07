import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor (props) {
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState() {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                console.log(igKey)
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                console.log(sum, el)
                return sum + el
            }, 1);
        this.setState({ purchasable: sum > 0 })
        console.log(this.state.ingredients, sum)
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; //ingredientes en cero
        const updateCount = oldCount + 1; //contador de ingredientes
        const updateIngredients = {
            ...this.state.ingredients
        }; //actualizar el estado con el state inmutable (spread operator)
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]; //ingredientes en cero
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1; //contador de ingredientes
        const updateIngredients = {
            ...this.state.ingredients
        }; //actualizar el estado con el state inmutable (spread operator)
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    }

    purchasHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        console.log("ceerrar modal")
        this.setState({purchasing: false })
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }; //deshabilitar botones
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 //key es igual al valor de cada ingrediente, y regresará verdadero o falso si es igual o no a cero
        }
        return (
        <Aux >
            <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                <OrderSummary ingredients={this.state.ingredients} />
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchasHandler}
                price={this.state.totalPrice}
            />
        </Aux>
        );
    }
}

export default BurgerBuilder;