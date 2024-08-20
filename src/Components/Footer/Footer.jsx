import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>© 2024 Tarek's Website. All rights reserved.</p>
            <p>Contact: <a href="mailto:tareksherif2020@gmail.com">tareksherif2020@gmail.com</a></p>
        </footer>
    );
}

export default Footer;
