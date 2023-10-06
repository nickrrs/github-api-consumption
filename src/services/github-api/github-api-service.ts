import { Request, Response, response } from "express";
import { Octokit, App } from "octokit";
import { env } from "process";

export default class GithubApiService {
    private readonly octokitApi;
    constructor(){
        this.octokitApi = new Octokit({
            auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
        });
    }

    async getAuthUser() {
        const {data} = await this.octokitApi.rest.users.getAuthenticated();
        return data
    }

    async listUsers(req: Request, res: Response){
        let since = req.query?.since ? req.query?.since?.toString() : '0';
        const data = await this.octokitApi.rest.users.list({since: parseInt(since)})

        // Extract the next page URL..
        const regex = /<([^>]*)>;\s*rel="next"/;
        const nextPageLink = data.headers.link?.match(regex);
        return res.json({
            users: data.data,
            nextPageLink: (nextPageLink && nextPageLink[1] ? nextPageLink[1] : 'Next Page URL not found in the response')
        });
    }

    async fetchUser(req: Request, res: Response){
        const {username} = req.params;
        const data = await this.octokitApi.rest.users.getByUsername({username: username});
        return res.json({
            details: data.data,
        });
    }

    async fetchUserRepos(req: Request, res: Response){
        const {username} = req.params;
        const data = await this.octokitApi.rest.repos.listForUser({username: username});
        return res.json({
            repositories: data.data
        })
    }
}