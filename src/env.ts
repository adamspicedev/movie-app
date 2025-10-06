import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  runtimeEnv: import.meta.env,
  server: {},

  client: {
    VITE_TMDB_API_KEY: z.string().min(1),
    VITE_APPWRITE_PROJECT_ID: z.string().min(1),
    VITE_APPWRITE_PROJECT_NAME: z.string().min(1),
    VITE_APPWRITE_ENDPOINT: z.string().min(1),
    VITE_APPWRITE_DATABASE_ID: z.string().min(1),
    VITE_APPWRITE_TABLE_ID: z.string().min(1),
  },

  emptyStringAsUndefined: true,
});
