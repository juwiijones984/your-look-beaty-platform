import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockBookings } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface CustomerAppointmentsProps {
  onNavigate: (page: string) => void;
}

export const CustomerAppointments: React.FC<CustomerAppointmentsProps> = ({ onNavigate }) => {
  const [bookings] = useState(mockBookings);

  const upcomingBookings = bookings.filter(b =>
    b.status === 'pending' || b.status === 'confirmed'
  );
  
  const pastBookings = bookings.filter(b =>
    b.status === 'completed' || b.status === 'cancelled'
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleCancelBooking = (bookingId: string) => {
    toast.success('Booking cancelled successfully');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: 'secondary', label: 'Pending' },
      confirmed: { variant: 'default', label: 'Confirmed' },
      completed: { variant: 'outline', label: 'Completed' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const BookingCard = ({ booking, isPast = false }: { booking: typeof bookings[0]; isPast?: boolean }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-8 w-8 text-primary opacity-50" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="mb-1">{booking.serviceName}</h3>
                <p className="text-sm text-zinc-600">{booking.providerName}</p>
              </div>
              {getStatusBadge(booking.status)}
            </div>
            
            <div className="space-y-1 text-sm text-zinc-600 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(booking.startAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatTime(booking.startAt)} - {formatTime(booking.endAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">R{booking.price}</span>
                {booking.paymentStatus === 'paid' && (
                  <span className="text-xs text-green-600">Paid</span>
                )}
              </div>
            </div>

            {!isPast && booking.status === 'confirmed' && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  Directions
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-3 w-3 mr-1" />
                  Contact
                </Button>
              </div>
            )}

            {!isPast && booking.status === 'pending' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCancelBooking(booking.id)}
                className="w-full text-red-600 hover:text-red-700"
              >
                Cancel Booking
              </Button>
            )}

            {isPast && booking.status === 'completed' && (
              <Button size="sm" variant="outline" className="w-full">
                Book Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl mb-6">My Appointments</h1>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500 mb-4">No upcoming appointments</p>
              <Button onClick={() => onNavigate('browse')}>
                Browse Services
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length > 0 ? (
            pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} isPast />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500">No past appointments</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
