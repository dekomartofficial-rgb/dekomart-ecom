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