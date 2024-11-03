import React, { useEffect, useState } from 'react';
import useUsers from '../../hooks/useUsers';
import { toast } from 'react-toastify';
import ToastNotifications from '../../components/ToastNotifications';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Pencil, MoreHorizontal } from "lucide-react";
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader';
import { DataTable } from '../../components/DataTable';
import { DynamicDropdown } from '@/components/DropDown';
import { DynamicDialog } from '../../components/Dialog';
import { CancelButton } from "@/components/Button";
import SubmitButton from '../../components/SubmitButton';

const UsersPage = () => {
    const { users, error, setError, loading, fetchUsers, updateUser } = useUsers();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', role: '' });

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error, setError]);

    useEffect(() => {
        if (userToEdit) {
            setFormData({ email: userToEdit.email, role: userToEdit.role });
        } else {
            setFormData({ email: '', role: '' });
        }
    }, [userToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateUser = async () => {
        setModalLoading(true);
        try {
            const message = await updateUser(userToEdit._id, formData);
            toast.success(message);
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(error);
        } finally {
            setModalLoading(false);
            setUserToEdit(null);
        }
    };

    const columns = [
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <div className="capitalize">{row.original.role}</div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const user = row.original;

                const dropdownItems = [
                    {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => { setIsEditModalOpen(true); setUserToEdit(user); }
                    }
                ];

                return (
                    <div className="text-right">
                        <DynamicDropdown
                            items={dropdownItems}
                            onItemClick={(item) => item.onClick()}
                            buttonText={<MoreHorizontal className="h-4 w-4" />}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <ToastNotifications />
            <div className='flex justify-between'>
                <div>
                    <BreadCrumb items={[
                        { label: 'Dashboard', href: '/' },
                        { label: 'Users', isDropdown: false }
                    ]} />
                    <h1 className="text-2xl mb-4">Manage Users</h1>
                </div>
            </div>

            {loading ? (
                <AdminTableSkeletonLoader columns={3} />
            ) : (
                <DataTable data={users} columns={columns} />
            )}

            <DynamicDialog
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                title='Edit User'
                description='Edit the user details.'
                footer={
                    <div className="flex justify-end">
                        <CancelButton
                            onClick={() => setIsEditModalOpen(false)}
                            className="text-black hover:text-gray-800 px-4 py-2 mr-2"
                        >
                            Cancel
                        </CancelButton>
                        <SubmitButton
                            loading={modalLoading}
                            text="Save"
                            onClick={handleUpdateUser}
                            className="bg-blue-500 text-black"
                        />
                    </div>
                }
            >
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="role">
                        Role
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </DynamicDialog>
        </div>
    );
};

export default UsersPage; 