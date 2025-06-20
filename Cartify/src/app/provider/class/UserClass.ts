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