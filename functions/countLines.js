import { Octokit } from "@octokit/rest";

const CACHE_TTL = 60 * 5; // cache for 5 minutes
let cache = null;
let lastFetch = 0;

export async function handler() {
    const now = Date.now();
    if (cache && now - lastFetch < CACHE_TTL * 1000) {
        return {
            statusCode: 200,
            body: JSON.stringify(cache),
        };
    }

    try {
        const token = process.env.GITHUB_TOKEN;
        const octokit = new Octokit({ auth: token });

        const { data: languages } = await octokit.repos.getLanguages({
            owner: "MolnarHangaBorbala",
            repo: "Portfolio",
        });

        // Convert GitHub byte counts to JSON for Chart.js
        const result = Object.keys(languages).map(lang => ({
            label: lang,
            value: languages[lang],
        }));

        // Cache result
        cache = result;
        lastFetch = now;

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}