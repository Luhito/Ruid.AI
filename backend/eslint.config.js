// eslint.config.js
export default [
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/repositories/internal/*"],
              message: "repositoriesからimportしてください"
            },
            {
              group: ["@/services/internal/*"],
              message: "servicesからimportしてください"
            }
          ]
        }
      ]
    }
  }
];