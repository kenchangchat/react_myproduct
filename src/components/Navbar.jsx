import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Navbar() {

  const [menuAdmin, setMenuAdminState] = useState(false);

  // Use state
  const [homeState, setHomeState] = useState(
    "hvr-underline-from-center nav-link active"
  );
  const [shoppingState, setShoppingState] = useState(
    "hvr-underline-from-center nav-link"
  );
  const [orderhistoryState, setOrderHistoryState] = useState(
    "hvr-underline-from-center nav-link"
  );
  const [productState, setProductState] = useState(
    "hvr-underline-from-center nav-link"
  );
  const [cartState, setCartState] = useState(
    "hvr-underline-from-center nav-link"
  );
  const [buttonState, setbuttonState] = useState(
    "hvr-underline-from-center nav-link"
  );

  const [cartList, setCartList] = useState(() => {
    const savedCartList = localStorage.getItem('cart_list');
    return savedCartList ? JSON.parse(savedCartList) : [];
  });

  const location = useLocation();
  const firstPath = location.pathname.split('/')[1];
  
  useEffect(() => {
    var userType = sessionStorage.getItem("user_type");
    if (userType != null && userType == '1') {
        setMenuAdminState(true);
    }
    switch (firstPath) {
      case "shopping":
        setShopping();
        break;
      case "orderhistory":
        setOrderHistory();
        break;
      case "product":
        setProduct();
        break;
      case "cart":
        setCart();
        break;
      default:
        setHome();
        break;
    }
    
  }, []);

  // Home
  const setHome = () => {
    setHomeState("hvr-underline-from-center nav-link active");
    setShoppingState("hvr-underline-from-center nav-link");
    setOrderHistoryState("hvr-underline-from-center nav-link");
    setProductState("hvr-underline-from-center nav-link");
    setCartState("hvr-underline-from-center nav-link");
  };

  // Shopping
  const setShopping = () => {
    setHomeState("hvr-underline-from-center nav-link");
    setShoppingState("hvr-underline-from-center nav-link active");
    setOrderHistoryState("hvr-underline-from-center nav-link");
    setProductState("hvr-underline-from-center nav-link");
    setCartState("hvr-underline-from-center nav-link");
  };

  // OrderHistory
  const setOrderHistory = () => {
    setHomeState("hvr-underline-from-center nav-link");
    setShoppingState("hvr-underline-from-center nav-link");
    setOrderHistoryState("hvr-underline-from-center nav-link active");
    setProductState("hvr-underline-from-center nav-link");
    setCartState("hvr-underline-from-center nav-link");
  };

  // Product
  const setProduct = () => {
    setHomeState("hvr-underline-from-center nav-link");
    setShoppingState("hvr-underline-from-center nav-link");
    setOrderHistoryState("hvr-underline-from-center nav-link");
    setProductState("hvr-underline-from-center nav-link active");
    setCartState("hvr-underline-from-center nav-link");
  };

  // Product
  const setCart = () => {
    setHomeState("hvr-underline-from-center nav-link");
    setShoppingState("hvr-underline-from-center nav-link");
    setOrderHistoryState("hvr-underline-from-center nav-link");
    setProductState("hvr-underline-from-center nav-link ");
    setCartState("hvr-underline-from-center nav-link active");
  };

  // Total
  // let totalItems = useSelector(selectTotalItems);

  const onLogOut = () => {
      Swal.fire({
          title: "ออกจากระบบ",
          html: "ต้องการออกจากระบบ ใช่หรือไม่?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ตกลง',
      }).then((result) => {
          if (result.isConfirmed) {
              window.location.replace('/logout');
          }
      });
  };

  return (
    <div>
      <div className="nav-container">
        <nav>
          <h5>
            <Link className={homeState} to="/" onClick={setHome}>
              Home
            </Link>
            <Link className={shoppingState} to="/shopping" onClick={setShopping}>
              Shopping
            </Link>
            <Link className={orderhistoryState} to="/orderhistory" onClick={setOrderHistory}>
              Order history
            </Link>
            {
            menuAdmin 
            ? <Link className={productState} to="/product" onClick={setProduct}>
                Product 
              </Link>
            : null
            }
            {/* Badged */}
            <Link className={cartState} to="/cart">
              {/* <button type="button" className="btn btn-primary"> */}
                <AiOutlineShoppingCart /> <Badge bg="light" text="dark">{cartList.length}</Badge>
              {/* </button> */}
            </Link>
            <Link className={buttonState}>
              <button type="button" className="btn btn-danger"  onClick={onLogOut}>
                Logout
              </button>
            </Link>
          </h5>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;