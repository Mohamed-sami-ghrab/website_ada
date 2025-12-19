# Quick Start Guide - Jekyll Deployment

## 🚀 Setup (First Time Only)

### Step 1: Install Node Dependencies
```bash
npm install
```

### Step 2: Install Ruby & Jekyll
Windows users can download Ruby from: https://rubyinstaller.org/downloads/

After installing Ruby, run:
```bash
gem install bundler
bundle install
```

### Step 3: Build & Run
```bash
npm run dev:jekyll
```

Visit **http://localhost:4000** to see your site! 🎉

## 📁 What Changed?

Your React app now works with Jekyll:

1. ✅ **_config.yml** - Jekyll configuration
2. ✅ **Gemfile** - Ruby dependencies for Jekyll
3. ✅ **_layouts/default.html** - Jekyll layout that loads your React app
4. ✅ **index.md** - Entry point for Jekyll (replaces index.html)
5. ✅ **vite.config.ts** - Updated for proper asset paths with `base: './'`
6. ✅ **.gitignore** - Updated to exclude Jekyll build files
7. ✅ **package.json** - Added Jekyll-related scripts

## 📊 Your Visualizations - All Preserved!

All your existing visualizations work exactly the same:
- ✅ **Line charts** - Reddit activity over time
- ✅ **Bar charts** - Top subreddits by activity
- ✅ **Pie charts** - Sentiment distribution
- ✅ **Scatter plots** - Linguistic clustering (PCA visualization)
- ✅ **Radar charts** - Cluster feature comparison
- ✅ **Custom matrix** - Interaction heatmap
- ✅ **Styling** - All Tailwind CSS, fonts, and animations
- ✅ **Navigation** - Sticky nav, smooth scrolling
- ✅ **Responsive** - Mobile-friendly design

Nothing was removed or changed in functionality - just wrapped for Jekyll!

## 🛠️ Available Commands

```bash
# Development Commands
npm run dev              # Vite dev server (fastest, for development)
npm run build            # Build React app to dist/ folder
npm run preview          # Preview Vite build

# Jekyll Commands
npm run dev:jekyll       # Build React + serve with Jekyll
npm run jekyll:serve     # Serve existing build with Jekyll
npm run jekyll:build     # Jekyll build only (creates _site/)
npm run deploy           # Full production build
```

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended - Free!)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial Jekyll setup"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Source: **GitHub Actions** (recommended)
   - The included workflow file (`.github/workflows/jekyll-deploy.yml`) will automatically build and deploy your site!

   **OR** if you prefer manual deployment:
   - Source: Deploy from branch → `main` branch, `/ (root)`
   - You'll need to run `npm run deploy` locally and commit the `_site` folder

3. **Update _config.yml** (if using project page):
   ```yaml
   baseurl: "/your-repo-name"  # Only if NOT using username.github.io
   url: "https://yourusername.github.io"
   ```

4. **Your site will be live at**:
   - User/Org page: `https://yourusername.github.io`
   - Project page: `https://yourusername.github.io/your-repo-name`

**✨ GitHub Actions**: The workflow automatically runs on every push to build and deploy your site!

### Option 2: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) and connect your repo
3. Build settings:
   - **Build command**: `npm run deploy`
   - **Publish directory**: `_site`
4. Click **Deploy** - done!

### Option 3: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

## 💡 Development Tips

### Fast Development (No Jekyll)
```bash
npm run dev
```
This starts Vite's dev server at http://localhost:3000 with hot reload. Use this for rapid React development!

### Test Full Jekyll Setup
```bash
npm run dev:jekyll
```
This builds the React app and serves it through Jekyll at http://localhost:4000. Use this before deploying!

### Build for Production
```bash
npm run deploy
```
Creates optimized production build in `_site/` directory.

## 🔧 Troubleshooting

### "vite not recognized"
Run `npm install` first!

### "bundle: command not found"
Install Ruby and Bundler:
```bash
gem install bundler
```

### Assets not loading in Jekyll
1. Make sure you ran `npm run build` first
2. Check that `dist/` folder exists
3. Try running `npm run dev:jekyll` which does both steps

### Jekyll serve fails
```bash
bundle install
bundle exec jekyll serve
```

### React app not rendering
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify `dist/assets/` contains .js files
4. Make sure you ran `npm run build`

## 📂 File Structure

```
your-project/
├── _config.yml          # Jekyll configuration
├── _layouts/
│   └── default.html     # HTML wrapper for React app
├── _site/               # Jekyll output (auto-generated)
├── dist/                # Vite build output (auto-generated)
│   └── assets/
│       ├── index-[hash].js
│       └── index-[hash].css
├── index.md             # Jekyll entry point
├── index.tsx            # React app source
├── index.html           # Original Vite template (not used by Jekyll)
├── package.json         # Node dependencies
├── Gemfile              # Ruby dependencies
├── vite.config.ts       # Vite build config
└── tsconfig.json        # TypeScript config
```

## ✨ What's Next?

1. **Customize**: Edit `_config.yml` to change site title, description
2. **Deploy**: Follow one of the deployment options above
3. **Iterate**: Keep developing with `npm run dev`, deploy with `npm run deploy`

## 📚 Learn More

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)

---

**Note**: The site is 100% static - no server required in production! All charts render client-side.
