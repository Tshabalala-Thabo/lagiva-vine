import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ButtonPrimary } from './Button';
import { MoonLoader } from 'react-spinners';

const QuantitySelector = ({ itemId, initialQuantity, productName, productPrice, updateQuantity, updatingItems }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customQuantity, setCustomQuantity] = useState('');

    useEffect(() => {
        setQuantity(initialQuantity);
        setShowCustomInput(false); // Reset custom input visibility when initialQuantity changes
    }, [initialQuantity]);

    const handleQuantityChange = (value) => {
        if (value === '10+') {
            setShowCustomInput(true);
            setCustomQuantity('');
        } else {
            const newQuantity = parseInt(value, 10);
            if (!isNaN(newQuantity)) {
                setQuantity(newQuantity);
                updateQuantity(itemId, newQuantity);
            }
        }
    };

    const handleCustomQuantityUpdate = () => {
        const newQuantity = parseInt(customQuantity, 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
            updateQuantity(itemId, newQuantity);
            setShowCustomInput(false);
        }
    };

    return (
        <div className="flex-grow">
            <h2 className="font-semibold">{productName}</h2>
            <p className="text-gray-500">R{(productPrice * (quantity || 0)).toFixed(2)}</p>
            <div className="flex items-center space-x-2 mt-2">
                {showCustomInput ? (
                    <>
                        <Input
                            type="number"
                            value={customQuantity}
                            onChange={(e) => setCustomQuantity(e.target.value)}
                            className="w-20 rounded-[1px]"
                            min="1"
                            disabled={updatingItems[itemId]}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleCustomQuantityUpdate();
                                }
                            }}
                        />
                        <ButtonPrimary 
                            onClick={handleCustomQuantityUpdate} 
                            text="Update" 
                            size="sm" 
                            disabled={updatingItems[itemId]} 
                        />
                    </>
                ) : (
                    <Select 
                        className="bg-black"
                        isWeb={true}
                        onValueChange={handleQuantityChange}
                        value={quantity.toString()}
                        disabled={updatingItems[itemId]}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="select">{quantity}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                        {num}
                                    </SelectItem>
                                ))}
                                <SelectItem value="10+">10+</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
                {updatingItems[itemId] && (
                    <div className="flex items-center justify-center" style={{ width: '24px', height: '24px' }}>
                        <MoonLoader size={20} color={"#b40100"} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuantitySelector;