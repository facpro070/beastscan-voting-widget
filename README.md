# BeastScan Voting Widget

A modern, interactive voting widget built with Next.js and TypeScript that allows users to vote on ideas and reorder them through drag-and-drop functionality.

## 🛠️ Tools & Technologies

### Core Technologies
- **Next.js 14** - React framework with App Router
- **TypeScript** - For type safety and better developer experience
- **Tailwind CSS** - For styling and responsive design
- **shadcn/ui** - For pre-built, accessible UI components

### State Management & Data Persistence
- **Zustand** - Lightweight state management
- **localStorage** - For persisting card data and order

### Drag & Drop
- **@dnd-kit** - Modern drag-and-drop library
  - `@dnd-kit/core` - Core drag-and-drop functionality
  - `@dnd-kit/sortable` - For sortable lists
  - `@dnd-kit/utilities` - Helper utilities

### UI/UX Enhancements
- **Framer Motion** - For smooth animations and transitions
- **Lucide Icons** - For consistent iconography
- **UUID** - For generating unique IDs for cards

## 🎯 Design Decisions & Assumptions

### Architecture
1. **Component Structure**
   - Modular design with separate components for cards and modals
   - Reusable UI components from shadcn/ui
   - Type-safe props and state management

2. **State Management**
   - Chose Zustand for its simplicity and performance
   - Centralized store for card data and operations
   - Automatic persistence to localStorage

3. **Drag & Drop Implementation**
   - Used @dnd-kit for its accessibility and performance
   - Implemented drag handle for better UX
   - Visual feedback during dragging operations

### UI/UX Decisions
1. **Card Design**
   - Clean, modern card layout with hover effects
   - Clear visual hierarchy
   - Responsive grid layout
   - Smooth animations for interactions

2. **Voting System**
   - Simple upvote/downvote mechanism
   - Visual feedback for vote actions
   - Persistent vote counts

3. **Responsive Design**
   - Mobile-first approach
   - Responsive grid layout
   - Adaptive spacing and typography

### Performance Considerations
1. **Image Optimization**
   - Using Next.js Image component for automatic optimization
   - Lazy loading for better performance
   - Fallback for invalid images

2. **State Updates**
   - Efficient state updates with immutable patterns
   - Debounced localStorage updates
   - Optimized re-renders

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Future Improvements

1. **Features**
   - Add user authentication
   - Implement real-time updates
   - Add sorting options
   - Add search/filter functionality

2. **Technical**
   - Add unit tests
   - Implement error boundaries
   - Add loading states
   - Improve accessibility

3. **UI/UX**
   - Add dark mode
   - Improve mobile experience
   - Add more animations
   - Enhance drag-and-drop feedback
