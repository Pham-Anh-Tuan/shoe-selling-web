import { CartItem } from "../Cart/CartContext";

export interface Order {
    fullName: string;
    phoneNumber: string;
    shippingAddress: string;
    payMethod: number;
    totalPrice: number;
    email: string;
    orderItemRequests: CartItem[];
}