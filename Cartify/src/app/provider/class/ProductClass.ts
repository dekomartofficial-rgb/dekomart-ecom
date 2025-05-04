export class ProductDetails {
    ProductID: number = 0;
    ProductName: string = '';
    ProductDesc: string = '';
    ProductSize: string = '';
    Gender: string = '';
    BasePricing: number = 0;
    Stock: number = 0;
    Discount: number = 0;
    DiscountType: string = '';
    Catogery: string = '';
    OpsMode: string = ''; 
}

export class ProductVairant{
    VariantID: number = 0;
    Colour: string = '';
    Size: number = 0;
    Price: number = 0;
    Stock: number = 0; 
}