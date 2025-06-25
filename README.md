# Pseuducku 🦆

A Sudoku-style puzzle game with duck images instead of numbers. Match the ducks to solve the puzzle!

## 🎮 About

Pseuducku is a unique twist on the classic Sudoku puzzle game. Instead of numbers, you'll be matching colorful duck images to solve the grid. The game features:

- **4x4 and 9x9 game boards** with proper Sudoku rules
- **Duck-to-pre-placed-piece matching system** (1-Una ↔ SD1, etc.)
- **Real-time hint and ruler systems** with visual feedback
- **Eraser mode, undo functionality, and navigation**
- **Info and help systems** with dynamic terminology
- **Clean UI** with proper validation and constraints

## 🚀 Live Demo

[Play Pseuducku Online](https://pseuducku.vercel.app) *(Coming soon)*

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with custom game board layouts
- **Build Tool**: Vite for fast development and optimized production builds
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/InterNutter/Pseuducku.git
cd Pseuducku

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 How to Play

1. **Select a game board size** (4x4 or 9x9)
2. **Choose your duck piece** from the selector
3. **Place ducks on the board** following Sudoku rules:
   - Each duck can only appear once per row
   - Each duck can only appear once per column
   - Each duck can only appear once per 2x2 (4x4) or 3x3 (9x9) box
4. **Use hints and ruler** to help solve the puzzle
5. **Complete the board** to win!

## 🎨 Game Features

- **Multiple Game Modes**: 4x4 and 9x9 puzzles
- **Hint System**: Get help when you're stuck
- **Ruler Tool**: Visual guides for placement
- **Undo Function**: Step back through your moves
- **Eraser Mode**: Remove misplaced pieces
- **Navigation**: Switch between different puzzle layouts

## 🚀 Deployment

This project is optimized for Vercel deployment:

1. **Fork or clone** this repository
2. **Connect to Vercel** using your GitHub account
3. **Import the project** - Vercel will auto-detect the Vite configuration
4. **Deploy** - Your game will be live in minutes!

### Manual Deployment

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## 📁 Project Structure

```
Pseuducku/
├── src/
│   ├── components/          # React components
│   │   ├── GameBoard.jsx    # Main game board
│   │   ├── PieceSelector.jsx # Duck piece selector
│   │   ├── ControlButtons.jsx # Game controls
│   │   └── ...              # Other UI components
│   ├── utils/               # Game logic and utilities
│   │   ├── puzzleGenerator.js # Puzzle generation
│   │   ├── boardLayouts.js  # Board layout configurations
│   │   └── ...              # Other utilities
│   ├── assets/              # Game images and assets
│   └── index.css            # Main styles
├── public/                  # Static assets
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies and scripts
```

## 🎯 Game Rules

### 4x4 Board
- Use ducks 1-4 (Una, Dux, Trey, Quacko)
- Each duck appears exactly once per row, column, and 2x2 box
- Match ducks to pre-placed pieces (SD1, SD2, SD3, SD4)

### 9x9 Board
- Use ducks 1-9 (Una through Tisa)
- Each duck appears exactly once per row, column, and 3x3 box
- Match ducks to pre-placed pieces (SD1 through SD9)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the CC0-1.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic Sudoku puzzles
- Built with modern React and Vite
- Deployed on Vercel for optimal performance

---

**Happy puzzling! 🦆✨**
