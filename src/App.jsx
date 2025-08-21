// import { useState } from 'react'
// import OrdersPage from './OrdersPage'


// function App() {


//   return (
//     <>
//     <OrdersPage></OrdersPage>
//     </>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OrdersPage from "./OrdersPage";
import AddOrderModal from "./AddOrderModal";
import EditOrderModal from './EditOrderModal'

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/orders" />} />

        
        <Route path="/orders" element={<OrdersPage />} />

        
        <Route path="/orders/new" element={<AddOrderModal />} />
        <Route path="/orders/:id/edit" element={<EditOrderModal />} />
      </Routes>
    </Router>
  );
}

export default App;


