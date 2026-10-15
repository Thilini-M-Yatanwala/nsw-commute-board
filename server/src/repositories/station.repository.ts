import { stations } from '../data/seed';
import type { Station } from '../models/station.model';

export const stationRepository = {
  async findAll(search: string): Promise<Station[]> {
    const term = search.trim().toLowerCase();
    return stations.filter((s) => s.name.toLowerCase().includes(term));
  },

  async findById(id: string): Promise<Station | undefined> {
    return stations.find((s) => s.id === id);
  },
};

// The same repository with PostgreSQL

// async findById(id: string): Promise<Station | undefined> {
//   const result = await db.query('SELECT * FROM stations WHERE id = $1', [id])   // waits for the database
//   return result.rows[0]
// }
