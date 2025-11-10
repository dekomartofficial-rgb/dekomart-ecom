import { Component, OnInit } from '@angular/core';
import { AdminRoutingModule } from "@/app/pages/admin/admin-routing.module";
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { Router } from '@angular/router';
export interface MenuSection {
    title: string;
    links: { label: string; href: string; htcode: string, type: string , icon: string}[];
}
@Component({
    selector: 'app-footer-home',
    imports: [AdminRoutingModule],
    templateUrl: './footer-home.component.html',
    styleUrl: './footer-home.component.css'
})


export class FooterHomeComponent implements OnInit {

    constructor(private http: HttpClientService, private router: Router,) { }
    footerData: MenuSection[] = [];

    // footerData = [
    //     {
    //         title: 'Top Categories',
    //         links: [
    //             { label: 'Dining', href: 'windowrender' },
    //             { label: 'Decor', href: '/decor' },
    //             { label: 'Bathroom', href: '/bathroom' },
    //             { label: 'Bedroom', href: '/bedroom' },
    //             { label: 'Furniture', href: '/furniture' },
    //             { label: 'Clocks', href: '/clocks' },
    //             { label: 'Gifts', href: '/gifts' }
    //         ]
    //     },
    //     {
    //         title: 'Decor',
    //         links: [
    //             { label: 'Wall decor', href: '/decor/wall-decor' },
    //             { label: 'Decor objects', href: '/decor/objects' },
    //             { label: 'Candles', href: '/decor/candles' },
    //             { label: 'Lamp', href: '/decor/lamp' },
    //             { label: 'Table accents', href: '/decor/table-accents' },
    //             { label: 'Vase', href: '/decor/vase' },
    //             { label: 'Baskets', href: '/decor/baskets' },
    //             { label: 'Mirror', href: '/decor/mirror' },
    //             { label: 'Tray', href: '/decor/tray' },
    //             { label: 'Wall art', href: '/decor/wall-art' }
    //         ]
    //     },
    //     {
    //         title: 'About Us',
    //         links: [
    //             { label: 'Our Story', href: '/about/story' },
    //             { label: 'Our Store', href: '/about/store' },
    //             { label: 'Blog', href: '/blog' },
    //             { label: 'Customers Love', href: '/testimonials' },
    //             { label: 'Careers', href: '/careers' }
    //         ]
    //     },
    //     {
    //         title: 'Quick Links',
    //         links: [
    //             { label: 'Shop All', href: '/shop' },
    //             { label: 'Best sellers', href: '/best-sellers' },
    //             { label: 'Sale', href: '/sale' },
    //             { label: 'Offers', href: '/offers' },
    //             { label: 'Gift cards', href: '/gift-cards' }
    //         ]
    //     },
    //     {
    //         title: 'Help',
    //         links: [
    //             { label: 'Create a Return', href: '/returns' },
    //             { label: 'Shipping', href: '/shipping' },
    //             { label: 'Privacy Policy', href: '/privacy' },
    //             { label: 'Return Policy', href: '/return-policy' },
    //             { label: 'Terms & Conditions', href: '/terms' },
    //             { label: 'Contact Us', href: '/contact' },
    //             { label: 'FAQs', href: '/faqs' }
    //         ]
    //     }
    // ];


    ngOnInit(): void {
        this.getFooterWindows()
    }

    getFooterWindows() {
        this.http.get<any[]>('user/GetDynamicWindowRender', { GroupName: 'Footer' }).subscribe((res) => {
            if (res) {
                const grouped = this.groupBy(res, 'Title') 
                this.footerData = Object.keys(grouped).map(groupName => ({
                    title: groupName,
                    links: grouped[groupName].map(item => ({
                        label: item.HtName,
                        href: item.WindowUrl,
                        htcode: item.HtCatCode,
                        type: item.Type,
                        icon: item.Icon
                    }))
                }));

                console.log(this.footerData)
            }
        })
    }
  
    // Helper to group array of objects by property
    private groupBy(array: any[], key: string): Record<string, any[]> {
        return array.reduce((result, current) => {
            (result[current[key]] = result[current[key]] || []).push(current);
            return result;
        }, {} as Record<string, any[]>);
    }
}
