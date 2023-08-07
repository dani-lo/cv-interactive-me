module.exports = {
    apps: [
      {
        name: "deno-app",
        script: "./main.ts",
        interpreter: "deno",
        interpreterArgs: "run --allow-net --allow-read --allow-env",
      },
    ],
};