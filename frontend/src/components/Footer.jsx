import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#f8e6d8] text-black py-5 text-center">
            <div className="max-w-screen-xl mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} Mangalam.lk. All rights reserved.</p>
                <ul className="flex justify-center space-x-6 mt-3">
                    <li><a href="/about" className="text-black hover:underline">About Us</a></li>
                    <li><a href="/contact" className="text-black hover:underline">Contact</a></li>
                    <li><a href="/privacy" className="text-black hover:underline">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
