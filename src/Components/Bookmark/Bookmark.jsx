import React, { useState, useEffect } from 'react';
import styles from './Bookmark.module.css';

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState(() => {
        const savedBookmarks = localStorage.getItem('bookmarks');
        return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    });
    const [siteName, setSiteName] = useState('');
    const [siteURL, setSiteURL] = useState('');

    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const addBookmark = () => {
        if (siteName === '' || siteURL === '') {
            alert('Please fill in both fields');
            return;
        }

        const newBookmark = {
            name: siteName,
            url: siteURL,
        };

        setBookmarks([...bookmarks, newBookmark]);
        setSiteName('');
        setSiteURL('');
    };

    const deleteBookmark = (index) => {
        const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
        setBookmarks(updatedBookmarks);
    };

    const openSite = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className={styles.container}>
            <h1>Bookmark Manager</h1>
            <div className={styles.inputForm}>
                <label htmlFor="siteName"><i className="icon icon-bookmark"></i> Site Name</label>
                <input
                    type="text"
                    id="siteName"
                    placeholder="Bookmark Name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                />
                <label htmlFor="siteURL"><i className="icon icon-link"></i> Site URL</label>
                <input
                    type="text"
                    id="siteURL"
                    placeholder="Website URL"
                    value={siteURL}
                    onChange={(e) => setSiteURL(e.target.value)}
                />
                <button onClick={addBookmark} className={styles.submitBtn}>Submit</button>
            </div>
            <table className={styles.bookmarkTable}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Website Name</th>
                        <th>Visit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map((bookmark, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{bookmark.name}</td>
                            <td>
                                <button
                                    onClick={() => openSite(bookmark.url)}
                                    className={styles.visitBtn}
                                >
                                    Visit
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => deleteBookmark(index)}
                                    className={styles.deleteBtn}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookmark;
