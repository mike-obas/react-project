
const localStorage = window.localStorage;
//localStorage.removeItem
export const countCartItems = () => {
    if (localStorage.getItem("cartItems")) {
        let items = JSON.parse(localStorage.getItem("cartItems"));
        return items.length
    }
    else{ return 0}
}

export function setCartItems (props) {
  const {productId, category, quantity, consumeContext} = props
  const item = {
    identifier: productId + category,
    productId,
    category,
    quantity,
  };
    let modalContent = {
      open: true,
      message: '',
      successLink: 'cart',
      successLinkText: 'Checkout',
      cancelText: 'Continue shopping'
    };

  if (localStorage.getItem("cartItems")) {
    let products = JSON.parse(localStorage.getItem("cartItems"));
    new Promise((resolve, reject) => {
      products.forEach((product, index, products) => {
        if (item.identifier === product.identifier) {
          product.quantity += item.quantity;
          resolve(product.quantity);
        } else if (
          index === products.length - 1 &&
          item.identifier !== product.identifier
        ) {
          reject();
        }
      });
    })
      .then((msg) => {
        localStorage.setItem("cartItems", JSON.stringify(products));
        modalContent.message = `This item is already in your shopping cart, its quantity has been updated to ${msg}`
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
      })
      .catch(() => {
        products.push(item);
        localStorage.setItem("cartItems", JSON.stringify(products));
        modalContent.message = 'Your product has been added to cart succesfully'
        return consumeContext.setModal({ type: "open", modalContent: modalContent })
      });
  } else {
    let newProducts = [item];
    new Promise((resolve, reject) => {
      localStorage.setItem("cartItems", JSON.stringify(newProducts));
      resolve();
    }).then(() => {
      modalContent.message = 'Your product has been added to cart succesfully'
      return consumeContext.setModal({ type: "open", modalContent: modalContent })
    });
  }
}
//set recentlyViewed items
export function setRecentlyViewedItems (props) {
  const {productId, category } = props;
  const item = {
    identifier: productId + category,
    productId,
    category,
  };
  if (localStorage.getItem("recentlyViewedItems")) {
    let products = JSON.parse(localStorage.getItem("recentlyViewedItems"));
    new Promise((resolve, reject) => {
      products.forEach((product, index, products) => {
        if (item.identifier === product.identifier) {
          resolve();
        } else if (
          index === products.length - 1 &&
          item.identifier !== product.identifier
        ) {
          reject();
        }
      });
    })
    .then()
    .catch(() => {
      products.length < 8 && products.unshift(item);
      products.length === 7 &&  products.pop();
      localStorage.setItem("recentlyViewedItems", JSON.stringify(products));
    })  
  } else {
    let newProducts = [item];
    return localStorage.setItem("recentlyViewedItems", JSON.stringify(newProducts));
  }
}
//increase cartItems quantity
export function increaseQuantity (props) {
  const {productId, category} = props
  const item = {
    identifier: productId + category
  };
  if (localStorage.getItem("cartItems")) {
    let products = JSON.parse(localStorage.getItem("cartItems"));
    new Promise((resolve, reject) => {
      products.forEach((product, index, products) => {
        if (item.identifier === product.identifier) {
          product.quantity += 1;
          resolve(product.quantity);
        } else if (
          index === products.length - 1 &&
          item.identifier !== product.identifier
        ) {
          reject();
        }
      });
    })
      .then(() => {
        localStorage.setItem("cartItems", JSON.stringify(products));
      })
      .catch();
  } 
  else{}
}
//decrease cartItem quantity
export function decreaseQuantity (props) {
  const {productId, category} = props
  const item = {
    identifier: productId + category
  };
  if (localStorage.getItem("cartItems")) {
    let products = JSON.parse(localStorage.getItem("cartItems"));
    new Promise((resolve, reject) => {
      products.forEach((product, index, products) => {
        if (item.identifier === product.identifier) {
          product.quantity -= 1;
          resolve(product.quantity);
        } else if (
          index === products.length - 1 &&
          item.identifier !== product.identifier
        ) {
          reject();
        }
      });
    })
      .then(() => {
        localStorage.setItem("cartItems", JSON.stringify(products));
      })
      .catch();
  } 
  else{}
}
//delete cartItem
export function deleteCartItem(props) {
  const {productId, category} = props
  const item = {
    identifier: productId + category
  };
  if (localStorage.getItem("cartItems")) {
    let products = JSON.parse(localStorage.getItem("cartItems"));
    if(products.length > 1){
    new Promise((resolve, reject) => {
      products.forEach((product, index, products) => {
         if (item.identifier === product.identifier) {
          products.splice(index, 1)
          resolve(products);
        }
        else if (
          index === products.length - 1 &&
          item.identifier !== product.identifier
        ) {
          reject();
        }
      });
    })
      .then((products) => {
        localStorage.setItem("cartItems", JSON.stringify(products));
      })
      .catch();
      
    }
    else{
       localStorage.removeItem("cartItems")
      }
  } 
  
}


// let products
// if(localStorage.getItem('cartItems')){
//  products = JSON.parse(localStorage.getItem('cartItems'))
// }
// console.log(products)
// const handleIncrease = (e) => {
//     for (let i = 0; i < products.length; i++) {
//         if(e.target.value === products[i].identifier){
//             products[i].quantity += 10
//             break
//         }
//      }
//       localStorage.setItem("cartItems", JSON.stringify(products))
// }

// return (
//     <div>
//         <button
//         value='musical_system652r6yukwuudw7e22'
//         onClick={handleIncrease}
//         >
//             Increase
//         </button>
//     </div>
// )
