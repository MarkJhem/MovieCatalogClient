

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('User not authenticated.');
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo })
        });

        if (response.ok) {
            setMessage('Profile updated successfully.');
        } else {
            const errorData = await response.json();
            setMessage(`Error: ${errorData.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        value={mobileNo}
                        onChange={e => setMobileNo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};

export default UpdateProfile;
