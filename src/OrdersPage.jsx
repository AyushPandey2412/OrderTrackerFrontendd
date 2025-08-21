


import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import OrdersKPI from "./OrdersKPI";
const url ="https://ordertrackerbackend-1hho.onrender.com"
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");











  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Inline edit for Grid
  const onCellValueChanged = useCallback(async (params) => {
    const { id } = params.data;
    const field = params.colDef.field;
    const newValue = params.newValue;

    try {
      await axios.patch(`http://localhost:5000/orders/${id}`, {
        [field]: newValue,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, [field]: newValue } : order
        )
      );
    } catch (err) {
      console.error("Error patching order:", err);
    }
  }, []);












  // Bulk delete
  const handleDeleteSelected = async () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const idsToDelete = selectedNodes.map((node) => node.data.id);

    if (idsToDelete.length === 0) {
      alert("Please select orders to delete");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${idsToDelete.length} order(s)?`)) return;

    try {
      await Promise.all(
        idsToDelete.map((id) => axios.delete(`${url}/orders/${id}`))
      );
      setOrders((prev) => prev.filter((order) => !idsToDelete.includes(order.id)));
    } catch (err) {
      console.error("Error deleting orders:", err);
    }
  };














  // Single delete
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${url}/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };














  // Export CSV
const handleExportCSV = () => {
  const worksheetData = sortedOrders.map(o => ({
    "Order ID": o.id,
    "Customer Name": o.customer_name,
    "Date": new Date(o.order_date).toLocaleDateString("en-GB"),
    "Amount": o.total_amount,
    "Status": o.status
  }));
  const ws = XLSX.utils.json_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orders");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "orders.xlsx");
};







  // Status badge renderer with improved styling
  const StatusRenderer = (params) => {
    const status = params.value;
    let colorClasses = "";
    
    switch (status) {
      case "Pending":
        colorClasses = "bg-amber-100 text-amber-800 border-amber-200";
        break;
      case "Shipped":
        colorClasses = "bg-blue-100 text-blue-800 border-blue-200";
        break;
      case "Delivered":
        colorClasses = "bg-green-100 text-green-800 border-green-200";
        break;
      default:
        colorClasses = "bg-gray-100 text-gray-800 border-gray-200";
    }
    
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses}`}>
          {status}
        </span>
      </div>
    );
  };














  // Amount formatter
  const AmountRenderer = (params) => {
    const amount = params.value || params.data?.total_amount || 0;
    const numericAmount = parseFloat(amount) || 0;
    return (
      <div className="w-full h-full flex items-center justify-end">
        <span className="font-semibold text-gray-900 text-sm">
          ${numericAmount.toFixed(2)}
        </span>
      </div>
    );
  };










  // Filter + Search
  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === "All" || order.status === statusFilter;
    const matchSearch =
      searchQuery === "" ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });












  // Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let val = 0;
    if (sortBy === "id") val = a.id - b.id;
    if (sortBy === "order_date") val = new Date(a.order_date) - new Date(b.order_date);
    if (sortBy === "total_amount") val = a.total_amount - b.total_amount;
    if (sortBy === "customer_name") val = a.customer_name.localeCompare(b.customer_name);
    return sortOrder === "asc" ? val : -val;
  });





  const columnDefs = [
    { 
      field: "id", 
      headerName: "Order ID", 
      width: 125,
      minWidth: 115,
      maxWidth: 135,
      checkboxSelection: true, 
      headerCheckboxSelection: true,
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        fontFamily: 'monospace',
        fontSize: '14px'
      },
      headerClass: "bg-gray-50",
      suppressSizeToFit: true,
      lockPosition: true
    },
    { 
      field: "customer_name", 
      headerName: "Customer Name", 
      flex: 2,
      minWidth: 140,
      sortable: true, 
      filter: true,
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        fontWeight: 500
      },
      suppressSizeToFit: true
    },
    {
      field: "order_date",
      headerName: "Date",
      width: 100,
      minWidth: 90,
      maxWidth: 110,
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '13px'
      },
      valueFormatter: (params) => {
        if (!params.value) return "";
        const date = new Date(params.value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).substr(2);
        return `${day}/${month}/${year}`;
      },
    },
    { 
      field: "total_amount", 
      headerName: "Amount", 
      width: 100,
      minWidth: 90,
      maxWidth: 120,
      sortable: true, 
      filter: true, 
      editable: true,
      cellRenderer: AmountRenderer,
      suppressSizeToFit: true,
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end'
      },
      type: 'numericColumn'
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      minWidth: 100,
      maxWidth: 140,
      sortable: true,
      filter: true,
      editable: true,
      cellRenderer: StatusRenderer,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { 
        values: ["Pending", "Shipped", "Delivered"]
      },
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      },
      suppressSizeToFit: true
    },
    {
      headerName: "Actions",
      field: "actions",
      flex: 1,
      minWidth: 140,
      maxWidth: 160,
      suppressSizeToFit: true,
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      },
      suppressMenu: true,
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center space-x-2 h-full w-full">
          <Link
            to={`/orders/${params.data.id}/edit`}
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 focus:outline-none transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteOrder(params.data.id)}
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100 focus:outline-none transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];










  
  // Grid options for better styling and pagination
  const gridOptions = {
    defaultColDef: {
      resizable: false,
      sortable: true,
      filter: true,
      floatingFilter: false,
      cellStyle: { 
        display: 'flex', 
        alignItems: 'center',
        height: '100%'
      },
      suppressSizeToFit: true,
    },
    pagination: true,
    paginationPageSize: 20,
    paginationPageSizeSelector: [10, 20, 50, 100],
    rowHeight: 50,
    headerHeight: 44,
    animateRows: true,
    rowSelection: "multiple",
    suppressRowClickSelection: true,
    rowMultiSelectWithClick: false,
    enableCellTextSelection: true,
    suppressHorizontalScroll: true,
    suppressColumnVirtualisation: false,
    fillHandleDirection: 'xy',
    suppressScrollOnNewData: true,
    suppressMenuHide: true,
    paginationNumberFormatter: (params) => {
      return params.value.toLocaleString();
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage and track your orders ({filteredOrders.length} total)
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Link
                  to="/orders/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Order
                </Link>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[120px]"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-[140px]"
                >
                  <option value="id">Sort by ID</option>
                  <option value="order_date">Sort by Date</option>
                  <option value="total_amount">Sort by Amount</option>
                  <option value="customer_name">Sort by Customer</option>
                </select>

                <button
                  onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm flex items-center gap-1"
                >
                  {sortOrder === "asc" ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Asc
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Desc
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDeleteSelected}
                  className="inline-flex items-center px-3 py-2 bg-red-50 text-red-700 text-sm font-medium border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Selected
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 text-sm font-medium border border-green-200 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>


        <OrdersKPI></OrdersKPI>

        {/* Grid Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <style>{`
            /* Global AG Grid Cell Alignment Fix */
            .ag-theme-quartz .ag-cell {
              display: flex !important;
              align-items: center !important;
              height: 100% !important;
              border-right: 1px solid #f3f4f6 !important;
              padding: 0 12px !important;
            }
            
            .ag-theme-quartz .ag-cell-wrapper {
              height: 100% !important;
              display: flex !important;
              align-items: center !important;
            }
            
            .ag-theme-quartz .ag-cell-value {
              line-height: normal !important;
            }
            
            /* Checkbox column specific alignment */
            .ag-theme-quartz .ag-selection-checkbox {
              display: flex !important;
              align-items: center !important;
              height: 100% !important;
            }
            
            /* Header alignment */
            .ag-theme-quartz .ag-header-cell {
              display: flex !important;
              align-items: center !important;
              border-right: 2px solid #d1d5db !important;
            }
            
            .ag-theme-quartz .ag-header-cell:last-child {
              border-right: 1px solid #e5e7eb !important;
            }
            
            .ag-theme-quartz .ag-header-cell-text {
              font-weight: 600 !important;
              color: #374151 !important;
              line-height: normal !important;
            }
            
            /* Cell editor styling */
            .ag-theme-quartz .ag-cell-editor {
              height: 36px !important;
              min-height: 36px !important;
              display: flex !important;
              align-items: center !important;
            }
            
            .ag-theme-quartz .ag-cell-editor select {
              height: 32px !important;
              min-height: 32px !important;
              font-size: 12px !important;
              padding: 4px 8px !important;
              border: 1px solid #d1d5db !important;
              border-radius: 4px !important;
            }
            
            .ag-theme-quartz .ag-cell-editor input {
              height: 32px !important;
              min-height: 32px !important;
              font-size: 13px !important;
              padding: 4px 8px !important;
              border: 1px solid #d1d5db !important;
              border-radius: 4px !important;
            }
            
            /* Row hover effects */
            .ag-theme-quartz .ag-row:hover .ag-cell {
              border-right: 1px solid #e5e7eb !important;
            }
            
            /* Additional styling */
            .ag-theme-quartz .ag-popup {
              border-radius: 4px !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
            }
            
            .ag-theme-quartz .ag-icon-filter {
              color: #6b7280 !important;
              opacity: 0.7 !important;
            }
            
            .ag-theme-quartz .ag-header-cell:hover .ag-icon-filter {
              opacity: 1 !important;
              color: #3b82f6 !important;
            }
            
            .ag-theme-quartz .ag-header-cell-menu-button {
              opacity: 0.6 !important;
            }
            
            .ag-theme-quartz .ag-header-cell:hover .ag-header-cell-menu-button {
              opacity: 1 !important;
            }
          `}</style>
          <div 
            className="ag-theme-quartz" 
            style={{ 
              height: "calc(100vh - 400px)", 
              minHeight: "500px",
              width: "100%",
              '--ag-border-color': '#e5e7eb',
              '--ag-header-background-color': '#f9fafb',
              '--ag-header-foreground-color': '#374151',
              '--ag-odd-row-background-color': '#ffffff',
              '--ag-even-row-background-color': '#f9fafb',
              '--ag-row-hover-color': '#f3f4f6',
              '--ag-selected-row-background-color': '#dbeafe',
              '--ag-range-selection-background-color': '#dbeafe',
              '--ag-font-family': 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              '--ag-font-size': '13px',
              '--ag-header-height': '44px',
              '--ag-row-height': '50px',
              '--ag-borders': 'solid 1px #e5e7eb',
              '--ag-border-radius': '0px',
              '--ag-cell-horizontal-padding': '12px',
              '--ag-input-height': '32px',
            }}
          >
            <AgGridReact
              rowData={sortedOrders}
              columnDefs={columnDefs}
              gridOptions={gridOptions}
              onGridReady={(params) => {
                setGridApi(params.api);
                // Force column sizing
                setTimeout(() => {
                  params.api.sizeColumnsToFit();
                }, 100);
              }}
              onCellValueChanged={onCellValueChanged}
              suppressMovableColumns={true}
              suppressMenuHide={true}
              enableRangeSelection={true}
              rowBuffer={10}
              suppressRowTransform={true}
              onFirstDataRendered={(params) => {
                setTimeout(() => {
                  params.api.sizeColumnsToFit();
                }, 100);
              }}
              onGridSizeChanged={(params) => {
                setTimeout(() => {
                  params.api.sizeColumnsToFit();
                }, 100);
              }}
              domLayout="normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}





