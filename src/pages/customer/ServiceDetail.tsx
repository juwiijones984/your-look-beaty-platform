import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Calendar, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Calendar as CalendarComponent } from '../../components/ui/calendar';
import { Service } from '../../types';
import { toast } from 'sonner@2.0.3';

interface ServiceDetailProps {
  service: Service;
  onNavigate: (page: string) => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onNavigate }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    toast.success('Booking confirmed! Check your appointments.');
    setShowBooking(false);
    onNavigate('appointments');
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('browse')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Service Image */}
        <div className="h-64 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
          <Sparkles className="h-24 w-24 text-primary opacity-50" />
        </div>

        {/* Service Info */}
        <div>
          <Badge className="mb-2">{service.category}</Badge>
          <h1 className="text-2xl mb-2">{service.title}</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-600 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{service.providerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8 (124 reviews)</span>
            </div>
          </div>
          <p className="text-zinc-700">{service.description}</p>
        </div>

        {/* Pricing & Duration */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-600 mb-1">Price</div>
                <div className="text-2xl text-primary">R{service.price}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-zinc-600 mb-1">Duration</div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-zinc-600" />
                  <span className="text-lg">{service.duration} min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Book Button */}
        <Button
          onClick={() => setShowBooking(true)}
          size="lg"
          className="w-full"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Book Appointment
        </Button>

        {/* Provider Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3">About the Provider</h3>
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-primary">BT</span>
              </div>
              <div>
                <div className="mb-1">{service.providerName}</div>
                <p className="text-sm text-zinc-600">
                  Professional beauty services with 5+ years experience. Specialized in {service.category.toLowerCase()}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <div className="text-sm mb-2">Select Date</div>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
            
            <div>
              <div className="text-sm mb-2">Select Time</div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Service</span>
                <span>{service.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Duration</span>
                <span>{service.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Total</span>
                <span className="text-primary">R{service.price}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowBooking(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
