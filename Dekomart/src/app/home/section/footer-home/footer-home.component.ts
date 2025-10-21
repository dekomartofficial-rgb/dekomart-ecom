import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-home',
    imports: [],
    templateUrl: './footer-home.component.html',
    styleUrl: './footer-home.component.css'
})
export class FooterHomeComponent implements OnInit {

    footerData = [
        {
            title: 'Top Categories',
            links: [
                { label: 'Dining', href: '/dining' },
                { label: 'Decor', href: '/decor' },
                { label: 'Bathroom', href: '/bathroom' },
                { label: 'Bedroom', href: '/bedroom' },
                { label: 'Furniture', href: '/furniture' },
                { label: 'Clocks', href: '/clocks' },
                { label: 'Gifts', href: '/gifts' }
            ]
        },
        {
            title: 'Decor',
            links: [
                { label: 'Wall decor', href: '/decor/wall-decor' },
                { label: 'Decor objects', href: '/decor/objects' },
                { label: 'Candles', href: '/decor/candles' },
                { label: 'Lamp', href: '/decor/lamp' },
                { label: 'Table accents', href: '/decor/table-accents' },
                { label: 'Vase', href: '/decor/vase' },
                { label: 'Baskets', href: '/decor/baskets' },
                { label: 'Mirror', href: '/decor/mirror' },
                { label: 'Tray', href: '/decor/tray' },
                { label: 'Wall art', href: '/decor/wall-art' }
            ]
        },
        {
            title: 'About Us',
            links: [
                { label: 'Our Story', href: '/about/story' },
                { label: 'Our Store', href: '/about/store' },
                { label: 'Blog', href: '/blog' },
                { label: 'Customers Love', href: '/testimonials' },
                { label: 'Careers', href: '/careers' }
            ]
        },
        {
            title: 'Quick Links',
            links: [
                { label: 'Shop All', href: '/shop' },
                { label: 'Best sellers', href: '/best-sellers' },
                { label: 'Sale', href: '/sale' },
                { label: 'Offers', href: '/offers' },
                { label: 'Gift cards', href: '/gift-cards' }
            ]
        },
        {
            title: 'Help',
            links: [
                { label: 'Create a Return', href: '/returns' },
                { label: 'Shipping', href: '/shipping' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Return Policy', href: '/return-policy' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQs', href: '/faqs' }
            ]
        }
    ]; 


    ngOnInit(): void { 
    }
}
