export class CustomerReg {
    UserId: number = 0;
    FirstName: string = '';
    SecondName: string = '';
    Dob: string | null = null;
    Password: string = '';
    CPassword: string = '';
    Email: string = '';
    PhoneNumber?: number = undefined;
    ProfileImage: string = '';
    OpsMode: string = '';
}
export class ResetPassword {
    OpsMode: string = ''
    CurrentPassword: string = ''
    NewPassword: string = ''
    CNewPassword: string = ''
}
export class CartItem {
    ProductId: number = 0
    Size: string = ''
    Quantity: number = 0
    OpsMode: string = ''
}

export class UserAddress {
    AddressId: number = 0
    FullName!: string;
    MobileNumber: number = 0;
    Pincode!: number;
    FlatHouseBuildCompany!: string;
    AreaStrtVillage!: string;
    LandMark!: string;
    CityTown!: string;
    State!: string;
    Country: string = 'INDIA';
    TownCity!: string;
    IsDefualt: number = 0
    OpsMode: string = ''
}

export class SaveOrder {
    OrderId: number = 0;
    UserId: number = 0;
    CartId: number = 0;
    OpsMode: string = ''
}

export class PlaceOrder {
    OrderId: number = 0;
    UserId: number = 0;
    PaymentMode: string = ''
    OpsMode: string = ''
    RazorpayOrderId: string = ''
    RazorpayPaymentId: string = ''
    RazorpaySignature: string = ''
    PaymetStatus: string = ''
    TotalPayableAmount: number = 0
    UserName: string = ''
    UserEmail: string = ''
    UserPhone: number = 0
    OrderNo: string = ''
}

export class MoveToStep{
    OrderId: number = 0;
    OpsMode: string = ''
    ExpDeliveryDate : Date | undefined
    DeliveryAgnetNumber: number = 0;
}