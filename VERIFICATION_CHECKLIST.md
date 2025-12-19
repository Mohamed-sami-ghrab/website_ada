# 🎯 Jekyll Setup Verification Checklist

Use this checklist to verify your Jekyll setup is working correctly.

## ✅ Pre-Deployment Checklist

### 1. Dependencies Installed
```bash
# Check Node.js
node --version
# Expected: v16.0.0 or higher

# Check npm
npm --version
# Expected: 8.0.0 or higher

# Check Ruby (for Jekyll)
ruby --version
# Expected: 2.5.0 or higher

# Check Bundler
bundle --version
# Expected: 2.0.0 or higher
```

- [ ] Node.js installed ✅
- [ ] npm installed ✅
- [ ] Ruby installed ✅
- [ ] Bundler installed ✅

### 2. Install Project Dependencies
```bash
# Install Node packages
npm install

# Install Ruby gems
bundle install
```

- [ ] `node_modules/` folder created ✅
- [ ] No errors during `npm install` ✅
- [ ] `vendor/bundle/` or gems installed ✅
- [ ] No errors during `bundle install` ✅

### 3. Build React Application
```bash
npm run build
```

- [ ] `dist/` folder created ✅
- [ ] `dist/assets/` contains `.js` files ✅
- [ ] `dist/assets/` contains `.css` files (if any) ✅
- [ ] Build completed without errors ✅

### 4. Test Jekyll Locally
```bash
npm run dev:jekyll
# OR
bundle exec jekyll serve
```

- [ ] Jekyll starts without errors ✅
- [ ] Site available at http://localhost:4000 ✅
- [ ] Page loads correctly ✅
- [ ] Navigation works ✅

## 🎨 Visual Verification

Open http://localhost:4000 and check:

### Page Load
- [ ] Title: "The Grammar of the Hivemind" displays ✅
- [ ] Navbar visible at top (orange "R" logo) ✅
- [ ] Fonts load correctly (Playfair Display for headings, Inter for body) ✅
- [ ] Page background is off-white (#fdfdfc) ✅

### Navigation
- [ ] "Pulse" link scrolls to Part 1 ✅
- [ ] "Dialects" link scrolls to Part 2 ✅
- [ ] "Geography" link scrolls to Part 3 ✅
- [ ] Navbar stays at top when scrolling (sticky) ✅

### Visualizations - Part 1
- [ ] **Figure 1**: Line chart with orange/indigo lines appears ✅
- [ ] Hover shows tooltip with data ✅
- [ ] **Figure 2**: Horizontal bar chart (top subreddits) ✅
- [ ] **Figure 3**: Two pie charts side by side (sentiment) ✅
- [ ] **Figure 4**: Stacked bar chart (positivity by subreddit) ✅

### Visualizations - Part 2
- [ ] **Figure 5**: Scatter plot with 3 colored clusters ✅
- [ ] Legend shows C1 (Standard), C3 (Analytical), C4 (Toxic) ✅
- [ ] Three info cards below scatter plot ✅
- [ ] **Figure 6**: Radar chart with 3 overlapping shapes ✅

### Visualizations - Part 3
- [ ] Two colored info boxes (Finding A & B) ✅
- [ ] **Figure 7**: Grid matrix showing interaction patterns ✅
- [ ] Dark conclusion section at bottom ✅

### Styling & Interactions
- [ ] All charts are in white rounded containers ✅
- [ ] Captions appear below charts in gray italic ✅
- [ ] Orange accent color (#f97316) used correctly ✅
- [ ] Hover effects on charts work ✅
- [ ] Page is responsive (resize browser to test) ✅

### Footer
- [ ] Footer with social icons visible ✅
- [ ] Copyright notice: "© 2024 ApesStrongTogether Team" ✅

## 🚀 Deployment Verification

### GitHub Repository
- [ ] Repository created on GitHub ✅
- [ ] All files pushed to `main` branch ✅
- [ ] `.gitignore` prevents committing `node_modules/`, `dist/`, `_site/` ✅

### GitHub Pages Setup
- [ ] Went to Settings → Pages ✅
- [ ] Selected "GitHub Actions" as source ✅
- [ ] First deployment completed successfully ✅
- [ ] Site accessible at published URL ✅

### Live Site Verification
Visit your published URL and repeat the "Visual Verification" section above.

- [ ] All visualizations load on live site ✅
- [ ] No console errors (press F12) ✅
- [ ] Assets load correctly (check Network tab) ✅
- [ ] Site works on mobile (test responsiveness) ✅

## 🐛 Troubleshooting

### Issue: React app doesn't render
**Check:**
1. Open browser console (F12)
2. Look for JavaScript errors
3. Verify `dist/assets/` files are loaded
4. Ensure you ran `npm run build`

**Fix:**
```bash
npm run build
npm run dev:jekyll
```

### Issue: Charts not appearing
**Check:**
1. Console for "recharts" errors
2. Verify `<div id="root"></div>` exists in HTML
3. Check if script tags are in `<head>` or `<body>`

**Fix:**
Ensure `_layouts/default.html` loads scripts correctly.

### Issue: Styles look wrong
**Check:**
1. Tailwind CSS CDN loaded
2. Custom fonts loaded
3. CSS in `<style>` tag present

**Fix:**
Verify `_layouts/default.html` has all `<link>` and `<style>` tags.

### Issue: GitHub Pages 404
**Check:**
1. `baseurl` in `_config.yml` matches repo name
2. Files are in root, not subdirectory
3. GitHub Actions workflow completed

**Fix:**
Update `_config.yml`:
```yaml
baseurl: "/your-repo-name"  # If project page
url: "https://yourusername.github.io"
```

## ✨ Success Criteria

All boxes checked = Ready for production! 🎉

### Minimum Requirements
- ✅ Site loads locally at localhost:4000
- ✅ All 7 visualizations render correctly
- ✅ Navigation and scrolling work
- ✅ No console errors

### Ideal State
- ✅ Deployed to GitHub Pages
- ✅ Auto-deployment works on push
- ✅ Site accessible via public URL
- ✅ Mobile responsive
- ✅ Fast load times (static site)

---

**Next Steps After All Checks Pass:**
1. Share your live site URL! 🌐
2. Consider adding custom domain
3. Monitor GitHub Actions for deployment status
4. Update content as needed (just edit, commit, push!)

**Need Help?**
See [QUICKSTART.md](QUICKSTART.md) or [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting.
