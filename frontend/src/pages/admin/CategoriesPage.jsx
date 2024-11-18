import React, { useEffect, useState } from 'react';
import useCategories from '../../hooks/admin/useCategories';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';
import { toast } from 'react-toastify';
import ToastNotifications from '../../components/admin/ToastNotifications';
import { BreadCrumb } from '../../components/admin/BreadCrumb';
import { CancelButton, Button } from "@/components/admin/Button";
import { Plus, Pencil, Trash, MoreHorizontal } from "lucide-react";
import AdminTableSkeletonLoader from '../../components/admin/AdminTableSkeletonLoader';
import { DataTable } from '../../components/admin/DataTable';
import { DynamicDropdown } from '@/components/admin/DropDown';
import { DynamicDialog } from '../../components/admin/Dialog';
import SubmitButton from '../../components/admin/SubmitButton';

const CategoriesPage = () => {
    const { categories, error, setError, loading, addCategory, updateCategory, deleteCategory } = useCategories();
    const [localError, setLocalError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        if (categoryToEdit) {
            setFormData({ name: categoryToEdit.name, description: categoryToEdit.description });
        } else {
            setFormData({ name: '', description: '' });
        }
    }, [categoryToEdit]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setLocalError(error);
            setError(null);
        }
    }, [error, setError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddOrUpdateCategory = async () => {
        setModalLoading(true);
        let message;
        try {
            if (categoryToEdit) {
                message = await updateCategory(categoryToEdit._id, formData);
            } else {
                message = await addCategory(formData);
            }
            if (message) {
                toast.success(message);
            }
        } finally {
            setModalLoading(false);
            setIsCreateModalOpen(false);
            setCategoryToEdit(null);
        }
    };

    const handleDelete = async () => {
        setModalLoading(true);
        try {
            if (categoryToDelete) {
                const message = await deleteCategory(categoryToDelete);
                if (message) {
                    toast.success(message);
                }
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            setLocalError('Failed to delete category.');
        } finally {
            setModalLoading(false);
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
        }
    };

    const formFields = [
        { name: 'name', label: 'Category Name', type: 'text', placeholder: 'Enter category name', required: true },
        { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description', required: false },
    ];

    // Define columns for the DataTable
    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const category = row.original;

                const dropdownItems = [
                    {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => { setIsCreateModalOpen(true); setCategoryToEdit(category); }
                    },
                    {
                        label: "Delete",
                        icon: Trash,
                        onClick: () => { setIsDeleteModalOpen(true); setCategoryToDelete(category._id); }
                    }
                ];

                const handleItemClick = (item) => {
                    item.onClick();
                };

                return (
                    <div className="text-right">
                        <DynamicDropdown
                            items={dropdownItems}
                            onItemClick={handleItemClick}
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
                        { label: 'Daashboard', href: '/' },
                        { label: 'Categories', isDropdown: false }
                    ]} />
                    <h1 className="text-2xl mb-4 text-deep-blue">Manage Categories</h1>
                </div>
                <Button
                    text="Add Category"
                    onClick={() => { setIsCreateModalOpen(true); setCategoryToEdit(null); }}
                    className="mb-4 bg-green-500"
                    icon={<Plus className="h-4 w-4 mr-2" />}
                />
            </div>
            {loading ? (
                <AdminTableSkeletonLoader columns={3} />
            ) : (
                <DataTable data={categories} columns={columns} />
            )}

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                heading={"Confirm delete"}
                description={"Are you sure you want to delete this category?"}
                loading={modalLoading}
            />

            <DynamicDialog
                isOpen={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                title={categoryToEdit ? 'Edit Category' : 'Add New Category'}
                description={categoryToEdit ? 'Edit the details of the category.' : 'Fill in the details to create a new category.'}
                footer={
                    <div className="flex justify-end">
                        <CancelButton
                            type="button"
                            onClick={() => { setIsCreateModalOpen(false)}}
                            className="text-black hover:text-gray-800 px-4 py-2 mr-2"
                            // text={'Cancel'}
                        >
                            Cancel
                        </CancelButton>
                        <SubmitButton
                            loading={modalLoading}
                            text="Save"
                            onClick={handleAddOrUpdateCategory}
                            className="bg-blue-500 text-black"
                        />
                    </div>
                }
            >
                {/* Render form fields here */}
                {formFields.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label className="block mb-1" htmlFor={field.name}>
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="border p-2 w-full"
                        />
                    </div>
                ))}
            </DynamicDialog>
        </div>
    );
};

export default CategoriesPage;
