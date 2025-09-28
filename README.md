# Lexa - AI Autocorrect for Manual Keyboards

Lexa is a beautiful, modern React application that provides AI-powered autocorrect functionality for manual keyboards. Inspired by the aesthetic of productivity timer apps, Lexa combines elegant design with practical typing assistance.

## Features

### 🎨 Beautiful Interface
- Gradient purple/pink background with cloud-like effects
- Modern, clean design inspired by productivity apps
- Responsive layout that works on desktop and mobile
- Smooth animations and transitions

### ⌨️ Smart Autocorrect
- Real-time text correction as you type
- Common typo detection and correction
- Suggests improvements for better writing
- Perfect for manual keyboards that lack built-in autocorrect

### ⏱️ Productivity Timer
- Pomodoro-style timer with Focus, Short Break, and Long Break modes
- Progress tracking with visual indicators
- Play/pause/reset functionality
- Fullscreen mode support

### 🎯 Key Features
- **Real-time Correction**: See suggestions as you type
- **Manual Keyboard Support**: Designed specifically for keyboards without built-in autocorrect
- **Timer Integration**: Stay focused while typing with built-in productivity timer
- **Modern UI**: Beautiful gradient backgrounds and smooth interactions
- **Responsive Design**: Works perfectly on all screen sizes

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd /Users/test/Desktop/lexa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Use

1. **Start Typing**: Click on the text area and begin typing
2. **See Corrections**: Lexa will automatically suggest corrections for common typos
3. **Use the Timer**: Switch between Focus, Short Break, and Long Break modes
4. **Track Progress**: Watch the progress dots to see your productivity cycles
5. **Fullscreen**: Click the fullscreen button for distraction-free typing

## Customization

The app uses images from the `public/aesthetic/` folder. You can replace these with your own images to customize the visual appearance.

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
lexa/
├── public/
│   └── aesthetic/          # Background images
├── src/
│   ├── App.jsx            # Main application component
│   ├── App.css            # Main styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── package.json
└── README.md
```

## Contributing

Feel free to contribute to Lexa by:
- Adding more autocorrect rules
- Improving the UI/UX
- Adding new features
- Fixing bugs

## License

This project is open source and available under the MIT License.

---

**Lexa** - Bringing AI autocorrect to manual keyboards with style! ✨# LEXA - AI Autocorrect for Manual Keyboards

A beautiful, fullscreen React app that provides AI-powered autocorrect and auto-complete functionality for manual keyboards. Built for SunHacks 2025.

## Features

- **Smart Autocorrect**: Real-time autocorrection while typing
- **Auto-Complete**: Intelligent word suggestions on spacebar
- **Keyboard Navigation**: Use arrow keys to select suggestions
- **Beautiful Design**: Liquid glass effects with custom HD backgrounds
- **Fullscreen Experience**: Minimal margins, maximum impact

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anshul3782/lexaweb.git
   cd lexaweb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Production Build

To build for production:
```bash
npm run build
```

## How to Use

1. **Type normally** in the text box - autocorrect works in real-time
2. **Press spacebar** to trigger auto-complete suggestions
3. **Use arrow keys** (when not typing) to select suggestions:
   - **← Left Arrow**: First suggestion
   - **↓ Down Arrow**: Center suggestion
   - **→ Right Arrow**: Third suggestion
   - **Enter**: Center suggestion
   - **Space**: Center suggestion
4. **Click the background button** (bottom right) to change backgrounds

## Technical Details

- **Framework**: React 18 with Vite
- **Styling**: Custom CSS with glass morphism effects
- **Autocorrect**: Custom dictionary with 1000+ words
- **Backgrounds**: HD images from `/public/aesthetic/hd/`

## Repository

- **GitHub**: https://github.com/anshul3782/lexaweb.git
- **Latest Commit**: `a6b9199` - Fix autocorrect - removed duplicate keys causing errors

## Made at SunHacks 2025 🚀

Built with ❤️ for the best design award!
