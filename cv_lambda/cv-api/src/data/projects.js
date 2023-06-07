const projects = [
    {
        "uid": 1,
        "name": "curriculum vitae",
        "description": [
            "Interactive CV review app: allows CV reviewers to take nots, apply filters and take notes on several parts of a candidate data.",
            "backend: aws Lambda for statics assets (to be moved to aws S3 ..), Deno with Oak middlewear and Mongo for dynamic user generated data",
            "frontend: implemented both in Nextjs and Web Assembly (Rust) as separate projects, providing same functionality"
        ],
        "repo": "https://github.com/dani-lo/foo",
        "status": ["Live", "Continuously refactored to reuse the data for other projects"],
        "live_url": "",
        "notes": "",
        "tech": [1,10,33]
    },
    {
        "uid": 2,
        "name": "terminator layout plugin",
        "description": [
            "Plugin for Terminator terminal emulator - allows to save Terminator's window position and layout (width, height) to the layout settings, so these can be replicated upon launch."
        ],
        "repo": "https://github.com/dani-lo/terminator-winmanager-plugin",
        "status": ["Production"],
        "live_url": "",
        "notes": "",
        "tech": [1,10,33]
    },
    {
        "uid": 3,
        "name": "shapes trader",
        "description": [""],
        "repo": "https://github.com/dani-lo/foo",
        "status": ["Finished", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "",
        "tech": [11,20,33]

    },
    {
        "uid": 4,
        "name": "outliers",
        "description": ["A small Python app to detect outlier datapoints within large datasets", "Built in Python with Flask, employing classic algorithem for outliers detection"],
        "repo": "https://github.com/dani-lo/foo",
        "status": ["Finished", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "",
        "tech": [21,5,22]

    },
    {
        "uid": 5,
        "name": "xcel nature",
        "description": ["Online sales app for organic body creams produced by a small collective", "Built in React and Python with Django, Paypal"],
        "repo": "https://github.com/dani-lo/foo",
        "status": ["In Progress, awaiting assets"],
        "live_url": "",
        "notes": "",
        "tech": [1,10,33]
    }
]

module.exports = projects;