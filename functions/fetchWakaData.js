const fetch = require("node-fetch");

exports.handler = async function () {
    const apiKey = process.env.WAKATIME_API_KEY;
    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing WAKATIME_API_KEY" }),
        };
    }

    try {
        const authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
        const response = await fetch("https://wakatime.com/api/v1/users/current/stats/all_time_since_today", {
            headers: { Authorization: authHeader },
        });

        const json = await response.json();
        const langs = json.data?.languages || [];
        const totalSeconds = json.data?.total_seconds || 0;

        const languages = langs.map(lang => ({
            label: lang.name,
            value: Math.round(lang.total_seconds / 3600 * 100) / 100, // hours
        }));

        const result = {
            totalHours: Math.round(totalSeconds / 3600 * 100) / 100,
            languages
        };

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
};
