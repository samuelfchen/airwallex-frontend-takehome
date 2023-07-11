interface Env {
  API_URL?: string;
}

export interface Config {
  API_URL: URL;
}

/**
 * Parse raw environment variables from env
 */
const getConfig = (): Env => {
  return {
    API_URL: import.meta.env.VITE_API_URL,
  };
};

/**
 * Sanitizes environment variables.
 *
 * @param config raw environment vars
 */
export const getSanitizedConfig = (config: Env): Config => {
  // Check that required envs are provided
  Object.entries(config).forEach(([k, v]) => {
    if (v === undefined) throw new Error(`Missing key ${k} in env.`);
  });

  return {
    API_URL: new URL(config.API_URL!), // will throw an error if invalid URL
  };
};

export const config = getSanitizedConfig(getConfig());
