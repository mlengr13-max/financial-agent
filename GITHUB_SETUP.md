# GitHub Setup Instructions

## Quick Start - Push to GitHub

### Step 1: Create a New Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `financial-agent`
3. Description: "AI-powered full-stack financial analysis platform with FastAPI and Next.js"
4. **Important:** Do NOT initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Add Remote and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /Users/mac/Projects/financial-agent

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/financial-agent.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Alternative: Using SSH (Recommended for future pushes)

If you have SSH keys set up:

```bash
git remote add origin git@github.com:YOUR_USERNAME/financial-agent.git
git branch -M main
git push -u origin main
```

## After Initial Push

### Future Commits

```bash
# Make changes, then:
git add .
git commit -m "Your commit message"
git push
```

### Branching (For Development)

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add your feature"

# Push to GitHub
git push -u origin feature/your-feature-name

# Create a Pull Request on GitHub to merge into main
```

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View remote URL
git remote -v

# Change remote URL (if you made a mistake)
git remote set-url origin https://github.com/NEW_USERNAME/financial-agent.git
```

## Project Files Ready for GitHub

✅ `.gitignore` - Configured to exclude:
- Python virtual environments (`venv/`)
- Node modules and build files
- API keys and secrets (`.env` files)
- IDE configurations
- OS files

✅ `README.md` - Comprehensive documentation including:
- Setup instructions
- Running the application
- API documentation
- Troubleshooting guide

✅ Clean git history - Ready for public repository

## Security Checklist

Before pushing to GitHub:

- ✅ `.gitignore` is configured to exclude `.env` files
- ✅ No API keys in committed code
- ✅ `requirements.txt` properly formatted
- ✅ Frontend dependencies in `package.json`
- ✅ README documentation complete

## Next Steps

1. Create GitHub repository
2. Execute the git commands above
3. Verify on GitHub.com that all files are pushed
4. Share the repository URL: `https://github.com/YOUR_USERNAME/financial-agent`

## Deploy to Production

After pushing to GitHub:

### Backend Deployment
- **Heroku**: Add `Procfile` with `web: gunicorn backend.server:app`
- **Railway**: Connect GitHub repo for auto-deploy
- **AWS/GCP**: Use Cloud Run or similar services

### Frontend Deployment
- **Vercel**: Connect GitHub repo for auto-deploy (recommended for Next.js)
- **Netlify**: Connect GitHub repo, set build command to `cd frontend && npm run build`
- **GitHub Pages**: Configure for static export

Questions? Check the main [README.md](README.md)
