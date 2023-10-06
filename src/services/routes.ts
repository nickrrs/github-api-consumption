import { Router, Request, Response } from 'express';
import GithubApiService from './github-api/github-api-service';

const route = Router();
const githubApiService = new GithubApiService();

route.get('/me', async (req: Request, res: Response) => {
  try {
    const data = await githubApiService.getAuthUser();
    return res.json({ data });
  } catch (error) {
    console.error('Error while retrieving information for the authenticated user.:', error);
    return res.status(500).json({ error: 'Error while retrieving information for the authenticated user.' });
  }
});


route.get('/users', async (req: Request, res: Response) => {
  try {
    const data = await githubApiService.listUsers(req, res);
    return res.json(data);
  } catch (e) {
    console.error('Error while listing users:', e);
    return res.status(500).json({ error: 'Error while listing users', message: e });
  }
});

export { route };

// export default class Routes {

//     public readonly route: Router = Router();
//     private readonly service: GithubApiService;

//     constructor() {
//         this.service = new GithubApiService();
//         this.getUser();
//     }

//     public getUser(){
//         this.route.get('/', async (req: Request, res: Response) => {
//             const data = await this.service.getAuthUser();
//             return res.json({data});
//         });
//     }
    
// }
