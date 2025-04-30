export interface CartItem {
    id: string;
    productName: string;
    colorHex: string;
    size: number;
    quantity: number;
    price: number;
    path: string | ArrayBuffer | null;
    availableQuantity: number;
}