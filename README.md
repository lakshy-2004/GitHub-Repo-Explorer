# ⚡ GitHub Repo Explorer

A full-stack web app that lets you search any GitHub user and explore their public profile and repositories. The frontend never calls the GitHub API directly — all requests are proxied through a Node.js backend that also handles caching and rate limit protection.

## Live Demo

- **Frontend:** https://git-hub-repo-explorer-kohl.vercel.app
- **Backend:** https://github-repo-explorer-api-sqxb.onrender.com

## Tech Stack

### Frontend
- **React (Vite)** — fast dev server and build tool
- **Component-level CSS** — each component has its own CSS file for maintainability
- **Custom hooks** — all data fetching logic lives in `useGithub.js`

### Backend
- **Node.js + Express** — REST API server
- **CORS** — configured to allow only the frontend origin in production
- **In-memory cache** — prevents repeated GitHub API calls within 60 seconds

## How to Run Locally

Make sure you have Node.js installed.

### 1. Clone the repo

```bash
git clone https://github.com/lakshy-2004/github-repo-explorer.git
cd github-repo-explorer
```

### 2. Start the backend

```bash
cd server
npm install
npm run dev
```

Server runs on http://localhost:5000

### 3. Start the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on http://localhost:5173

### 4. Environment variables

Create `client/.env` in the client folder:

```
VITE_API_URL=http://localhost:5000
```

## API Documentation

### GET /

Health check route.

**Response:**
```json
{
  "message": "GitHub Repo Explorer API is running"
}
```

---

### GET /api/user/:username

Fetches a GitHub user's public profile.

**Example:** `/api/user/torvalds`

**Response:**
```json
{
  "login": "torvalds",
  "name": "Linus Torvalds",
  "bio": "Linux and git.",
  "avatar_url": "https://avatars.githubusercontent.com/u/1024025",
  "followers": 242000,
  "following": 0,
  "public_repos": 10,
  "location": "Portland, OR",
  "html_url": "https://github.com/torvalds",
  "fromCache": false
}
```

**Error responses:**
| Status | Meaning |
|--------|---------|
| 404 | User not found on GitHub |
| 403 | GitHub API rate limit exceeded |
| 500 | Network or server error |

---

### GET /api/user/:username/repos

Fetches a user's public repositories with pagination.

**Example:** `/api/user/torvalds/repos?page=1&per_page=30`

**Query params:**
| Param | Default | Description |
|-------|---------|-------------|
| page | 1 | Page number |
| per_page | 30 | Results per page |

**Response:**
```json
{
  "repos": [
    {
      "id": 2325298,
      "name": "linux",
      "description": "Linux kernel source tree",
      "language": "C",
      "stargazers_count": 182000,
      "forks_count": 52000,
      "updated_at": "2026-06-01T00:00:00Z",
      "html_url": "https://github.com/torvalds/linux",
      "open_issues_count": 312,
      "default_branch": "master"
    }
  ],
  "hasMore": true,
  "page": 1,
  "fromCache": false
}
```

**Error responses:**
| Status | Meaning |
|--------|---------|
| 404 | User not found on GitHub |
| 403 | GitHub API rate limit exceeded |
| 500 | Network or server error |

## Project Structure

```
github-repo-explorer/
├── client/                       # React frontend (Vite)
│   ├── src/
│   │   ├── components/           # UI components with their own CSS files
│   │   │   ├── SearchBar.jsx     # Search input and submit button
│   │   │   ├── SearchBar.css
│   │   │   ├── UserCard.jsx      # GitHub user profile card
│   │   │   ├── UserCard.css
│   │   │   ├── RepoCard.jsx      # Individual repo card with expand
│   │   │   ├── RepoCard.css
│   │   │   ├── SortBar.jsx       # Sort repos by stars, name, updated
│   │   │   ├── SortBar.css
│   │   │   ├── LanguageChart.jsx # Horizontal bar chart for languages
│   │   │   ├── LanguageChart.css
│   │   │   ├── RecentSearches.jsx # Recently searched usernames
│   │   │   ├── SkeletonCard.jsx  # Loading skeleton for repo cards
│   │   │   └── UserCardSkeleton.jsx # Loading skeleton for user card
│   │   ├── hooks/
│   │   │   └── useGithub.js      # All data fetching and state logic
│   │   ├── services/
│   │   │   └── api.js            # API call functions
│   │   ├── App.jsx               # Root component with theme toggle
│   │   ├── App.css               # App-level styles
│   │   └── index.css             # Global styles
│   ├── .env                      # Local environment variables
│   └── .env.production           # Production environment variables
├── server/                       # Node.js + Express backend
│   ├── routes/
│   │   └── github.js             # GitHub proxy routes
│   ├── cache.js                  # In-memory cache with 60s TTL
│   └── index.js                  # Express app entry point
└── README.md
```

## Features

- Search any GitHub username and view their public profile
- Display avatar, name, bio, location, followers, following and repo count
- View all public repositories sorted by stars, name or last updated
- Expand any repo to see open issues count and default branch
- Language distribution chart across all repos
- Recently searched usernames saved to localStorage
- Load more pagination for users with many repos
- Server-side caching — same username within 60 seconds returns cached data
- Loading skeletons while data is being fetched
- Clear error messages for invalid usernames and rate limits
- Light and dark theme toggle

## What I Would Do With More Time

- Add GitHub OAuth so users can search private repos
- Swap in-memory cache for Redis for scalability
- Add debounced search-as-you-type input
- Add Jest tests for the cache logic and API routes
- Show star history chart over time using GitHub events API
- Save theme preference to localStorage so it persists on refresh

## Notes

- AI tools (Claude) were used during development to assist with code structure and styling. Every line of code has been reviewed and understood.
- The backend proxies all GitHub API requests to avoid exposing tokens in the browser and to enable server-side caching.
- Render free tier may have a cold start delay of ~30 seconds on the first request after inactivity.
- Stack Overflow and GitHub documentation were referenced for the GitHub API response shape and Link header pagination pattern.