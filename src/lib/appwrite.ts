import { Client, ID, Query, TablesDB } from "appwrite";

import { env } from "../env";
import type { TMDBMovie } from "../types";

const ENDPOINT = env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = env.VITE_APPWRITE_TABLE_ID;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (
  searchTerm: string,
  movie: TMDBMovie
) => {
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", searchTerm)],
    });

    // 2. If it does, update the count
    if (result.rows.length > 0) {
      const row = result.rows[0];

      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: row.$id,
        data: {
          count: row.count + 1,
        },
        // eslint-disable-next-line quotes
        permissions: ['read("any")'],
      });
      // 3. If it doesn't, create a new document with the search term and count as 1
    } else {
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
        // eslint-disable-next-line quotes
        permissions: ['read("any")'],
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    return result.rows;
  } catch (error) {
    console.error(error);
  }
};
