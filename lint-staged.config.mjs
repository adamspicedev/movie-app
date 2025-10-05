const config = {
  "*.{ts,tsx}": ["eslint --fix", () => "bun check-types", "prettier --write"],
  "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"],
};

export default config;
