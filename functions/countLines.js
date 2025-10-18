import { Octokit } from "@octokit/rest";

const CACHE_TTL = 60 * 5; // cache for 5 minutes
let cache = null;
let lastFetch = 0;

export async function handler() {
    const now = Date.now();

    // Return cached data if recent
    if (cache && now - lastFetch < CACHE_TTL * 1000) {
        return {
            statusCode: 200,
            body: JSON.stringify(cache),
        };
    }

    try {
        const token = process.env.GITHUB_TOKEN;

        if (!token) {
            throw new Error("GITHUB_TOKEN is not set in environment variables");
        }

        const octokit = new Octokit({ auth: token });

        // Fetch languages from your repo
        const { data: languages } = await octokit.repos.getLanguages({
            owner: "MolnarHangaBorbala",
            repo: "Portfolio",
        });

        // Convert GitHub byte counts to array for Chart.js
        const result = Object.keys(languages).map(lang => ({
            label: lang,
            value: languages[lang],
        }));

        // Cache the result
        cache = result;
        lastFetch = now;

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (err) {
        console.error("Error fetching GitHub data:", err);

        // Always return an array to prevent front-end crashes
        return {
            statusCode: 200,
            body: JSON.stringify([]),
        };
    }
}
