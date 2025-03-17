export interface User {
    UserId: '';
    FirstName?: string | '';
    SecondName: '';
    DateOfBirth: Date;
    Password: string;
    Email: String;
    PhoneNumber: number;
    ProfileImage: string;
    IsMailVerified: boolean;
    IsPhoneVerified: boolean;
    InsertBy: string;
    InsertDate: Date;
    UpdateBy: String
    UpdateDate: Date;
}