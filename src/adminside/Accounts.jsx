import React, { useEffect, useState } from 'react';
import { useAccount } from '../context/AccountContext';

const Accounts = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const { handleDeleteAccount, updateAccount } = useAccount();
    const [editedUser, setEditedUser] = useState(null); // Add state for edited user

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

    const handleEditButton = (user) => {
        editAccount(user);
    };

    // Function to save the edited user
    const saveEditedAccount = async () => {
        if (editedUser) {
            // Update the user with editedUser data
            await updateAccount(
                editedUser._id,
                editedUser.email,
                editedUser.password,
                editedUser.displayName
            );

            // Clear the edited user
            setEditedUser(null);
        }
    };

    const editAccount = (user) => {
        setEditedUser(user);
    };

    // Function to cancel the editing process
    const cancelEdit = () => {
        setEditedUser(null);
    };

    return (
        <div className="accounts-component">
            {editedUser && (
                <div className="edit-form">
                    <h2>Edit Account</h2>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={editedUser.email}
                        onChange={(e) => editAccount({ ...editedUser, email: e.target.value })}
                    />
                    <label>Display Name:</label>
                    <input
                        type="text"
                        value={editedUser.displayName}
                        onChange={(e) => editAccount({ ...editedUser, displayName: e.target.value })}
                    />
                    <button onClick={saveEditedAccount}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </div>
            )}
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => handleDeleteAccount(user._id)}>Delete</button>
                                        <button onClick={() => handleEditButton(user)}>Edit</button>
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
