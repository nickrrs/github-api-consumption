import { Router, Request, Response } from 'express';
import GithubApiService from './github-api/github-api-service';

const route = Router();
const githubApiService = new GithubApiService();

route.get('/users', async (req: Request, res: Response) => {
  try {
    const data = await githubApiService.listUsers(req, res);
    return data;
  } catch (e) {
    console.error("Error while listing users:", e);
    return res.status(500).json({ error: "Error while listing users"});
  }
});

route.get('/users/:username/details', async (req: Request, res: Response) => {
  try {
    const data = await githubApiService.fetchUser(req, res);
    return data;
  } catch (e) {
    console.error('Error while fetch user details:', e);
    return res.status(500).json({ error: "Error while fetch user's details"});
  }
});

route.get('/users/:username/repos', async (req: Request, res: Response) => {
  try {
    const data = await githubApiService.fetchUserRepos(req, res);
    return data;
  } catch (e) {
    console.error("Error while fetch user's repositories:", e);
    return res.status(500).json({ error: "Error while fetch user's repositories"});
  }
});

export { route };

