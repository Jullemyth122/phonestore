import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function

const createInventoryContext = React.createContext();

export function useInventory() {
    return useContext(createInventoryContext);
}

const InventoryContext = ({ children }) => {
    
    const [cartStatus,setCartStatus] = useState(false);
    const [cartMessage, setCartMessage] = useState("");

    const [listItem,setListItem] = useState([
        {
            id:1,
            img:'./list/1.png',
            name:"Xiaomi Bicol Rocket",
            price:888,
            description:"For Handsome Only",
            model:"Xiaomi",
            brand:"Bicol",
            sellers:361,
        },
        {
            id:2,
            img:'./list/2.png',
            name:"ROG Express M16",
            price:599,
            description:"Looks cool to be handsome",
            model:"ROG",
            brand:"Express",
            sellers:116,
        },
        {
            id:3,
            img:'./list/3.png',
            name:"ROG Express MK-45",
            price:6969,
            description:"Looks cool to be ugly",
            model:"ROG",
            brand:"Express",
            sellers:55,
        },
        {
            id:4,
            img:'./list/4.png',
            name:"ROG Express Pistol",
            price:420,
            description:"Looks cool to be sexy",
            model:"ROG",
            brand:"Express",
            sellers:11,
        },
        {
            id:5,
            img:'./list/5.png',
            name:"Xiaomi Express Iniwan ka Niya",
            price:6969,
            description:"Oks lang yan besh",
            model:"Xiaomi",
            brand:"Bicol",
            sellers:111,
        },
        {
            id:6,
            img:'./list/6.png',
            name:"Real Me Vanilla Iniwan sa Buwan",
            price:499,
            description:"Pokwang Camera",
            model:"Real Me",
            brand:"Express",
            sellers:1999,
        },
        {
            id:7,
            img:'./list/5.png',
            name:"Oppo For Filter Gods",
            price:300,
            description:"Filter malala adik",
            model:"Oppo",
            brand:"Vanilla",
            sellers:10000,
        },
        {
            id:8,
            img:'./list/8.png',
            name:"Iphone for ipon",
            price:1000,
            description:"Want gift",
            model:"Iphone",
            brand:"XR",
            sellers:5000,
        },
        {
            id:9,
            img:'./list/9.jpg',
            name:"Iphone For RK",
            price:1000,
            description:"Wala ako nitong phone",
            model:"Iphone",
            brand:"XR",
            sellers:10000,
        },
    ])
    
    const [carts,setCarts] = useState([])
    
    const [searchQuery,setSearchQuery] = useState("")

    const handleAddToCart = async ( elem,type,user ) => {
        if (user?.email.length > 0) {
            const uuid = uuidv4(); // Generate a UUID using uuidv4
            if (type == "cart") {
                try {
                    const response = await fetch('http://localhost:7777/carts/add-to-cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email:user?.email,
                            shoeVariation:{
                                id: uuid,
                                img: elem.img,
                                name: elem.name,
                                brand: elem.brand,
                                model: elem.model,
                                price: elem.price,
                            }
                        }),
                    });
        
                    const responseData = await response.json();
                    console.log(responseData);
                    setCartMessage("Added to cart successfully")
                    setCartStatus(!cartStatus)
                } catch (error) {
                    console.error('Error adding item to cart:', error);
                }
            } else {
                try {
                    const response = await fetch('http://localhost:7777/carts/add-to-cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email:user?.email,
                            shoeVariation:{
                                id: uuid,
                                img: elem.img,
                                name: elem.name,
                                brand: elem.brand,
                                model: elem.model,
                                price: elem.price,
                            }
                        }),
                    });
                    const responseData = await response.json();
                    setCartMessage("Added to cart successfully")
                    setCartStatus(!cartStatus)
                } catch (error) {
                    console.error('Error adding item to buy:', error);
                }
            }

        } else {
            setCartStatus(!cartStatus)
        }
    };

    const value = {
        listItem,setListItem,
        carts,setCarts,
        searchQuery,setSearchQuery,
        handleAddToCart,
        cartStatus,
        setCartStatus,
        cartMessage,
    }

    return (
        <createInventoryContext.Provider value={value}>
            {children}
        </createInventoryContext.Provider>
    )
}

export default InventoryContext