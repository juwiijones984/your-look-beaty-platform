# Your Look Beauty Platform

A comprehensive beauty service platform built with React and Firebase, enabling customers to discover, book, and purchase beauty services and products while providing tools for service providers, administrators, and emergency responders.


## Features

### For Customers
- **Browse Services**: Discover beauty services from approved providers
- **Book Appointments**: Schedule and manage beauty appointments
- **Shop Products**: Purchase beauty products with integrated cart functionality
- **Profile Management**: Manage personal information, wallet balance, and loyalty points
- **Emergency Mode**: Access emergency assistance with real-time location sharing and chat

### For Service Providers
- **Provider Dashboard**: Manage services, portfolio, and business information
- **Service Management**: Create and publish beauty services with pricing and descriptions
- **Product Management**: Add and manage beauty products for sale
- **Booking Management**: Handle customer appointments and schedules

### For Administrators
- **Admin Dashboard**: Oversee platform operations
- **User Management**: Manage customers, providers, and responders
- **Content Moderation**: Approve provider applications and manage platform content

### For Emergency Responders
- **Responder Dashboard**: Handle emergency incidents
- **Real-time Communication**: Live chat and audio sessions with users in distress
- **Location Tracking**: Monitor user locations during emergencies

### Core Features
- **Multi-role Authentication**: Secure role-based access control
- **Real-time Messaging**: Firebase-powered messaging for emergencies and support
- **Payment Integration**: Secure payment processing for services and products
- **File Storage**: Firebase Storage for images and media
- **Responsive Design**: Mobile-first UI built with Radix UI and Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage, Messaging)
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Firebase project with the following services enabled:
  - Authentication
  - Firestore Database
  - Storage
  - Cloud Messaging

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/juwiijones984/your-look-beaty-platform.git
   cd your-look-beaty-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication, Firestore, Storage, and Cloud Messaging
   - Update `src/firebase.ts` with your Firebase configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Radix UI components
│   └── ...
├── contexts/           # React contexts for state management
├── layouts/            # Page layouts
├── pages/              # Page components by role
│   ├── customer/       # Customer-facing pages
│   ├── provider/       # Provider dashboard
│   ├── admin/          # Admin dashboard
│   └── responder/      # Responder dashboard
├── services/           # Firebase service integrations
├── types/              # TypeScript type definitions
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
"# your-look-beaty-platform"  
