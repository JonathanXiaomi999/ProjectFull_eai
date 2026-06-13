# Jawara Kuliner App

A Vue 3 web application for exploring and sharing culinary information. This project is built with modern web technologies to provide a seamless user experience.

## 📱 About

**Jawara Kuliner App** is a project designed to showcase culinary content with an interactive and user-friendly interface. Whether you're looking to discover new recipes or share culinary experiences, this app has you covered.

## 🛠️ Tech Stack

- **Frontend Framework**: [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- **State Management**: [Pinia](https://pinia.vuejs.org/) - Intuitive state management for Vue
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Styling**: CSS
- **Deployment**: GitHub Pages

**Language Composition**:
- Vue: 75%
- CSS: 13.9%
- JavaScript: 10.1%
- HTML: 1%

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JonathanXiaomi999/ProjectFull_eai.git
   cd ProjectFull_eai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

To run the development server with hot module replacement:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173` (check the terminal output for the exact URL).

### Build

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory.

### Preview

To preview the production build locally:

```bash
npm run preview
```

## 🚢 Deployment

### Deploy to GitHub Pages

This project is configured to deploy to GitHub Pages. To deploy:

```bash
npm run deploy
```

This command will:
1. Build the production version (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch

## 📦 Project Structure

```
ProjectFull_eai/
├── src/                    # Source files
│   ├── components/         # Vue components
│   ├── views/             # Page components
│   ├── stores/            # Pinia stores for state management
│   ├── App.vue            # Root component
│   └── main.js            # Application entry point
├── public/                # Static assets
├── dist/                  # Production build (generated)
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md             # This file
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |

## 🎨 Features

- Responsive and modern UI
- State management with Pinia
- Fast development experience with Vite
- GitHub Pages deployment ready
- Optimized production builds

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE) (if you add one).

## 💡 Tips for Users

- **First time setup**: Run `npm install` to get all dependencies
- **Development**: Use `npm run dev` for a smooth development experience with hot reloading
- **Testing changes**: Use `npm run preview` before deploying
- **Deploying**: Make sure everything works locally before running `npm run deploy`

## 🐛 Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Node modules issues
If you encounter issues, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
Make sure you're using a compatible Node.js version:
```bash
node --version  # Should be v16 or higher
```

## 📞 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/JonathanXiaomi999/ProjectFull_eai/issues) on the GitHub repository.

---

**Happy coding! 🚀** Feel free to explore, modify, and deploy this project. Enjoy using Jawara Kuliner App!