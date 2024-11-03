import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts'; // Import the custom hook

export default function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const { fetchProductById } = useProducts(); // Destructure fetchProductById from the hook
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(id); // Use the hook to fetch product details
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, fetchProductById]);

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
            <Button className="w-full sm:w-auto" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
} 