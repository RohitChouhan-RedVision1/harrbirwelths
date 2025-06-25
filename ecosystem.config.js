module.exports = {
  apps: [
    {
      name: "ethicuswealth", // Name of the application
      script: "npm", // Using npm to run the app
      args: "start", // Start command for the app
      cwd: "/rvdata/ethicuswealth", // The project directory (path to your Next.js app)
      env: {
        NODE_ENV: "production", // Default environment variables
        PORT: 3026,
      },
      env_file: "/rvdata/env-files/ethicuswealth.env", // Path to the custom .env file
    },
  ],
};