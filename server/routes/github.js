import express from 'express';
import { getCache, setCache } from '../cache.js';

const router = express.Router();
const GITHUB_API = 'https://api.github.com';

const githubHeaders = {
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const cacheKey = `user:${username}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json({ ...cached, fromCache: true });
  }

  try {
    const response = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: githubHeaders,
    });

    if (response.status === 404) {
      return res.status(404).json({ error: `User "${username}" not found on GitHub` });
    }

    if (response.status === 403) {
      return res.status(403).json({ error: 'GitHub API rate limit exceeded. Please try again later.' });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch user from GitHub' });
    }

    const data = await response.json();

    const user = {
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      html_url: data.html_url,
      location: data.location,
    };

    setCache(cacheKey, user);
    res.json({ ...user, fromCache: false });

  } catch (error) {
    res.status(500).json({ error: 'Network error. Please check your connection.' });
  }
});

router.get('/:username/repos', async (req, res) => {
  const { username } = req.params;
  const { page = 1, per_page = 30 } = req.query;
  const cacheKey = `repos:${username}:page${page}`;

  const cached = getCache(cacheKey);
  if (cached) {
    return res.json({ ...cached, fromCache: true });
  }

  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=${per_page}&page=${page}&sort=updated`,
      { headers: githubHeaders }
    );

    if (response.status === 404) {
      return res.status(404).json({ error: `User "${username}" not found on GitHub` });
    }

    if (response.status === 403) {
      return res.status(403).json({ error: 'GitHub API rate limit exceeded. Please try again later.' });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch repos from GitHub' });
    }

    const data = await response.json();

    const repos = data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      open_issues_count: repo.open_issues_count,
      default_branch: repo.default_branch,
    }));

    const linkHeader = response.headers.get('link');
    const hasMore = linkHeader ? linkHeader.includes('rel="next"') : false;

    const result = { repos, hasMore, page: Number(page) };
    setCache(cacheKey, result);
    res.json({ ...result, fromCache: false });

  } catch (error) {
    res.status(500).json({ error: 'Network error. Please check your connection.' });
  }
});

export default router;