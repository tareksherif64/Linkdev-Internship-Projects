import React from 'react';
import styles from './Contact.module.css';

function Contact() {
    return (
        <div className={styles.contact}>
            <h2>Contact Us</h2>
            <form className={styles.form}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;
