const { Octokit } = require("@octokit/rest");

const CACHE_TTL = 60 * 5;
let cache = null;
let lastFetch = 0;

exports.handler = async function (event, context) {
    const now = Date.now();
    if (cache && now - lastFetch < CACHE_TTL * 1000) {
        return {
            statusCode: 200,
            body: JSON.stringify(cache),
        };
    }

    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) throw new Error("GITHUB_TOKEN environment variable is missing!");

        const octokit = new Octokit({ auth: token });

        const { data: languages } = await octokit.repos.getLanguages({
            owner: "MolnarHangaBorbala",
            repo: "Portfolio",
        });

        const result = Object.keys(languages).map(lang => ({
            label: lang,
            value: languages[lang],
        }));

        cache = result;
        lastFetch = now;

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (err) {
        console.error("Error in countLines function:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                errorType: err.name,
                errorMessage: err.message,
                stack: err.stack,
            }),
        };
    }
};
