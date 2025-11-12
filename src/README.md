# Your Look - Beauty & Safety Platform

A comprehensive beauty and safety platform by Mashikara Aesthetics, connecting customers, service providers, admins, and emergency response teams.

## 🎯 Features

### For Customers
- Browse and book beauty services (braiding, manicure, makeup, skincare, etc.)
- Shop beauty products with cart and checkout
- Earn loyalty points (1 point per R1 spent)
- Convert points to wallet credit (1,000 points = R50)
- View upcoming and past appointments
- **Hidden Emergency Mode**: Long-press the logo to discreetly activate emergency assistance

### For Service Providers
- Manage service offerings (create, edit, publish/unpublish)
- Track bookings and revenue
- Manage product inventory
- View customer orders and messages
- Dashboard with analytics

### For Admins
- Monitor platform KPIs and analytics
- Manage users (approve/suspend accounts)
- Track all bookings and revenue
- Send broadcast messages to users
- Emergency incident oversight

### For Emergency Responders
- Receive high-priority GBV alerts
- Access live GPS location of victims
- Communicate via hidden chat and voice
- Update incident status (acknowledged → in-progress → resolved)
- Map view of all active incidents

## 🔐 Emergency Feature

The platform includes a **discreet emergency response system**:

1. **Activation**: Long-press the "Your Look" logo for 2 seconds
2. **Discreet UI**: Minimal visual indicators to avoid alerting potential abusers
3. **Features**:
   - Live GPS location sharing
   - Hidden voice call capability
   - Secure text messaging
   - Pulsing indicator (small red dot)
4. **Response**: Emergency team receives high-priority alerts with:
   - Screen flashes red
   - Strong vibration pattern
   - Incident details and location

## 🚀 Getting Started

### Demo Access

The app includes 4 demo roles. Click any tab and "Sign In" to access:

1. **Customer**: Browse services, book appointments, shop products
2. **Provider**: Manage services, view bookings, track revenue
3. **Admin**: Platform oversight, user management, analytics
4. **Responder**: Emergency incident management

### Key Flows to Test

1. **Customer Journey**:
   - Browse services → Book appointment
   - Shop products → Add to cart → Checkout
   - View loyalty points → Convert to wallet credit
   - Long-press logo → Activate emergency mode

2. **Provider Flow**:
   - Add new service with pricing
   - Publish/unpublish services
   - View bookings and revenue

3. **Emergency Response**:
   - Switch to Responder account
   - View active incidents on dashboard
   - Acknowledge and manage incidents
   - Access live location and chat

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **State Management**: React Context API
- **Future Backend**: Firebase (Auth, Firestore, Functions, FCM)

## 📱 Responsive Design

The app is fully responsive and works on:
- Mobile devices (primary target)
- Tablets
- Desktop browsers

## 🔒 Security & Privacy

- Role-based access control
- Emergency data isolation
- Discreet emergency activation
- Mock data for demo (no PII collected)

## 🎨 Design Principles

- **Easy to learn**: Consistent navigation, intuitive UI
- **Effective**: One-tap actions, clear feedback
- **Enjoyable**: Clean interface, smooth animations
- **Accessible**: Clear labels, large tap zones

## 📊 Mock Data

The app currently uses mock data for demonstration:
- 6 beauty services across 9 categories
- 4 beauty products
- Sample bookings and appointments
- Emergency incident examples

## 🔄 Future Integration

Ready for Firebase backend integration:
- Authentication (email, phone, social)
- Firestore database with security rules
- Cloud Functions for business logic
- Firebase Cloud Messaging for notifications
- WebRTC for voice communication
- Stripe/PayFast for payments

## 👥 User Roles

1. **Customer**: Book services, shop products, earn rewards
2. **Provider**: Offer services, manage bookings
3. **Admin**: Platform management and oversight
4. **Responder**: Emergency response team

## 💡 Special Features

- **Loyalty System**: Earn 1 point per R1 spent
- **Wallet**: Use converted points for purchases
- **Emergency Response**: GBV victim support
- **Broadcast Messages**: Admin can notify user groups
- **Multi-language Support**: (Future: EN, Zulu, Afrikaans, Xhosa)

---

**Built with ❤️ by Mashikara Aesthetics**
