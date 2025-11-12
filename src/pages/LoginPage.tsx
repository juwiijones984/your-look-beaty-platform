import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (role: UserRole) => {
    setLoading(true);
    try {
      await login(email || `${role}@yourlook.co.za`, password || 'password123', role);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-zinc-600 mt-2">
            Beauty & Safety Platform by Mashikara Aesthetics
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="provider">Provider</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="responder">Responder</TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="customer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleLogin('customer')}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Signing in...' : 'Sign In as Customer'}
                </Button>
                <p className="text-xs text-zinc-500 text-center">
                  Demo: Leave fields empty and click Sign In
                </p>
              </TabsContent>

              <TabsContent value="provider" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-email">Email</Label>
                  <Input
                    id="provider-email"
                    type="email"
                    placeholder="provider@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider-password">Password</Label>
                  <Input
                    id="provider-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleLogin('provider')}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Signing in...' : 'Sign In as Provider'}
                </Button>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleLogin('admin')}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Signing in...' : 'Sign In as Admin'}
                </Button>
              </TabsContent>

              <TabsContent value="responder" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="responder-email">Email</Label>
                  <Input
                    id="responder-email"
                    type="email"
                    placeholder="responder@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responder-password">Password</Label>
                  <Input
                    id="responder-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleLogin('responder')}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {loading ? 'Signing in...' : 'Sign In as Responder'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{' '}
          <button className="text-primary hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};
