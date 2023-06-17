const projects = [
    {
        "uid": 1,
        "name": "Curriculum Vitae",
        "description": [
            "Interactive CV review app: allows CV reviewers to take _#notes_, apply _#filters_ and set _#bookmarks_ on several parts of a candidate cv data.",
            "_#Backend_: aws Lambda for statics assets (to be moved to aws S3 ..), Deno with Oak middlewear and Mongo for dynamic user generated data",
            "_#Frontend_: implemented both in Nextjs and Web Assembly (Rust) as separate projects, providing same functionality"
        ],
        "repo": "https://github.com/dani-lo/foo",
        "status": ["_#Live_", "Continuously refactored to reuse the data for other projects"],
        "live_url": "",
        "notes": "",
        "tech": [1,10,33]
    },
    {
        "uid": 2,
        "name": "Terminator layout plugin",
        "description": [
            "Plugin for Terminator _#terminal emulator_ - allows to save Terminator's window position and layout (width, height) to the layout settings, so these can be replicated upon launch.",
            "For usage see _#README_ docs within repository"
        ],
        "repo": "https://github.com/dani-lo/terminator-winmanager-plugin",
        "status": ["_#Production_", "See README for installing"],
        "live_url": "",
        "notes": "",
        "tech": [1,10,33]
    },
    {
        "uid": 3,
        "name": "Shapes Trader",
        "description": ["Shape based _#pattern recognition_ and _#reporting_ of financial instrument charts", "A lockdown fun project", "Please refer to _#shape-trading-md.html_ (in repo root) for detailed instructions of how this app works, including in depth discussion of the matching parameters and user interface"],
        "repo": "https://github.com/dani-lo/foo",
        "status": ["_#Finished_", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "",
        "tech": [11,20,33]

    },
    {
        "uid": 4,
        "name": "Outliers",
        "description": ["A small Python app to detect _#outlier datapoints_ within large datasets", "Built in Python with Flask, employing classic algorithms for _#outliers detection_"],
        "repo": "https://github.com/dani-lo/foo",
        "status": ["_#Finished_", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "",
        "tech": [21,5,22]

    }
]

module.exports = projects;