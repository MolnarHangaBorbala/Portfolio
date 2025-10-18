const { Octokit } = require("@octokit/rest");

const CACHE_TTL = 60 * 10; // cache for 10 minutes
let cache = null;
let lastFetch = 0;

exports.handler = async function (event, context) {
    const now = Date.now();

    if (cache && now - lastFetch < CACHE_TTL * 1000) {
        console.log("Returning cached aggregated language data");
        return {
            statusCode: 200,
            body: JSON.stringify(cache),
        };
    }

    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) throw new Error("GITHUB_TOKEN environment variable is missing!");

        const octokit = new Octokit({ auth: token });

        // Fetch all public + private repos
        const repos = await octokit.paginate('GET /user/repos', {
            username: 'MolnarHangaBorbala',
            per_page: 100
        });

        console.log(`Found ${repos.length} repos`);

        // Fetch languages for each repo
        const totalLanguages = {};

        for (const repo of repos) {
            const { data: langs } = await octokit.request(
                'GET /repos/{owner}/{repo}/languages',
                { owner: 'MolnarHangaBorbala', repo: repo.name }
            );

            for (const [lang, bytes] of Object.entries(langs)) {
                totalLanguages[lang] = (totalLanguages[lang] || 0) + bytes;
            }
        }

        // Convert bytes → lines of code
        const LOC_FACTOR = 50;
        const result = Object.entries(totalLanguages).map(([lang, bytes]) => ({
            label: lang,
            value: Math.round(bytes / LOC_FACTOR)
        }));

        // include all major languages even if 0
        const majorLanguages = ["HTML", "CSS", "JavaScript", "Python", "C#", "JSON", "TypeScript", "Java"];
        majorLanguages.forEach(lang => {
            if (!result.find(r => r.label === lang)) {
                result.push({ label: lang, value: 0 });
            }
        });

        cache = result;
        lastFetch = now;

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };

    } catch (err) {
        console.error("Error fetching aggregated languages:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                errorType: err.name,
                errorMessage: err.message,
                stack: err.stack
            }),
        };
    }
};
