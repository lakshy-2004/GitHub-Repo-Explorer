const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUser(username) {
  const response = await fetch(`${API_URL}/api/user/${username}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch user');
  }

  return data;
}

export async function fetchRepos(username, page = 1) {
  const response = await fetch(`${API_URL}/api/user/${username}/repos?page=${page}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch repos');
  }

  return data;
}