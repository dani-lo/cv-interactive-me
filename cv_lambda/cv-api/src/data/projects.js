const projects = [
    {
        "uid": 6,
        "name": "Terminator tabs plugin",
        "description": [
            "Plugin for Terminator _#terminal emulator_ - adds functionality to launch named new tabs",
            "For usage see _#README_ docs within repository"
        ],
        "repo": "https://github.com/dani-lo/terminator-named-tabs-plugin",
        "status": ["_#Production_", "See README for installing"],
        "live_url": "",
        "notes": "Plugin for Terminator (cli)",
        "tech": [1,10,33]
    },
    {
        
        "uid": 1,
        "name": "Interactive me",
        "description": [
            "Interactive CV review app: allows CV reviewers to take _#notes_, apply _#filters_ and set _#bookmarks_ on several parts of a candidate cv data.",
            "_#Backend_: aws Lambda for statics assets (to be moved to aws S3 ..), Deno with Oak middlewear and Mongo for dynamic user generated data",
            "_#Frontend_: implemented both in Nextjs and Web Assembly (Rust) as separate projects, providing same functionality"
        ],
        "repo": "https://github.com/dani-lo/cv-interactive-me",
        "status": ["_#Live_", "Continuously refactored to reuse the data for other projects"],
        "live_url": "",
        "notes": "Interactive CV reviewing app",
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
        "notes": "Plugin for Terminator (cli)",
        "tech": [1,10,33]
    },
    {
        "uid": 3,
        "name": "Shapes Trading",
        "description": ["Shape based _#pattern recognition_ and _#reporting_ of financial instrument charts", "A lockdown fun project", "Please refer to _#shape-trading-md.html_ (in repo root) for detailed instructions of how this app works, including in depth discussion of the matching parameters and user interface"],
        "repo": "https://github.com/dani-lo/shapes-trading",
        "status": ["_#Finished_", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "Shape based _#pattern recognition_ and _#reporting_ of financial instrument charts",
        "tech": [11,20,33]
    
    },
    {
        "uid": 4,
        "name": "Outliers",
        "description": ["A small Python app to detect _#outlier datapoints_ within large datasets", "Built in Python with Flask, employing classic algorithms for _#outliers detection_"],
        "repo": "https://github.com/dani-lo/baoutliers",
        "status": ["_#Finished_", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "Outlier detection in datasets using classic outlier algorightms",
        "tech": [21,5,22]
    
    },
    {
        "uid": 5,
        "name": "React D3 Dashboard",
        "description": ["A multi panels basic _#dashboard_ based on a mock dataset", "Old Project, uses _#D3 v3.0_ and an early version of React"],
        "repo": "https://github.com/dani-lo/react-d3-dashboard",
        "status": ["_#Finished_", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "A multi panels basic _#dashboard_ ",
        "tech": [21,5,22]
    }
]

module.exports = projects;