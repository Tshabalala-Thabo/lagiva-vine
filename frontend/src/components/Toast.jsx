import React from 'react';
import { Toaster, toast } from 'sonner';
import { Check, AlertTriangle, X } from 'lucide-react';

// Toast component
const Toast = {
    success: (heading, subheading) => {
        toast(
            <div className='flex items-center'>
                <div className='bg-green-500 rounded-full p-1 mr-3'><Check className="h-5 w-5 text-black" /></div>
                <div>
                    <h3 className="text-lg font-bold">{heading}</h3>
                    <p className="text-sm text-gray-600">{subheading}</p>
                </div>
            </div>,
        );
    },
    warning: (heading, subheading) => {
        toast(
            <div className="flex items-center">
                <div className="bg-yellow-500 rounded-full p-1 mr-3">
                    <AlertTriangle className="h-5 w-5 text-black" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">{heading}</h3>
                    <p className="text-sm text-gray-600">{subheading}</p>
                </div>
            </div>,
        );
    },
    danger: (heading, subheading) => {
        toast(
            <div className="flex items-center">
                <div className="bg-red-500 rounded-full p-1 mr-3">
                    <X className="h-5 w-5 text-black" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">{heading}</h3>
                    <p className="text-sm text-gray-600">{subheading}</p>
                </div>
            </div>,
        );
    },
};

export default Toast;
