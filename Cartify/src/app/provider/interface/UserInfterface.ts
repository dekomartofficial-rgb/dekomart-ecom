export class User {
    UserId: number = 0;
    FirstName: string = '';
    SecondName: string = '';
    DateOfBirth: Date = new Date();
    Password: string = '';
    Email: string = '';
    PhoneNumber: number = 0;
    ProfileImage: string = '';
    IsActiveStatus: boolean = false;
    IsMailVerified: boolean = false;
    IsPhoneVerified: boolean = false;
    UserStatus: string = '';
    InsertBy: string = '';
    InsertDate: Date = new Date();
    UpdateBy: string = '';
    UpdateDate: Date = new Date();
    OpsMode: string = '';
}
