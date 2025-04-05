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
    EmailId: string;
    Password: string;
    AuthType: string;
}
export interface UserProfile {
    UserName: string;
    Email: string;
    ProfieImage: string
}

export class Role {
    RoleId: number = 0;
    RoleName: string = '';
    RoleCode: string = '';
    InsertBy: string = '';
    InsertDate: Date = new Date();
    UpdateBy: string = '';
    UpdateDate: Date = new Date()
}

export class RoleScreen {
    RoleCode: string = '';
    Role:string = ''
    ModuleCode: string = '';
    ScreenGroupName: string = '';
    WindowName: string = '';
    ScreenCode: string = '';
    IsAccess: string = '';
    WindowIcon: string = '';
    GroupIcon: string = '';
}

export interface ProductVariant {
    VariantId?: number;
    VariantName: string;
    Description: string;
    Price: number;
    Stock: number;
    Color?: string;
    Size?: string;
    imageUrl?: string;
  }
  
  export interface Product {
    ProductId?: number;
    ProductName: string;
    CompanyId: number;
    CategoryCode: string;
    BrandCode: string;
    About: string;
    LoggedUserId: number;
    OpsMode: string;
    Variants: ProductVariant[];
  }
  
