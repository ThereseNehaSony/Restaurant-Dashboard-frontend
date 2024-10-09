import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material'; 
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import './Order.css'; // Import your CSS for modal styling

const Order = () => {

  const [dateFilter, setDateFilter] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState(''); 

  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if we're editing
  const [selectedOrder, setSelectedOrder] = useState(null); 


  
  const [newOrder, setNewOrder] = useState({
    createdAt: '',
    customerName: '',
    product: '',
    price: '',
    quantity: '',
    location: '',
    status: 'Pending',
  });

  // Fetch orders from the backend when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/orders/get-orders'); // Replace with your backend API URL
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        const response = await fetch(isEditing ? `http://localhost:8000/orders/edit/${selectedOrder._id}` : 'http://localhost:8000/orders/add', {
            method: isEditing ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        });

        const responseData = await response.json(); // Capture the response data

        console.log('Response from server:', responseData); // Log the response data

        if (response.ok) {
            // If we're editing, update the order in the state
            if (isEditing) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) => (order._id === responseData.updatedOrder._id ? responseData.updatedOrder : order))
                );
            } else {
                // For adding a new order
                setOrders((prevOrders) => [...prevOrders, responseData.order]);
            }

            // Close the modal and reset form fields
            closeModalHandler();
        } else {
            console.error('Failed to add/update order', responseData); // Log error response
        }
    } catch (error) {
        console.error('Error while adding/updating order:', error);
    }
};
  const openEditModalHandler = (order) => {
    setNewOrder({
      createdAt: order.createdAt,
      customerName: order.customerName,
      product: order.product,
      price: order.price,
      quantity: order.quantity,
      location: order.location,
      status: order.status,
    });
    setSelectedOrder(order);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/orders/delete/${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      } else {
        console.error('Failed to delete order', response);
      }
    } catch (error) {
      console.error('Error while deleting order:', error);
    }
  };

  const resetForm = () => {
    setNewOrder({
      createdAt: '',
      customerName: '',
      productName: '',
      price: '',
      quantity: '',
      location: '',
      status: 'Pending',
    });
    setIsEditing(false);
    setSelectedOrder(null);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
    resetForm();
  };

  const clearFilters = () => {
    setDateFilter('');
    setIdFilter('');
    setLocationFilter('');
  };
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt).toISOString().split('T')[0]; // Get only the date part in 'YYYY-MM-DD' format
  
    return (
      (!idFilter || order.orderId.toString().includes(idFilter)) && // Filter by order ID
      (!locationFilter || order.location.toLowerCase().includes(locationFilter.toLowerCase())) && // Filter by location
      (!customerFilter || order.customerName.toLowerCase().includes(customerFilter.toLowerCase())) && // Filter by customer name
      (!dateFilter || orderDate === dateFilter) // Filter by date (compare in 'YYYY-MM-DD' format)
    );
 
  });
  return (
    <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '6px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0 }}>Order List</h4>
        <Button variant="contained" color="grey" startIcon={<PlaylistAddIcon />} onClick={() => setOpenModal(true)} sx={{ color: 'green' }}>
          Add Order
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      label="Order ID"
      variant="outlined"
      size="small"
      style={{ marginRight: '10px', width: '150px' }} // Set width here
      value={idFilter}
      onChange={(e) => setIdFilter(e.target.value)}
      slotProps={{ input: { endAdornment: <SearchIcon /> } }}
    />
    <TextField

  variant="outlined"
  size="small"
  type="date"  // Set the type to "date"
  style={{ marginRight: '10px', width: '150px' }} // Set width here
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}

/>
    <TextField
      label="Location"
      variant="outlined"
      size="small"
      style={{ marginRight: '10px', width: '150px' }} // Set width here
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      slotProps={{ input: { endAdornment: <SearchIcon /> } }}
    />
  </div>
  <Button variant="outlined" onClick={clearFilters}>
    Clear Filters
  </Button>
</div>
      <TableContainer style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredOrders.map((order) => (
              <TableRow key={order?._id}>
               <TableCell>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</TableCell>

                <TableCell>{order?.orderId}</TableCell>
                <TableCell>{order?.customerName}</TableCell>
                <TableCell>{order?.product}</TableCell>
                <TableCell>{order?.price}</TableCell>
                <TableCell>{order?.quantity}</TableCell>
                <TableCell>{order?.location}</TableCell>
                <TableCell>
  <div style={{
    
    padding: '5px 10px',
    borderRadius: '8px',
    color: order?.status === 'Pending' ? 'orange' : // Text color for Pending
          order?.status === 'Approved' ? 'green' : // Text color for Completed
          order?.status === 'Delivered' ? 'red' : // Text color for Canceled
          'black', // Default text color
    backgroundColor: order?.status === 'Pending' ? '#D3D3D3' :
                     order?.status === 'Approved' ? '#DCDCDC ' :
                     order?.status === 'Delivered' ? '#9E9E9E' :
                     'gray', // Default background color
  }}>
    {order?.status}
  </div>
</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => openEditModalHandler(order)}>
                    <BorderColorIcon fontSize="small" sx={{ color: 'orange' }} />
                  </Button>
                  <Button size="small" onClick={() => handleDelete(order._id)}>
                    <DeleteIcon fontSize="small" sx={{ color: 'red' }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Simple Modal */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? 'Edit Order' : 'Add New Order'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField label="Customer Name" name="customerName" onChange={handleInputChange} value={newOrder.customerName} style={{ marginBottom: '10px' }} />
              <TextField label="Product Name" name="productName" onChange={handleInputChange} value={newOrder.product} style={{ marginBottom: '10px' }} />
              <TextField label="Price" name="price" type="number" onChange={handleInputChange} value={newOrder.price} style={{ marginBottom: '10px' }} />
              <TextField label="Quantity" name="quantity" type="number" onChange={handleInputChange} value={newOrder.quantity} style={{ marginBottom: '10px' }} />
              <TextField label="Location" name="location" onChange={handleInputChange} value={newOrder.location} style={{ marginBottom: '10px' }} />
              {isEditing && (
                <TextField label="Status" name="status" select value={newOrder.status} onChange={handleInputChange} style={{ marginBottom: '10px' }} SelectProps={{ native: true }}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Delivered">Delivered</option>
                </TextField>
              )}
            
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Button variant="contained" onClick={handleSubmit} style={{ marginRight: '10px' }}>
                {isEditing ? 'Update Order' : 'Add Order'}
              </Button>
              <Button variant="outlined" onClick={closeModalHandler}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
