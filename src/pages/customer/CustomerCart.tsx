import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner@2.0.3';

interface CustomerCartProps {
  onNavigate: (page: string) => void;
}

export const CustomerCart: React.FC<CustomerCartProps> = ({ onNavigate }) => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user, updateUser } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [processing, setProcessing] = useState(false);

  const walletAmount = useWallet ? Math.min(user?.walletBalance || 0, total) : 0;
  const remainingAmount = total - walletAmount;

  const handleCheckout = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update wallet and loyalty points
    if (user) {
      const pointsEarned = Math.floor(total);
      updateUser({
        walletBalance: (user.walletBalance || 0) - walletAmount,
        loyaltyPoints: (user.loyaltyPoints || 0) + pointsEarned,
      });
    }
    
    clearCart();
    setProcessing(false);
    setShowCheckout(false);
    toast.success('Order placed successfully!');
    onNavigate('shop');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="bg-white border-b sticky top-0">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('shop')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="mb-4 text-zinc-400">Your cart is empty</div>
          <Button onClick={() => onNavigate('shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('shop')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg">Cart ({items.length})</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* Cart Items */}
        {items.map((item) => (
          <Card key={item.product.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="h-20 w-20 rounded bg-gradient-to-br from-purple-200 to-pink-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 line-clamp-1">{item.product.title}</h3>
                  <p className="text-sm text-zinc-600 mb-2">R{item.product.price}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-2">R{item.product.price * item.quantity}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Summary */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-600">Subtotal</span>
              <span>R{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Delivery</span>
              <span>Free</span>
            </div>
            <div className="h-px bg-zinc-200" />
            <div className="flex justify-between">
              <span>Total</span>
              <span className="text-primary">R{total}</span>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <Button
          onClick={() => setShowCheckout(true)}
          size="lg"
          className="w-full"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Proceed to Checkout
        </Button>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Wallet Option */}
            {user && user.walletBalance > 0 && (
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useWallet}
                      onChange={(e) => setUseWallet(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <div className="flex-1">
                      <div className="text-sm">Use Wallet Balance</div>
                      <div className="text-xs text-primary">Available: R{user.walletBalance}</div>
                    </div>
                  </label>
                </CardContent>
              </Card>
            )}

            {/* Payment Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">Order Total</span>
                <span>R{total}</span>
              </div>
              {useWallet && walletAmount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Wallet Payment</span>
                  <span>-R{walletAmount}</span>
                </div>
              )}
              <div className="h-px bg-zinc-200" />
              <div className="flex justify-between">
                <span>Amount to Pay</span>
                <span className="text-primary">R{remainingAmount}</span>
              </div>
              <div className="flex justify-between text-xs text-green-600">
                <span>Loyalty Points to Earn</span>
                <span>+{Math.floor(total)} points</span>
              </div>
            </div>

            {/* Payment Method */}
            {remainingAmount > 0 && (
              <div>
                <div className="text-sm mb-2">Payment Method</div>
                <Input placeholder="Card Number" className="mb-2" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCheckout(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCheckout}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay R${remainingAmount}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
