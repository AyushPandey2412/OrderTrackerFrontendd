// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// const url ="https://ordertrackerbackend-1hho.onrender.com"
// export default function EditOrderModal() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Initialize React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//     reset,
//   } = useForm({
//     defaultValues: {
//       customer_name: "",
//       order_date: "",
//       total_amount: "",
//       status: "Pending",
//     },
//   });

//   const watchedAmount = watch("total_amount");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axios.get(`${url}/orders/${id}`);
//         const orderData = {
//           ...res.data,
//           order_date: res.data.order_date ? new Date(res.data.order_date).toISOString().split('T')[0] : '',
//         };
//         reset(orderData);
//       } catch (err) {
//         console.error("❌ Error fetching order:", err);
        
//         const errorNotification = document.createElement('div');
//         errorNotification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
//         errorNotification.innerHTML = '❌ Failed to load order. Please try again.';
//         document.body.appendChild(errorNotification);
        
//         setTimeout(() => {
//           document.body.removeChild(errorNotification);
//         }, 4000);
        
//         navigate("/orders");
//       }
//     };
    
//     if (id) {
//       fetchOrder();
//     }
//   }, [id, reset, navigate]);

//   const onSubmit = async (data) => {
//     try {
//       const formattedData = {
//         ...data,
//         total_amount: parseFloat(data.total_amount),
//         order_date: new Date(data.order_date).toISOString(),
//       };
      
//       await axios.put(`${url}/orders/${id}`, formattedData);
      
  
//       const successNotification = document.createElement('div');
//       successNotification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
//       successNotification.innerHTML = '✅ Order updated successfully!';
//       document.body.appendChild(successNotification);
      
//       setTimeout(() => {
//         document.body.removeChild(successNotification);
//       }, 3000);
      
//       navigate("/orders");
//     } catch (err) {
//       console.error("Error updating order:", err);
      

//       const errorNotification = document.createElement('div');
//       errorNotification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
//       errorNotification.innerHTML = 'Failed to update order. Please try again.';
//       document.body.appendChild(errorNotification);
      
//       setTimeout(() => {
//         document.body.removeChild(errorNotification);
//       }, 4000);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/orders");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">

//       <div className="fixed inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//         }} />
//       </div>

//       <div className="relative max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Order #{id}</h1>
//           <p className="text-gray-600 max-w-md mx-auto">
//             Update the order details below to modify the existing order
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//             <h2 className="text-xl font-semibold text-white flex items-center">
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//               Order Information
//             </h2>
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//             <div className="space-y-2">
//               <label htmlFor="customer_name" className="block text-sm font-semibold text-gray-700 mb-2">
//                 <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 Customer Name *
//               </label>
//               <div className="relative">
//                 <input
//                   id="customer_name"
//                   type="text"
//                   placeholder="Enter customer's full name"
//                   {...register("customer_name", { 
//                     required: "Customer name is required",
//                     minLength: { value: 2, message: "Name must be at least 2 characters" },
//                     pattern: { value: /^[A-Za-z\s]+$/, message: "Name can only contain letters and spaces" }
//                   })}
//                   className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                     errors.customer_name 
//                       ? 'border-red-300 bg-red-50' 
//                       : 'border-gray-300 hover:border-gray-400 focus:bg-white'
//                   }`}
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//               </div>
//               {errors.customer_name && (
//                 <div className="flex items-center mt-2 text-red-600 text-sm">
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   {errors.customer_name.message}
//                 </div>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="order_date" className="block text-sm font-semibold text-gray-700 mb-2">
//                 <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 Order Date *
//               </label>
//               <div className="relative">
//                 <input
//                   id="order_date"
//                   type="date"
//                   {...register("order_date", { 
//                     required: "Order date is required"
//                   })}
//                   className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                     errors.order_date 
//                       ? 'border-red-300 bg-red-50' 
//                       : 'border-gray-300 hover:border-gray-400 focus:bg-white'
//                   }`}
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               </div>
//               {errors.order_date && (
//                 <div className="flex items-center mt-2 text-red-600 text-sm">
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   {errors.order_date.message}
//                 </div>
//               )}
//             </div>

