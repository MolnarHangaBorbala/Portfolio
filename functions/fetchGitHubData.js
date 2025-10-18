import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

const CACHE_TTL = 60 * 5;
let cache = null;
let lastFetch = 0;

export async function handler(event, context) {
    const now = Date.now();
    if (cache && now - lastFetch < CACHE_TTL * 1000) {
        return {
            statusCode: 200,
            body: JSON.stringify(cache),
        };
    }

    const privateKey = process.env.GITHUB_PRIVATE_KEY;
    const appId = process.env.GITHUB_APP_ID;
    const installationId = process.env.GITHUB_INSTALLATION_ID;

    try {
        const auth = createAppAuth({ appId, privateKey, installationId });
        const installationAuthentication = await auth({ type: "installation" });
        const octokit = new Octokit({ auth: installationAuthentication.token });

        const { data } = await octokit.repos.getContent({
            owner: "MolnarHangaBorbala",
            repo: "Portfolio",
            path: "data.json",
        });

        const content = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"));

        cache = content;
        lastFetch = now;

        return {
            statusCode: 200,
            body: JSON.stringify(content),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}