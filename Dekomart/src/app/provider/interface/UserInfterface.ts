export class User {
    UserId: number = 0;
    FirstName: string = '';
    SecondName: string = '';
    DateOfBirth: string = '';
    Password: string = '';
    Email: string = '';
    PhoneNumber: number | null = null;
    ProfileImage: string = '';
    UserRole: string = '';
    UserStatus: number | any = null;
    IsMailVerified: number = 0;
    IsPhoneVerified: number = 0;
    UserStatusDesc: string = '';
    InsertBy: string = '';
    InsertDate: Date | null = null;
    UpdateBy: string = '';
    UpdateDate: Date | null = null;
    OpsMode: string = '';
}
