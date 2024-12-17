import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePublishedProducts from '../hooks/usePublishedProducts'; // Import the custom hook
import { useCart } from "@/components/CartProvider";
import Toast from "@/components/Toast";
import { SubmitButton } from "@/components/Button";
export default function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const { fetchPublishedProductById } = usePublishedProducts(); // Use the new hook to fetch published product
  const { addItemToCart } = useCart(); // Destructure addItemToCart from the useCart hook
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false); // New state for button loading

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchPublishedProductById(id); // Use the new hook to fetch product details
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Only depend on 'id'
  
  const handleAddToCart = async () => {
    try {
      if (product) {
        setAddingToCart(true); // Start loading
        await addItemToCart(product._id, 1);
        Toast.success('Success', 'Product added to your cart.');
      }
    } catch (error) {
      Toast.danger('Error', 'Failed to add product to cart.');
    } finally {
      setAddingToCart(false); // Stop loading regardless of outcome
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {product ? (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="bg-stale overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, index) => (
                <Badge key={index} variant="secondary">{category}</Badge>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">R{product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
            <SubmitButton 
              text="Add to Cart"
              icon={<ShoppingCart className="h-5 w-5" />}
              width="w-[300px] sm:w-auto"
              height="h-12"
              onClick={handleAddToCart}
              loading={addingToCart}
            />
          </div>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
} 