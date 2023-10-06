import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Carters = ({ user, showcarts,setShowCarts }) => {

    const [cart,setShowCart] = useState()
    
    useEffect(() => {
      const getCarts = async () => {
        try {
            console.log(user)
          const carts = await fetch(`http://localhost:7777/carts/cart/${user?.email}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
          });
          const data = await carts.json();
          console.log(data);
  
          // Update the cartLists state with the retrieved cart data
          setShowCart(data.cart);
        } catch (error) {
          console.error('Error fetching user carts:', error);
        }
      }
  
      getCarts();
    }, [user]);

    return (
        <div className={`carts_shop_list ${showcarts ? 'in' : 'out'}`}>
            <div className="textline-header">
            <h4>
                Carts 
            </h4>
            <svg onClick={e => setShowCarts} width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 0.499875C11.0001 0.776017 10.7763 0.999931 10.5001 1L2.50045 1.002C2.50041 1.002 2.5005 1.002 2.50045 1.002C1.67189 1.00282 1 1.6746 1 2.502V12.497C1 12.8948 1.15804 13.2764 1.43934 13.5577C1.72064 13.839 2.10218 13.997 2.5 13.997H10.595C10.8711 13.997 11.095 14.2209 11.095 14.497C11.095 14.7731 10.8711 14.997 10.595 14.997H2.5C1.83696 14.997 1.20107 14.7336 0.732233 14.2648C0.263392 13.7959 0 13.16 0 12.497V2.502C0 1.12144 1.12017 0.00324972 2.49955 0.00200029L10.4999 1.59747e-08C10.776 -6.9036e-05 10.9999 0.223733 11 0.499875ZM10.2472 4.1408C10.4456 3.94871 10.7621 3.9538 10.9542 4.15218L13.8592 7.15218C14.0469 7.34606 14.0469 7.65394 13.8592 7.84782L10.9542 10.8478C10.7621 11.0462 10.4456 11.0513 10.2472 10.8592C10.0488 10.6671 10.0437 10.3506 10.2358 10.1522L12.3198 8H4.5C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H12.3198L10.2358 4.84782C10.0437 4.64944 10.0488 4.3329 10.2472 4.1408Z" fill="white"/>
            </svg>

            </div>
            <div className="list-of-carts">
            {cart?.shoeVariations.map((elem,i) => {
                return (
                <div className="item-cart" key={i}>
                    <div className="img-side">
                        <img src={elem.img} alt="" />
                    </div>
                    <div className="text-side">
                    <div className="head-text">
                        <h5> {elem.name} </h5>
                        <h5> Brand | {elem.brand} </h5>
                    </div>
                    <div className="bottom-text">
                        <h5> Model | {elem.model} </h5>
                        <h5> Price | {elem.price} </h5>
                    </div>
                    </div>
                </div>
                )
            })}
            </div>
            <Link to={'/checkout'} className="below-text">
                <h5>
                    Checkout 
                </h5>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.75 25.5C7.0625 25.5 6.47375 25.255 5.98375 24.765C5.49375 24.275 5.24917 23.6867 5.25 23C5.25 22.3125 5.495 21.7238 5.985 21.2338C6.475 20.7438 7.06334 20.4992 7.75 20.5C8.4375 20.5 9.02625 20.745 9.51625 21.235C10.0063 21.725 10.2508 22.3133 10.25 23C10.25 23.6875 10.005 24.2763 9.515 24.7663C9.025 25.2563 8.43667 25.5008 7.75 25.5ZM20.25 25.5C19.5625 25.5 18.9738 25.255 18.4838 24.765C17.9938 24.275 17.7492 23.6867 17.75 23C17.75 22.3125 17.995 21.7238 18.485 21.2338C18.975 20.7438 19.5633 20.4992 20.25 20.5C20.9375 20.5 21.5263 20.745 22.0163 21.235C22.5063 21.725 22.7508 22.3133 22.75 23C22.75 23.6875 22.505 24.2763 22.015 24.7663C21.525 25.2563 20.9367 25.5008 20.25 25.5ZM2.75 3H1.5C1.14584 3 0.848754 2.88 0.608754 2.64C0.368754 2.4 0.249171 2.10334 0.250004 1.75C0.250004 1.39584 0.370004 1.09875 0.610004 0.858754C0.850004 0.618754 1.14667 0.499171 1.5 0.500004H3.5625C3.79167 0.500004 4.01042 0.562504 4.21875 0.687504C4.42709 0.812504 4.58334 0.989588 4.6875 1.21875L9.65625 11.75H18.4063L22.9375 3.625C23.0417 3.41667 23.1875 3.26042 23.375 3.15625C23.5625 3.05209 23.7708 3 24 3C24.4792 3 24.8388 3.20334 25.0788 3.61C25.3188 4.01667 25.3238 4.42792 25.0938 4.84375L20.625 12.9375C20.3958 13.3542 20.0883 13.6771 19.7025 13.9063C19.3167 14.1354 18.895 14.25 18.4375 14.25H9.125L7.75 16.75H21.5C21.8542 16.75 22.1513 16.87 22.3913 17.11C22.6313 17.35 22.7508 17.6467 22.75 18C22.75 18.3542 22.63 18.6513 22.39 18.8913C22.15 19.1313 21.8533 19.2508 21.5 19.25H7.75C6.8125 19.25 6.09875 18.8438 5.60875 18.0313C5.11875 17.2188 5.10334 16.3958 5.5625 15.5625L7.25 12.5L2.75 3ZM14.2188 6.75001H10.25C9.89584 6.75001 9.59875 6.63 9.35875 6.39C9.11875 6.15 8.99917 5.85334 9 5.5C9 5.14584 9.12 4.84876 9.36 4.60876C9.6 4.36876 9.89667 4.24917 10.25 4.25H14.2188L13.0938 3.125C12.8438 2.875 12.7238 2.58334 12.7338 2.25C12.7438 1.91667 12.8742 1.625 13.125 1.375C13.375 1.14584 13.6667 1.02584 14 1.015C14.3333 1.00417 14.625 1.12417 14.875 1.375L18.125 4.62501C18.375 4.87501 18.5 5.16667 18.5 5.5C18.5 5.83334 18.375 6.125 18.125 6.375L14.875 9.62501C14.6458 9.85417 14.3596 9.97417 14.0163 9.98501C13.6729 9.99584 13.3758 9.87584 13.125 9.62501C12.8958 9.39584 12.7813 9.10417 12.7813 8.75001C12.7813 8.39584 12.8958 8.10417 13.125 7.87501L14.2188 6.75001Z" fill="white"/>
                </svg>
            </Link>
        </div>
    )
}

export default Carters