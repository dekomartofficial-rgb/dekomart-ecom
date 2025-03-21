export class User {
    UserId: number = 0;
    FirstName: string = '';
    SecondName: string = '';
    DateOfBirth: Date | null = null;
    Password: string = '';
    Email: string = '';
    PhoneNumber: number | null = null;
    ProfileImage: string = '';
    UserRole: string= '';
    IsActiveStatus: string = '';
    IsMailVerified: number = 0;
    IsPhoneVerified: number = 0;
    UserStatus: string = '';
    InsertBy: string = '';
    InsertDate: Date | null = null;
    UpdateBy: string = '';
    UpdateDate: Date | null = null;
    OpsMode: string = '';
}
