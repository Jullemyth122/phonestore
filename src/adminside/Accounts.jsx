import React, { useEffect, useState } from 'react';

const Accounts = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(
        users.filter(
            (user) =>
            user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        );
    }, [users, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeleteAccount = async (userId) => {
    try {
        const response = await fetch(`http://localhost:7777/auth/delete-account/${userId}`, {
        method: 'DELETE',
        });

        if (response.ok) {
        // Account deleted successfully, you can update the UI as needed
        // For example, you can fetch the updated list of accounts here
        } else {
        // Handle errors if the deletion fails
        console.error('Error deleting account:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting account:', error);
    }
    };

    return (
        <div className="accounts-component">
            <div className="account-subcomponent">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                 </div>
                <div className="list-of-accounts">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={index}>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                <button onClick={() => handleDeleteAccount(user._id)}>Delete</button>
                                </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
