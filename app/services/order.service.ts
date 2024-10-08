import { Order } from '@/components/dashboard/types/order.types';
import axios from '@/utils/axios';


export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const response = await axios.put(`/orders/${orderId}/status`, { status });
  return response.data;
};