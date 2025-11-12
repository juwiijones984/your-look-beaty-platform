import React, { useState } from 'react';
import { Search, Plus, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockProducts } from '../../data/mockData';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner@2.0.3';

interface CustomerShopProps {
  onNavigate: (page: string) => void;
}

export const CustomerShop: React.FC<CustomerShopProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="pl-10"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Beauty Products</h1>
          <p className="text-sm text-zinc-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Sparkles className="h-16 w-16 text-primary opacity-50" />
            </div>
            <CardContent className="p-4">
              <h3 className="mb-1 line-clamp-1">{product.title}</h3>
              <p className="text-sm text-zinc-600 mb-2">{product.providerName}</p>
              <p className="text-sm text-zinc-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-primary">R{product.price}</span>
                <Badge variant={product.stock > 10 ? 'secondary' : 'destructive'}>
                  {product.stock} in stock
                </Badge>
              </div>
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                size="sm"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
          <p className="text-zinc-500">No products found</p>
        </div>
      )}
    </div>
  );
};
