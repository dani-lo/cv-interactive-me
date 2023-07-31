const projects = [
    {
        "uid": 1,
        "name": "Terminator tabs plugin",
        "description": [
            "Plugin for Terminator _#terminal emulator_ - adds functionality to launch named new tabs",
            "For usage see _#README_ docs within repository"
        ],
        "repo": "https://github.com/dani-lo/terminator-named-tabs-plugin",
        "status": ["_#Production_", "Not tested", "Ongoing development"], 
        "live_url": "",
        "notes": "Plugin for Terminator (cli)",
        "tech": [
            57,
            58,
            52
        ],
        "from": [6, 2023],
        "to": [6, 2023]
    },
    {
        
        "uid": 2,
        "name": "Interactive me",
        "description": [
            "Interactive CV review app: allows CV reviewers to take _#notes_, apply _#filters_ and set _#bookmarks_ on several parts of a candidate cv data.",
            "_#Backend_: aws Lambda for statics assets (to be moved to aws S3 ..), Deno with Oak middlewear and Mongo for dynamic user generated data",
            "_#Frontend_: implemented both in Nextjs and Web Assembly (Rust) as separate projects, providing same functionality"
        ],
        "repo": "https://github.com/dani-lo/cv-interactive-me",
        "status": ["_#Live_", "Ongoing development"],
        "live_url": "",
        "notes": "Interactive CV reviewing app",
        "tech": [
            58,
            36,
            29,
            59,
            42,
            52,
            60,
            62,
            32,
            61,
            63,
            37,
            64,
            38,
            44,
            53,
            4,
            5
        ],
        "from": [10, 2022],
        "to": [4, 2023]
    },
    {
        "uid": 3,
        "name": "Terminator layout plugin",
        "description": [
            "Plugin for Terminator _#terminal emulator_: allows to save Terminator's window position and layout (width, height) to the layout settings",
            "For usage see _#README_ docs within repository"
        ],
        "repo": "https://github.com/dani-lo/terminator-winmanager-plugin",
        "status": ["_#Production_", "Not tested", "Ongoing development"],
        "live_url": "",
        "notes": "Plugin for Terminator (cli)",
        "tech": [
            57,
            58,
            52
        ],
        "from": [1, 2022],
        "to": [2, 2022]
    },
    {
        "uid": 4,
        "name": "Shapes Trading",
        "description": ["Shape based _#pattern recognition_ and _#reporting_ of financial instrument charts", "A lockdown fun project", "Please refer to _#shape-trading-md.html_ (in repo root) for detailed instructions of how this app works, including in depth discussion of the matching parameters and user interface"],
        "repo": "https://github.com/dani-lo/shapes-trading",
        "status": ["_#Finished_", "Not available on public URL, can be run locally"],
        "live_url": "",
        "notes": "Shape based _#pattern recognition_ of financial instruments",
        "tech": [
            57,
            55,
            38,
            29,
            24,
            53,
            4,
            5
        ],
        "from": [1, 2019],
        "to": [2, 2019]
    },
    {
        "uid": 5,
        "name": "Outliers",
        "description": ["A small  app written in Python to detect _#outlier datapoints_ within large datasets", "Built in Python with Flask, employing classic algorithms for _#outliers detection_"],
        "repo": "https://github.com/dani-lo/baoutliers",
        "status": ["_#Finished_", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "Outlier detection in datasets using classic outlier algorightms",
        "tech": [
            57,
            65,
            4,
            5
        ],
        "from": [1, 2018],
        "to": [2, 2018]
    },
    {
        "uid": 6,
        "name": "React D3 Dashboard",
        "description": ["A multi panels basic _#dashboard_ based on a mock dataset", "Old Project, uses _#D3 v3.0_ and an early version of React"],
        "repo": "https://github.com/dani-lo/react-d3-dashboard",
        "status": ["_#Finished_", "Not available on public URL but can be run locally"],
        "live_url": "",
        "notes": "A multi panels basic _#dashboard_ ",
        "tech": [
            29,
            39,
            24 ,
            4,
            5
        ],
        "from": [1, 2016],
        "to": [2, 2016]
    }
];

module.exports = projects;