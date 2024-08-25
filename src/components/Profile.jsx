import React, { useState, useEffect } from 'react';
import { onAuthStateChange } from '../firebase/auth';  // Import from the updated auth.js

const Profile = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            if (currentUser) {
                setUser({
                    name: currentUser.displayName || "No Name", // Use displayName if available
                    email: currentUser.email,
                    password: ""  // Never expose the password in the UI
                });
            } else {
                setUser({
                    name: "",
                    email: "",
                    password: ""
                });
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default Profile;
