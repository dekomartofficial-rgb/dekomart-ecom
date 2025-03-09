export interface ScreenList {
    GroupName: string;
    GroupIcon: string;
    IsHaveChild: number;
    Children: {
        GroupName: string,
        WindowName: string,
        WindowIcon: string,
        WindowUrl: string
    }[]

}

export interface Login {
    EmailId: string ;
    Password: string;
    AuthType: string;
}
export interface UserProfile{
    UserName: string;
    Email: string;
    ProfieImage: string
}