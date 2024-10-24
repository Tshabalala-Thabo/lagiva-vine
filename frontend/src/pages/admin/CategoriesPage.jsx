import React, { useEffect, useState } from 'react';
import useCategories from '../../hooks/useCategories';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import CreateModal from '../../components/CreateModal';
import { toast } from 'react-toastify';
import ToastNotifications from '../../components/ToastNotifications';
import { BreadCrumb } from '../../components/BreadCrumb';
import { Button } from "@/components/Button";
import { Plus, Pencil, Trash, MoreHorizontal } from "lucide-react";
import AdminTableSkeletonLoader from '../../components/AdminTableSkeletonLoader';
import { DataTable } from '../../components/DataTable';
import { DynamicDropdown } from '@/components/DropDown';

const CategoriesPage = () => {
    const { categories, error, setError, loading, addCategory, updateCategory, deleteCategory } = useCategories();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const handleAddOrUpdateCategory = async (category) => {
        let message;
        if (categoryToEdit) {
            message = await updateCategory(categoryToEdit._id, category);
        } else {
            message = await addCategory(category);
        }
        if (message) {
            toast.success(message);
        }
        setIsCreateModalOpen(false);
        setCategoryToEdit(null);
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
                        { label: 'Home', href: '/' },
                        { label: 'Categories', isDropdown: false }
                    ]} />
                    <h1 className="text-2xl mb-4">Categories</h1>
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

            <CreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleAddOrUpdateCategory}
                formFields={formFields}
                heading={categoryToEdit ? 'Edit Category' : 'Add New Category'}
                initialData={categoryToEdit}
            />
        </div>
    );
};

export default CategoriesPage;
