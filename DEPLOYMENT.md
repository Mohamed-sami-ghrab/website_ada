# Deploying Reddit Network Analysis to Jekyll

This project is now configured to run with Jekyll for static site deployment. The React application is built using Vite and served through Jekyll.

## Prerequisites

1. **Node.js** (for building the React app)
2. **Ruby** (for Jekyll)
3. **Bundler** (Ruby gem manager)

## Setup Instructions

### 1. Install Node Dependencies

```bash
npm install
```

### 2. Install Jekyll and Dependencies

```bash
# Install Bundler if you don't have it
gem install bundler

# Install Jekyll and plugins
bundle install
```

### 3. Build the React Application

```bash
npm run build
```

This will create a `dist/` directory with your compiled React app.

### 4. Run Jekyll Locally

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

## Deployment Options

### Option 1: GitHub Pages

1. Push your repository to GitHub
2. Go to Settings > Pages
3. Select the branch you want to deploy (usually `main` or `master`)
4. Set the source to `/ (root)`
5. GitHub will automatically build and deploy your Jekyll site

**Important:** If deploying to a project page (not username.github.io), update `_config.yml`:
```yaml
baseurl: "/your-repository-name"
```

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build && bundle exec jekyll build`
3. Set publish directory: `_site`
4. Deploy!

### Option 3: Manual Deployment

1. Run `npm run build` to build the React app
2. Run `bundle exec jekyll build` to generate the static site
3. Upload the contents of `_site/` directory to your web server

## Project Structure

```
.
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Jekyll layout that loads the React app
├── dist/                    # Vite build output (created after npm run build)
├── index.md                 # Jekyll entry point
├── index.tsx                # React application source
├── package.json             # Node dependencies
├── vite.config.ts           # Vite configuration
└── Gemfile                  # Ruby dependencies
```

## Development Workflow

1. **For React development:**
   ```bash
   npm run dev
   ```
   This starts Vite dev server at http://localhost:3000

2. **For Jekyll preview:**
   ```bash
   npm run build && bundle exec jekyll serve
   ```

## Notes

- The React app is compiled to static JavaScript files
- Jekyll serves the compiled files and provides the HTML wrapper
- All charts and visualizations work exactly as before
- No server-side rendering needed - it's a pure static site

## Troubleshooting

**Issue:** Assets not loading
- Make sure you've run `npm run build` before `jekyll serve`
- Check that `dist/` directory exists and contains `assets/` folder

**Issue:** Jekyll serve fails
- Run `bundle install` again
- Check Ruby version compatibility

**Issue:** React app not rendering
- Open browser console to check for JavaScript errors
- Verify the script path in `_layouts/default.html` matches your build output
