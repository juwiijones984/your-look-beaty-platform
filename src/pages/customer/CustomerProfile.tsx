import React, { useState } from 'react';
import { Wallet, Sparkles, Settings, LogOut, Shield, Award, ArrowRight, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Progress } from '../../components/ui/progress';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface CustomerProfileProps {
  onNavigate: (page: string) => void;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({ onNavigate }) => {
  const { user, logout, updateUser } = useAuth();
  const [showConvert, setShowConvert] = useState(false);

  const pointsToNextReward = 1000;
  const currentPoints = user?.loyaltyPoints || 0;
  const progressPercent = (currentPoints % pointsToNextReward) / pointsToNextReward * 100;
  const canConvert = currentPoints >= 1000;

  const handleConvertPoints = () => {
    if (!user || !canConvert) return;
    
    const pointsToConvert = Math.floor(currentPoints / 1000) * 1000;
    const cashAmount = pointsToConvert / 20; // 1000 points = R50
    
    updateUser({
      loyaltyPoints: currentPoints - pointsToConvert,
      walletBalance: (user.walletBalance || 0) + cashAmount,
    });
    
    toast.success(`Converted ${pointsToConvert} points to R${cashAmount}`);
    setShowConvert(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xl text-primary">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">{user?.name}</h2>
              <p className="text-sm text-zinc-600">{user?.email}</p>
              <p className="text-sm text-zinc-600">{user?.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl text-primary">
            R{user?.walletBalance.toFixed(2)}
          </div>
          <p className="text-sm text-zinc-600">
            Use your wallet balance to pay for services and products
          </p>
          <Button variant="outline" size="sm">
            Add Funds
          </Button>
        </CardContent>
      </Card>

      {/* Loyalty Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Loyalty Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl text-primary">{currentPoints}</div>
            <div className="text-sm text-zinc-600">points</div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-zinc-600 mb-2">
              <span>Next reward</span>
              <span>{pointsToNextReward - (currentPoints % pointsToNextReward)} points to go</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-4 w-4 text-primary" />
              <span className="text-sm">Conversion Rate</span>
            </div>
            <p className="text-sm text-zinc-600">
              1,000 points = R50 wallet credit
            </p>
          </div>

          {canConvert && (
            <Button
              onClick={() => setShowConvert(true)}
              className="w-full"
            >
              Convert Points to Cash
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Safety */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm text-red-900 mb-1">Emergency Assistance</h4>
              <p className="text-xs text-red-700 mb-3">
                Long-press the Your Look logo at any time to discreetly connect with our emergency response team.
              </p>
              <Button variant="outline" size="sm" className="text-red-700 border-red-300">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-between"
          onClick={() => toast.info('Coming soon')}
        >
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-400" />
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between"
          onClick={() => toast.info('Coming soon')}
        >
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5" />
            <span>Achievements</span>
          </div>
          <ArrowRight className="h-4 w-4 text-zinc-400" />
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </div>
        </Button>
      </div>

      {/* Convert Points Dialog */}
      <Dialog open={showConvert} onOpenChange={setShowConvert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert Loyalty Points</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Current Points</span>
                <span>{currentPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Points to Convert</span>
                <span>{Math.floor(currentPoints / 1000) * 1000}</span>
              </div>
              <div className="h-px bg-purple-200" />
              <div className="flex justify-between">
                <span className="text-zinc-600">Cash Amount</span>
                <span className="text-primary">
                  R{(Math.floor(currentPoints / 1000) * 1000 / 20).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Remaining Points</span>
                <span>{currentPoints % 1000}</span>
              </div>
            </div>

            <p className="text-sm text-zinc-600">
              Points will be converted to your wallet balance and can be used for any purchase.
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConvert(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleConvertPoints}
              >
                Confirm Conversion
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
