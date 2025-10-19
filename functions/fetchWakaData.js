const fetch = require("node-fetch");

exports.handler = async function () {
    const apiKey = process.env.WAKATIME_API_KEY;
    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing WAKATIME_API_KEY in environment variables" }),
        };
    }

    try {
        const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
            headers: { Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}` },
        });

        const data = await response.json();

        const languages = data.data.languages.map(lang => ({
            label: lang.name,
            value: Math.round(lang.total_seconds / 3600 * 100) / 100, // hours
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(languages),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
