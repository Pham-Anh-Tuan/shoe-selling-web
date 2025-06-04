export interface CartItem {
    id: string;
    productName: string;
    colorId: string;
    colorHex: string;
    sizeId: string;
    size: number;
    quantity: number;
    price: number;
    imageId: string;
    path: string | ArrayBuffer | null;
    availableQuantity: number;
}