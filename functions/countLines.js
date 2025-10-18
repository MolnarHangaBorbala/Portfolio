import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

const CACHE_TTL = 60 * 5;
let cache = null;
let lastFetch = 0;

export async function handler(event, context) {
    const now = Date.now();
    if (cache && now - lastFetch < CACHE_TTL * 1000) {
        return { statusCode: 200, body: JSON.stringify(cache) };
    }

    const privateKey = process.env.GITHUB_PRIVATE_KEY;
    const appId = process.env.GITHUB_APP_ID;
    const installationId = process.env.GITHUB_INSTALLATION_ID;

    try {
        const auth = createAppAuth({ appId, privateKey, installationId });
        const installationAuthentication = await auth({ type: "installation" });
        const octokit = new Octokit({ auth: installationAuthentication.token });

        const { data: languages } = await octokit.repos.getLanguages({
            owner: "MolnarHangaBorbala",
            repo: "Portfolio",
        });

        const result = Object.keys(languages).map(lang => ({
            label: lang,
            value: languages[lang]
        }));

        cache = result;
        lastFetch = now;

        return { statusCode: 200, body: JSON.stringify(result) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
}
