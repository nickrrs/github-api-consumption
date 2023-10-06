import { Request, Response, response } from "express";
import { Octokit, App } from "octokit";

export default class GithubApiService {
    private readonly octokitApi;
    constructor(){
        this.octokitApi = new Octokit({
            auth: `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`
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
}