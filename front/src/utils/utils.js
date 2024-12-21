import React, {createContext, useEffect, useState} from "react";

export const CountContext = createContext();

export const CountProvider = ({children}) =>{
    const [count, setCount] = useState(0)
    const [price, setPrice] = useState(0)
    const [weight, setWeight] = useState(0);
    const [discount, setDiscount] = useState(0)
    const [postingProducts, setpostingProducts] = useState([])
    const [auth, setAuth] = useState({});

    let basketProducts = [];;
    let mybasketlocal = JSON.parse(localStorage.getItem("MyBasket"))
    if(mybasketlocal?.length>0){
        basketProducts = mybasketlocal;
    }else{
        localStorage.setItem("MyBasket",JSON.stringify([]))
    }
    const [basket,setBasket] = useState(basketProducts)

    useEffect(()=>{
        localStorage.setItem("MyBasket",JSON.stringify(basket))
        BasketProductCounter()
    },[basket])

    const  BasketProductCounter = () => {
        if (basket.length > 0) {
            let c = 0;
            basket.forEach(element => {
                if (element.length != 0) {
                    c = c + element.count; 
                }
            });
            setCount(c)
        }
    };

    const AddProductCount = (id) => {
        // let exitingProducts = JSON.parse(localStorage.getItem('MyBasket')) || [];
        let exitingProducts = basket || [];
        if (exitingProducts.length > 0) {
            exitingProducts.forEach(element => {
                if (id === element.id) {
                    element.count = element.count + 1
                }
            });
            // localStorage.setItem('MyBasket', JSON.stringify(exitingProducts))
            setBasket([...exitingProducts])
        }
    }

    const NoProductCount = (id) =>{
        let exitingProducts = basket || [];
        const newListExitingProducts = [];
        if (exitingProducts.length > 0) {
            exitingProducts.forEach(element => {
                if (id != element.id) {
                    newListExitingProducts.push(element)
                }
            });
            setBasket([...newListExitingProducts])
        }
    }

    const SubProductCount = (id) =>{
        let exitingProducts = basket || [];
        if (exitingProducts.length > 0) {
            exitingProducts.forEach(element => {
                if (id === element.id) {
                    element.count = element.count - 1
                }
            });
            setBasket([...exitingProducts])
        } else if(exitingProducts.length <= 0){
            setBasket([])
            console.log("stebasket([]) islediiii");
        }
    }

    const ProductsForPost = () => {
        let exitingProducts = basket || [];
        const data = []
        if (basket.length > 0) {
            let products = {}
            exitingProducts.forEach(element => {
                products = {
                    "id" : element.id,
                    "name" : element.name,
                    "price" : element.main_price,
                    "quantity" : element.count 
                }
                data.push(products)
            });
            setpostingProducts(data)
        }
    }

    const SumPrice = () => {
        let exitingProducts = basket || [];
        if (exitingProducts.length > 0) {
            let sum = 0
            exitingProducts.forEach(element => {
                if(element.length != 0){
                    sum = sum + (element.count * element.main_price) 
                }
            });
            setPrice(sum)
        }
    }

    const SumWeight = () => {
        let exitingProducts = basket || [];
        if (exitingProducts.length > 0) {
            let weight = 0
            exitingProducts.forEach(element => {
                if(element.length != 0){
                    weight = weight + (element.count * element.weight_with_package) 
                }
            });
            setWeight(weight)
        }
    }

    const SumDiscount = () => {
        // let exitingProducts = JSON.parse(localStorage.getItem('MyBasket')) || []
        let exitingProducts = basket || [];
        if (exitingProducts.length > 0) {
            let discount = 0
            exitingProducts.forEach(element => {
                if(element.length != 0){
                    discount = discount + (element.count * !element.discount) 
                }
            });
            setDiscount(discount)
        }
    }

    return (
        < CountContext.Provider value = {{discount,basket,SumDiscount,auth, setAuth, count, BasketProductCounter, AddProductCount, SubProductCount, price, SumPrice, NoProductCount, postingProducts, ProductsForPost, weight, SumWeight, basket, setBasket }}>
            { children }
        </CountContext.Provider>
    )
}