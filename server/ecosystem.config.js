module.exports = {
  apps: [
    {
      name: "Homematch Server",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
