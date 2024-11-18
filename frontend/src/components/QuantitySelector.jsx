import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectLabel, SelectGroup, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QuantitySelector = ({ itemId, initialQuantity, productName, productPrice, updateQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [dropDownOpened, setDropDownOpened] = useState(false);
    const [customQuantity, setCustomQuantity] = useState('');

    useEffect(() => {
        setQuantity(initialQuantity);
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
            setCustomQuantity('');
        }
    };

    const getSelectValue = () => {
        if (quantity <= 9) {
            return quantity.toString();
        }
        return '10+';
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
                            className="w-20"
                            min="1"
                        />
                        <Button onClick={handleCustomQuantityUpdate} size="sm">
                            Update
                        </Button>
                    </>
                ) : (
                    <Select onValueChange={handleQuantityChange} onOpenChange={(open) => {
                        if (open) {
                            console.log('Dropdown opened');
                            setDropDownOpened(true);
                        } else {
                            console.log('Dropdown closed');
                            setDropDownOpened(false);
                        }
                    }} value={getSelectValue()}>
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
            </div>
        </div>
    );
};

export default QuantitySelector;