<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# The Grammar of the Hivemind - Reddit Network Analysis

A data journalism project analyzing the Reddit Hyperlink Network through linguistic clustering and network analysis. This React/TypeScript application visualizes how language style determines community interactions on Reddit.

View the original app in AI Studio: https://ai.studio/apps/drive/1Cs4_8RSp0BwWyUyqGCSVNiBE5A1DqUcN

## 🚀 Quick Start

### Development Mode (Vite)
**Prerequisites:** Node.js 16+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000

### Jekyll Deployment Mode
**Prerequisites:** Node.js 16+, Ruby 2.5+, Bundler

1. Install all dependencies:
   ```bash
   npm install
   bundle install
   ```
2. Build and serve with Jekyll:
   ```bash
   npm run dev:jekyll
   ```
3. Visit http://localhost:4000

## 📊 Features

### Interactive Visualizations
- **Time Series Analysis** - Reddit activity patterns over 24 days
- **Top Subreddits** - Bar chart of most active communities
- **Sentiment Analysis** - Pie charts showing positive/negative/neutral distribution
- **Linguistic Clustering** - PCA scatter plot with 3 distinct language styles
- **Feature Radar** - Comparing readability, complexity, and emotional markers
- **Interaction Matrix** - Heatmap of cross-community communication

### Technology Stack
- **React 19** with TypeScript
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **Jekyll** for static site generation

## 🌐 Deployment

This project is configured for multiple deployment options:

### 1. GitHub Pages (Recommended)
- Push to GitHub
- Enable GitHub Pages with "GitHub Actions" source
- Auto-deploys on every push via included workflow
- **See:** [QUICKSTART.md](QUICKSTART.md)

### 2. Netlify
- Connect repository
- Build: `npm run deploy`
- Publish: `_site`
- **See:** [DEPLOYMENT.md](DEPLOYMENT.md)

### 3. Vercel
- Run `vercel` in project directory
- Follow prompts

## 📂 Project Structure

```
.
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Jekyll layout wrapper
├── .github/workflows/       # GitHub Actions auto-deployment
├── index.md                 # Jekyll entry point
├── index.tsx                # React application source
├── dist/                    # Vite build output (generated)
├── _site/                   # Jekyll build output (generated)
├── package.json             # Node dependencies
├── Gemfile                  # Ruby dependencies
└── vite.config.ts           # Vite configuration
```

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Fast setup and deployment guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment instructions
- **[CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md)** - Technical details of Jekyll conversion

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Vite dev server (fast, hot reload)
npm run build            # Build React app to dist/
npm run preview          # Preview Vite build

# Jekyll
npm run dev:jekyll       # Build + serve with Jekyll
npm run jekyll:serve     # Serve existing build
npm run jekyll:build     # Jekyll build only
npm run deploy           # Full production build
```

## 🎨 Data & Analysis

### Key Findings
1. **The Meta-Layer** - A few communities curate content for everyone
2. **Positivity Dominates** - 90% of connections are constructive
3. **Language Creates Walls** - Toxic dialects isolate communities

### Data Source
Reddit Hyperlink Network with 850,000+ connections across subreddits

### Methodology
- 86 linguistic features engineered
- K-Means clustering for style classification
- PCA for dimensionality reduction
- Sentiment analysis on titles and body text

## 🔧 Troubleshooting

### "vite not recognized"
```bash
npm install
```

### "bundle: command not found"
```bash
gem install bundler
bundle install
```

### Assets not loading in Jekyll
```bash
npm run build      # Build React app first
npm run dev:jekyll # Then serve with Jekyll
```

## 📄 License

This project contains an AI Studio generated application.

## 🙏 Credits

**Team:** ApesStrongTogether  
**Data:** Reddit Hyperlink Network  
**Publication Date:** March 2024
