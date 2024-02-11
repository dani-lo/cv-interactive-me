const jobs = [
  {
    "uid": 18,
      "title":"April 2023 - now,   Dev Interactive, London",
      "tech_str":"Typescript,React,  Node, Express, Highcharts, Jest, Styled Components, Husky",
      "tech": [29,59,55, 38, 91, 81, 82, 85, 83, 79, 75, 77, 76, 62, 63, 64, 65, 57, 60, 58, 59, 55,53,44, 36, 37, 32,33, 80, 89, 88],
      "position":"Sabbatical",
      "company": 17,
      "description":[
        "Spent time on sabbatical, focusing on well-being and upskilling on some of the most interesting web development technologies of late - rust, webassembly,  serverside rendering and others",
        "Development of several side projects, from SPAs to CLI tools: amongst these, 2  SPAs are in beta / production: _#interactiveme.net_ (github.com/dani-lo/cv-interactive-me) and _#qrated-review.net_ (github.com/dani-lo/qrated) - both aimed at features facilitating smart / collaborative reviewing processes"
      ],
      "from": [4, 2023],
      "to": [2, 2024],
      "jobType": [4, 6]
    },
    {
      "uid": 17,
        "title":"April 2017 - April 2023,   BrightAnalytics, London",
        "tech_str":"Typescript, Coffeescript, React, Meteor, Node, d3, Express, Highcharts, Jest, Mapbox, Styled Components, Husky",
        "tech": [29, 38, 30, 54, 91, 55, 39, 22, 34, 35, 42, 43, 45, 53, 31, 24, 86, 85,52, 89, 35, 44, 86, 76, 75, 32, 33, 59],
        "position":"Fullstack / Lead Frontend developer",
        "company": 1,
        "description":[
          "Working on _#dashboard_ and _#report engine_ react platforms - leading on visualisations, new features, maintainance",
          "Mentoring junior developers",
          "S3 and Node Express project work for _#micro services_, Auth engine",
          "RnD work (React Native app,  AWS Lambda + S3 based remote settings engine, _#D3_ custom visualisations, Maps)",
          "Work on the Datamodel, Auth and Frontend cli project management utilities tools",
          "Led the ground-up rebuild of BA _#core data mapping and data harmonisation_ interface, used to integrate any number of data sources, define custom sub-queries to create new data sources, create custom KPIs that use re-usable metric definitions, define rules to automatically harmonise _#ETL_ data, manage dimension values and colour schemes"
        ],
        "from": [4, 2017],
        "to": [4, 2023],
        "jobType": [1, 4, 5]
      },
    {
      "uid": 16,
      "title":"December 2015 ­ - March 2017,   Admedo, London",
      "tech_str":"Angular 1.5, Gmaps, d3, Gulp, Mocha, Protractor, Karma, Sinon, Scss, Git, AWS S3",
      "tech": [28, 25, 24, 49, 51, 75, 26, 52, 89, 38],
      "position":"Frontend developer",
      "company": 2,
      "description":[
          "Working as part of a large development team  in an _#Agile_ environment on enhancing the Admedo platform by liaising with the product owner and Backend team to build new features and maintain the existing ones",
          "In charge of all _#charting_ functionalities for the app via in house d3 development (reporting, dashboards, widgets)",
          "Work on UI for remote S3 based DSP _#assets management_",
          "Regular team meetings for Standup, Restrospectives, Features scheduling, Roadmaps"
      ],
      "from": [12, 2015],
      "to": [3, 2017],
      "jobType": [1, 5]
    },
    {
      "uid": 15,
      "title":"September 2015 ­ - October 2015,     VCCP, London ",
      "tech_str":"Backbone, Grunt, Bootstrap, html5, Responsive, Sass, Git",
      "tech": [19, 23,50, 49, 52],
      "position":"Frontend developer",
      "company": 3,
      "description":[
          "Worked on a VCCP campaign for O2 to promote rugby world cup campaigns (WearTheRose and MakeThemGiant), aimed at supporting the _#National rugby team_",
          "Backbone, _#Media Queries_, OO javascript development for a video wall and other components within the O2 MakeThemGiant website / app",
          "Bootstrap development as part of a team for a highly responsive rewrite of _#Hiscox_ new German website frontend "
      ],
      "from": [9, 2015],
      "to": [10, 2015],
      "jobType": [2, 5]
    },
    {
      "uid": 14,
      "title":"July 2013 ­ - August 2015,   ATP, London ",
      "tech_str":"Backbone, RequireJS, Underscore, d3, Moment, Svg, Grunt, Less, Bower, Git",
      "tech": [19, 18, 24, 52, 49, 23],
      "position":"Frontend developer",
      "company": 4,
      "description":[
          "Development of ATP's flagship online _#data mining_ tools, Attributer and Trader, by building on the _#single page app_ paradigm and interfacing with a complex backend via a set of RESTful apis to output various sets of data in charted and tabular formats",
          "Developed ATP's ground breaking Profiler tool, a charting utility targeting demographic, behavioural, and psychographic attributes of online users based on _#campaigns tracking_"
      ],
      "from": [7, 2013],
      "to": [8, 2015],
      "jobType": [3, 4, 5]
    },
    {
      "uid": 13,
      "title":"May 2013 ­ - June 2013, Hangar 7, London",
      "tech_str":"Jquery, Git, HTML5, Code Igniter",
      "tech": [6, 52, 39, 56, 12],
      "position":"Frontend developer ",
      "company": 5,
      "description":[
          "Worked on Hangar 7 online game suite for children _#'Tottenham Turfies'_ redeveloping Ajax routines and UI flow and, bringing the project to delivery"
      ],
      "from": [5, 2013],
      "to": [6, 2013],
      "jobType": [2, 5]
    },
    {
      "uid": 12,
      "title":"December 2012 ­- April 2013,  Grand Union, London",
      "tech_str":"Backbone, RequireJS, Mustache, Coffeescript, Sinatra (backend mockups), HAML, Vagrant",
      "tech": [19, 18, 21, 22, 20],
      "position":"Frontend developer",
      "company": 6,
      "description":[
          "_#Redevelopment_ of the entire user interface for one of the UK top range supermarkets e-commerce website (flagship site), _#Waitrose_, with focus on groundbreaking interactive elements to enhance customers online shopping experience. ",
          "The project was managed in a strict _#Agile_ format"
      ],
      "from": [12, 2012],
      "to": [4, 2013],
      "jobType": [2, 3, 5]
    },
    {
      "uid":11,
      "title":"October 2012 ­- November 2012,   Fullsix, London ",
      "tech_str":"Backbone, RequireJS, Underscore, Css3 animations, Jquery, interfacing to Umbraco",
      "position":"Frontend developer",
      "tech": [19, 18, 6, 45],
      "company": 7,
      "description":[
          "Developed a pilot Javascript application for _#Sainsburys_, Christmas recipes, in close collaboration with an _#Umbraco_ .NET developer. The application is Umbraco cms driven, and structured as a large single page ajax application ",
          "Followed the project from technical specification to support for UX and design specifications and eventually _#development and backend integration_. The pilot proved very successful and has been used for other Sainsburys recipes applications"
      ],
      "from": [10, 2012],
      "to": [12, 2012],
      "jobType": [2, 5]
    },
    {
      "uid": 10,
      "title":"July 2012 -­ September 2012,   Grand Union, London",
      "tech_str":"Modernizr, RequireJS, Underscore, Css3 animations, Jquery, Youtube js api",
      "tech": [17, 18, 6, 48],
      "position":"Frontend developer",
      "company": 6,
      "description":[
          "Worked on _#Butlins_ UK website rebuild (all frontend, backend developed by third party) as part of the frontend team",
          "Developed the javascript interactive application _#'Interactive Resort Guide'_ for the new Butlins website:  a highly interactive single page js application based on _#drag n drop navigation_ and background images animation"
      ],
      "from": [7, 2012],
      "to": [9, 2012],
      "jobType": [2, 5]
    },
    {
      "uid": 9,
      "title":"June 2012 ­ - July 2012, Grouptree, London",
      "tech_str":"OO Javascript, Google Maps api v3, Visual Studio",
      "tech": [39, 52, 46, 47],
      "position":"Frontend developer",
      "company": 8,
      "description":[
          "Javascript development work to port a large web map application to version 3 of the _#googlemaps api_",
          "_#Refactoring_ to object oriented architecture (custom mvc, namespacing, abstraction) of a very large procedural code repository "
      ],
      "from": [6, 2012],
      "to": [7, 2012],
      "jobType": [2, 5]
    },
    {
      "uid": 8,
      "title":"April 2012 ­- May 2012,    Rehabstudio, London",
      
      "tech_str":"OO javascript, Tweening, Springboard mvc, Custom ajax stream api, Chrome­only FS api ",
      "tech": [39, 16, 10, 56],
      "position":"Frontend developer",
      "company": 9,
      "description":[
          "OO Javascript, HTML5 development for a locally hosted  _#photoboot app_ running on Chrome Local FS api features for their Google account - installed at major worldwide (i.e. Champions League finals in Munich) events in situ to promote_# google+_"
      ],
      "from": [4, 2012],
      "to": [5, 2012],
      "jobType": [2, 5]
    },
    {
      "uid": 7,
      "title":"Sep 2011 -­ Jan 2012,     Capablue, London",
      "tech_str":"OO Javascript, Galio, Css3",
      "tech": [39, 13, 4, 10, 52],
      "position":"Javascript Team Lead",
      "company": 10,
      "description":[
          "_#Lead_ of small London based frontend team within the Capablue development team, focused on building applications for a new _#set­top box UI_ using frontend web technology",
          "Work with (and on) an advanced custom OO javascript library  interfacing with the lower level of the box _#RMAI_",
          "Liasing with end client (Software Development company) on all development matters, including enhancements to the RMAI and javascript libraries",
          "Xhtml and css work ('custom' transitions) within a custom browser environment (_#ANT_ port of Galio browser)",
          "Unix routine work for interfacing with the test boxes, compiling and testing"
      ],
      "from": [9, 2011],
      "to": [1, 2012],
      "jobType": [2, 5]
    },
    {
      "uid": 6,
      "title":"August 2011,   The App Business ",
      "tech_str":"OO Javascript, CSS3, Media Queries",
      "tech": [39, 4, 5, 56],
      "position":"Frontend Developer",
      "company":11,
      "description":[
          "Front end development - css and javascript  with focus on web application mobile specific compatibility and optimization for a project for The App Busines Dove account"
      ],
      "from": [8, 2011],
      "to": [9, 2011],
      "jobType": [2, 4, 5]
    },
    {
      "uid": 5,
      "title":"July 2011  August 2011,   Profero, London",
      "tech_str":"CakePhp, OO Javascript",
      "tech": [11, 39, 4, 5],
      "position":"Fullstack Developer",
      "company": 12, 
      "description":[
          "Contract at Profero, working on a CakePhp site for their account _#Barclays Stockbrokers_",
          "Work on a CakePhp site for Proferos account Barclays Stockbrokers, involving mostly css and javascript work",
          "Redhat deployment box, cakePHP backend (mvc development and refactoring involved), Mercurial versioning tool"
      ],
      "from": [7, 2011],
      "to": [8, 2011],
      "jobType": [2, 5]
    },
    {
      "uid": 4,
      "title":"July 2010 - July 2011, Iris Digital, London",
      "tech_str":"Php, MySql, SOAP, Regex, Unix (Red Hat), Html, Css, Javascript, Svn admin",
      "tech": [9, 2, 73, 4, 5, 39, 10],
      "position":"Fullstack Developer",
      "company": 13,
      "description":[
          "Php backend development, UI work, SVN and Unix administration, mostly on the client’s Volkswagen Vans account, plus minor work on the client’s other php sites (Sony Ericsson social media, CountryLife, FA)",
          "Maintenance of the Volkswagen Vans website, involving data reports, PAF data updates, code upgrades, SOAP feeds work, liasing with the account director and account managers over daytoday tasks and with various project managers over new tasks",
          "Maintenance and modifications to the unique Php framework powering the Volkswagen Vans website  Fusebox framework, a Php port of Coldfusion Fusebox: mostly based on serverside inludes, no ORM",
          "Planning and technical lead on all Volkswagen Vans new projects and improvements. Work on custom javascript / html5 video apps. Maintenance of Volkswagen Vans staging and live server (Unix) environments, SVN work"
      ],
      "from": [7, 2010],
      "to": [7, 2011],
      "jobType": [2, 5]
    },
    {
      "uid": 3,
      "title":"July 2010 - July 2011 ,Various agencies, London ",
      "tech_str":"Fullstack developer",
      "tech": [
        2, 
        9, 
        39,
        4, 
        5, 
        11, 
        12,
        14, 
        10
      ],
      "position":"Freelancing on short term contracts",
      "description":[
        "Front end development contract at _#Maynard Malone_:  Php, css, xhtml, javascript and javascript/flash integration work on their _#Kallo_ account 'Just Bouillon' website",
        "CakePHP development contract at _#WanderingBear_ on the refactoring of an existing cakePHP based website; Chinese language support added to the site",
        "Front end development contract at _#Green Room At Momentum_: css, xhtml,javascript work on their _#Nestle_ account 'Rolo' website, .NET framework environment under SVN",
        "Front end and Php development contract at _#Iris Digital_:  css, xhtml, javascript work on their _#Volkswagen Vans_ account website, php (Lightbox framework) environment under SVN"
      ],
      "from": [7, 2009],
      "to": [7, 2010],
      "jobType": [2, 5]
    },
    {
      "uid": 2,
      "title":"Oct 2007 -­ May 2009 ,  DR Foster Intelligence, London",
      "tech_str":"UI Development, Classic ASP (jscript), Sourcesafe, Flex, AS3, Css, HTML",
      "tech": [
        66,
        39,  
        7, 
        8, 
        4, 
        5],
      "position":"Frontend Developer",
      "company": 15,
      "description":[
          "_#Team leader_ within the UI Development team for all css, xhtml and javascript work across the company in general and specifically within the Product Development Department",
          "Covering most _#classic ASP_ (JScript) legacy work and bug fixes across the Tools (Dr Foster main Intelligence product), which were then ported to .NET",
          "Ensuring the UI Development team _#effective communication_ with the .NET Business Development team",
          "In charge of updates and development of Dr Foster public website: ",
          "Support on all web-related tasks for the Marketing and Marketing Services team",
          "Research and Development on new _#Data Presentation_ technologies, in particular Adobe Flex Builder based dashboards "
      ],
      "from": [10, 2007],
      "to": [5, 2009],
      "jobType": [1, 5]
    },
    {
      "uid": 1,
      "title":"Oct 2006 ­- Oct 2007,    Filmnight (Saffron Digital), London",
      "tech_str":"Classic ASP (vb script), Mysql, html, Css, Javascript, Perl, xml, Acionscript, ISS, svn",
      "tech": [
        1,
        2,
        4,
        5,
        39,
        3,
        67,
        68, 
        69,
        10
      ],
      "position":"Fullstack Developer",
      "company":16,
      "description":[
          "Working on new functionalities for white label sites and new components for the in-house _#xml Cms_",
          "Basic _#Perl_ automation and rss feeds work",
          "Weekly content updates of main and white label sites (filmnight.com, mirrorfilmstore.co.uk, empirefilmstore.com) through xml based _#proprietary cms_",
          "Acionscript (2.0) work for filmnight trailers player",
          "Development and maintenance of _#Ajax_ based applications for tracking web sites traffic (Trailer Tracker and Competitions Reporter)"
      ],
      "from": [10, 2006],
      "to": [10, 2007],
      "jobType": [1, 5]
    }
  ]
  
module.exports = jobs;