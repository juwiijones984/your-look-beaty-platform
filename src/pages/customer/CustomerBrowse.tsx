import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockServices, CATEGORIES } from '../../data/mockData';

interface CustomerBrowseProps {
  onNavigate: (page: string, data?: any) => void;
}

export const CustomerBrowse: React.FC<CustomerBrowseProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory && service.published;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services..."
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-zinc-600" />
          <span className="text-sm">Categories</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-zinc-600">
        {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate('service-detail', service)}
          >
            <div className="h-48 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Sparkles className="h-16 w-16 text-primary opacity-50" />
            </div>
            <CardContent className="p-4">
              <Badge className="mb-2">{service.category}</Badge>
              <h3 className="mb-1">{service.title}</h3>
              <p className="text-sm text-zinc-600 mb-2">{service.providerName}</p>
              <p className="text-sm text-zinc-600 mb-3 line-clamp-2">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-primary">R{service.price}</div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Clock className="h-3 w-3" />
                    <span>{service.duration}min</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
          <p className="text-zinc-500">No services found</p>
        </div>
      )}
    </div>
  );
};
