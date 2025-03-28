import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogSubmitButton, DialogCancelButton } from './Button';

export function ConfirmDeleteDialog({ isOpen, onCancel, onConfirm, heading, text }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="rounded-[1px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{heading}</AlertDialogTitle>
          <AlertDialogDescription>
            {text}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <DialogCancelButton 
            onClick={onCancel} 
            text="Cancel"
            className="rounded-[1px]"
          />
          <DialogSubmitButton
            onClick={handleConfirm}
            loading={isLoading}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
