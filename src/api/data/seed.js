import { env } from '@/lib/env';
import { getItem, setItem } from '@/lib/utils/localStorage';

import { listings } from './listings';
import { locations } from './locations';
import { reviews } from './reviews';
import { users } from './users';

export const seedLocalDatabase = () => {
  const database = getItem(env.DB_KEY);

  if (database) {
    return;
  }

  const initialDatabase = {
    listings,
    locations,
    users,
    reviews,
  };

  setItem(env.DB_KEY, initialDatabase);
};
