const { Octokit } = require("@octokit/rest");

exports.handler = async function () {
    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) throw new Error("Missing GitHub token!");

        const octokit = new Octokit({ auth: token });

        const username = "MolnarHangaBorbala";

        const repos = await octokit.paginate("GET /user/repos", {
            username,
            per_page: 100
        });

        let totalLOC = 0;
        let totalCommits = 0;

        for (const repo of repos) {
            if (repo.fork) continue;

            const { data: langs } = await octokit.request("GET /repos/{owner}/{repo}/languages", {
                owner: username,
                repo: repo.name
            });

            const locRepo = Object.values(langs).reduce((a, b) => a + b, 0);
            totalLOC += locRepo;

            const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
                owner: username,
                repo: repo.name,
                per_page: 1
            });

            const commitCount = commits.headers["link"]
                ? Number(commits.headers["link"].match(/page=(\d+)>; rel="last"/)?.[1]) || 1
                : 1;

            totalCommits += commitCount;
        }

        const LOC_FACTOR = 50;
        const lines = Math.round(totalLOC / LOC_FACTOR);

        return {
            statusCode: 200,
            body: JSON.stringify({
                totalCommits,
                totalLines: lines,
            }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
