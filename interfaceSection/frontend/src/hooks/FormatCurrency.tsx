function formatCurrencyVND(amount: number): string {
    // return amount.toLocaleString('en-US') + ' VND';
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default formatCurrencyVND;