//             {/* Total Amount Field */}
//             <div className="space-y-2">
//               <label htmlFor="total_amount" className="block text-sm font-semibold text-gray-700 mb-2">
//                 <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//                 </svg>
//                 Total Amount *
//               </label>
//               <div className="relative">
//                 <input
//                   id="total_amount"
//                   type="number"
//                   placeholder="0.00"
//                   step="0.01"
//                   min="0"
//                   {...register("total_amount", {
//                     required: "Total amount is required",
//                     min: { value: 0.01, message: "Amount must be greater than 0" },
//                     max: { value: 999999.99, message: "Amount cannot exceed $999,999.99" },
//                   })}
//                   className={`w-full px-4 py-3 pl-12 pr-16 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                     errors.total_amount 
//                       ? 'border-red-300 bg-red-50' 
//                       : 'border-gray-300 hover:border-gray-400 focus:bg-white'
//                   }`}
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <span className="text-gray-500 font-medium">$</span>
//                 </div>
//                 {watchedAmount && (
//                   <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                     <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
//                       USD
//                     </span>
//                   </div>
//                 )}
//               </div>
//               {errors.total_amount && (
//                 <div className="flex items-center mt-2 text-red-600 text-sm">
//                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   {errors.total_amount.message}
//                 </div>
//               )}
//               {watchedAmount && !errors.total_amount && (
//                 <div className="text-sm text-gray-500 mt-1">
//                   Amount: ${parseFloat(watchedAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                 </div>
//               )}
//             </div>

      
//             <div className="space-y-2">
//               <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
//                 <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Order Status
//               </label>
//               <div className="relative">
//                 <select
//                   id="status"
//                   {...register("status")}
//                   className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200 appearance-none bg-white text-gray-700 font-medium"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                 </div>
//                 <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="mt-2 text-xs text-gray-500">
//                 <div className="flex items-center space-x-4">
//                   <span className="flex items-center">
//                     <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
//                     Pending
//                   </span>
//                   <span className="flex items-center">
//                     <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
//                     Shipped
//                   </span>
//                   <span className="flex items-center">
//                     <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
//                     Delivered
//                   </span>
//                 </div>
//               </div>
//             </div>

    
//             <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 disabled={isSubmitting}
//                 className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//                 Cancel
//               </button>
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full sm:flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                     </svg>
//                     Updating Order...
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                     </svg>
//                     Update Order
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

  
//         <div className="text-center mt-6 text-sm text-gray-500">
//           <p>All fields marked with * are required. Changes will be saved to your database.</p>
//         </div>
//       </div>
//     </div>
//   );
// }








import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const url ="https://ordertrackerbackend-1hho.onrender.com"

export default function EditOrderModal() {
  const { id } = useParams();
  const navigate = useNavigate();

const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      customer_name: "",
      order_date: "",
      total_amount: "",
      status: "Pending",
    },
  });


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${url}/orders/${id}`);
        const orderData = {
          ...res.data,
          order_date: res.data.order_date ? new Date(res.data.order_date).toISOString().split('T')[0] : '',
        };
        reset(orderData);
      } catch (err) {
        console.error("Error fetching order:", err);
        
        const errorNotification = document.createElement('div');
        errorNotification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
        errorNotification.innerHTML = 'Failed to load order. Please try again.';
        document.body.appendChild(errorNotification);
        
        setTimeout(() => {
          document.body.removeChild(errorNotification);
        }, 4000);
        
        navigate("/orders");
      }
    };
    
    if (id) {
      fetchOrder();
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        total_amount: parseFloat(data.total_amount),
        order_date: new Date(data.order_date).toISOString(),
      };
      
      await axios.put(`${url}/orders/${id}`, formattedData);
      
  
      const successNotification = document.createElement('div');
      successNotification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
      successNotification.innerHTML = '✅ Order updated successfully!';
      document.body.appendChild(successNotification);
      
      setTimeout(() => {
        document.body.removeChild(successNotification);
      }, 3000);
      
      navigate("/orders");
    } catch (err) {
      console.error("Error updating order:", err);
      

      const errorNotification = document.createElement('div');
      errorNotification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
      errorNotification.innerHTML = 'Failed to update order. Please try again.';
      document.body.appendChild(errorNotification);
      
      setTimeout(() => {
        document.body.removeChild(errorNotification);
      }, 4000);
    }
  };

  const handleCancel = () => {
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Order #{id}</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Update the order details below to modify the existing order
          </p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Order Information
            </h2>
          </div>

          
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          
            <div className="space-y-2">
              <label htmlFor="customer_name" className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Name *
              </label>
              <div className="relative">
                <input
                  id="customer_name"
                  type="text"
                  placeholder="Enter customer's full name"
                  {...register("customer_name", { 
                    required: "Customer name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                    pattern: { value: /^[A-Za-z\s]+$/, message: "Name can only contain letters and spaces" }
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.customer_name 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 focus:bg-white'
                  }`}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {errors.customer_name && (
                <div className="flex items-center mt-2 text-red-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.customer_name.message}
                </div>
              )}
            </div>

            
            <div className="space-y-2">
              <label htmlFor="order_date" className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Order Date *
              </label>
              <div className="relative">
                <input
                  id="order_date"
                  type="date"
                  {...register("order_date", { 
                    required: "Order date is required"
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.order_date 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 focus:bg-white'
                  }`}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.order_date && (
                <div className="flex items-center mt-2 text-red-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.order_date.message}
                </div>
              )}
            </div>

            
            <div className="space-y-2">
              <label htmlFor="total_amount" className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Total Amount *
              </label>
              <div className="relative">
                <input
                  id="total_amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  {...register("total_amount", {
                    required: "Total amount is required",
                    min: { value: 0.01, message: "Amount must be greater than 0" },
                    max: { value: 999999.99, message: "Amount cannot exceed ₹999,999.99" },
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.total_amount 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400 focus:bg-white'
                  }`}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">₹</span>
                </div>
              </div>
              {errors.total_amount && (
                <div className="flex items-center mt-2 text-red-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.total_amount.message}
                </div>
              )}
            </div>

            
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="w-4 h-4 inline mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Order Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  {...register("status")}
                  className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200 appearance-none bg-white text-gray-700 font-medium"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                    Pending
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    Shipped
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Delivered
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    CreateOrder...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>All fields marked with * are required. The order will be saved to your database.</p>
        </div>
      </div>
    </div>
  );
}























