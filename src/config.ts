interface Env {
  API_URL?: string;
}

export interface Config {
  API_URL: URL;
}

const getConfig = (): Env => {
  return {
    API_URL: import.meta.env.VITE_API_URL,
  };
};

const getSanitizedConfig = (config: Env): Config => {
  // Check that required envs are provided
  Object.entries(config).forEach(([k, v]) => {
    if (v === undefined) throw new Error(`Missing key ${k} in env.`);
  });
  console.log(config);

  return {
    API_URL: new URL(config.API_URL!),
  };
};

export const config = getSanitizedConfig(getConfig());
