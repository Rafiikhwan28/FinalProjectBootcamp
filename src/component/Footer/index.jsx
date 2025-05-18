import React from 'react';
import './Footer.css'; // Pastikan file CSS terhubung

const Footer = () => {
    return (
        <section className="footer-section">
            <div className="footer-content">
                <div className="footer-header">
                    <h2>HappyTravel</h2>
                    <p>Your Journey Begins Here</p>
                </div>
                <div className="footer-body">
                    <p>
                        HappyTravel adalah platform yang membantu Anda menemukan perjalanan
                        yang menyenangkan dan tak terlupakan. Kami menyediakan informasi lengkap
                        tentang destinasi terbaik di dunia, termasuk akomodasi, restoran, panduan,
                        dan kegiatan menarik di setiap tujuan.
                    </p>
                    <p>
                        Temukan pengalaman perjalanan yang sesuai dengan gaya Anda, baik itu petualangan,
                        liburan santai, atau eksplorasi budaya. Kami di sini untuk membantu Anda merencanakan perjalanan
                        yang sempurna.
                    </p>
                </div>
                <div className="footer-contact">
                    <p>Kontak Kami:</p>
                    <ul>
                        <li>Email: support@happytravel.com</li>
                        <li>Telepon: +123 456 7890</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 HappyTravel. All rights reserved.</p>
            </div>
        </section>
    );
};

export default Footer;
