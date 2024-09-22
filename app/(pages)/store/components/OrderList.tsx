import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const OrderInfo = styled.span`
  flex-grow: 1;
`;

const StatusSelect = styled.select`
  padding: 5px;
  border-radius: 4px;
`;

interface OrderListProps {
//   orders: Order[];
  orders: any[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateOrderStatus }) => {
  return (
    <List>
      {orders.map((order) => (
        <ListItem key={order.id}>
          <OrderInfo>Order #{order.id} - ${order.total}</OrderInfo>
          <StatusSelect 
            value={order.status} 
            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </StatusSelect>
        </ListItem>
      ))}
    </List>
  );
};

export default OrderList;