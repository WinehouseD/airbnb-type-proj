import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

import { env } from '@/lib/env';

import {
  cleanUser,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  withAuth,
} from './helpers';
import { createListing, getListingById, getListings } from './listings';
import { getLocationById } from './locations';
import { getReviewsByListingId } from './reviews';
import { getUser, getUserById } from './users';

const api = axios.create({
  baseURL: env.BASE_URL,
});

const adapter = new MockAdapter(api, { delayResponse: 500 });

adapter.onGet(/\/api\/listings\/\d+/).reply(
  withAuth(async (config) => {
    const id = parseInt(config.url.match(/\/api\/listings\/(\d+)/)[1]);

    const listing = getListingById(id);
    if (!listing) {
      return [404, { message: 'Listing not found' }];
    }

    const location = getLocationById(listing.locationId);
    if (!location) {
      return [404, { message: 'Location not found' }];
    }

    return [200, { ...listing, location }];
  }),
);

adapter.onGet('/api/listings').reply(
  withAuth(async (config) => {
    const { params } = config;

    const listings = getListings(params);

    const domainListings = listings.map((listing) => {
      const location = getLocationById(listing.locationId);
      return { ...listing, location };
    });

    return [200, domainListings];
  }),
);

adapter.onPost('/api/listings').reply(
  withAuth(async (config) => {
    const { data } = config;

    const listing = createListing(JSON.parse(data));

    return [200, listing];
  }),
);

adapter.onGet('/api/reviews').reply(
  withAuth(async (config) => {
    const { params } = config;

    const reviews = getReviewsByListingId(params.listingId);

    return [200, reviews];
  }),
);

adapter.onGet('/api/me').reply(
  withAuth(async (config) => {
    const accessToken = config.headers.Authorization?.split(' ')[1];

    const accessTokenPayload = await verifyToken(accessToken, {
      returnPayload: true,
    });

    if (!accessTokenPayload) {
      return [403, { message: 'Unauthorized' }];
    }

    const refreshTokenPayload = await verifyToken(accessTokenPayload.data, {
      returnPayload: true,
    });

    if (!refreshTokenPayload) {
      return [403, { message: 'Unauthorized' }];
    }

    const user = getUserById(refreshTokenPayload.data);

    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
        user: env.USE_AUTH ? cleanUser(user) : null,
      },
    ];
  }),
);

adapter.onPost('/api/signin').reply(async (config) => {
  const { data } = config;
  const user = getUser(JSON.parse(data));

  if (user) {
    const refreshToken = await generateRefreshToken(user.id);

    Cookies.set('refreshToken', refreshToken);

    const accessToken = await generateAccessToken(refreshToken);

    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
        user: env.USE_AUTH ? cleanUser(user) : null,
      },
    ];
  } else {
    return [401, { message: 'Invalid credentials' }];
  }
});

adapter.onGet('/api/refreshToken').reply(async () => {
  const refreshToken = Cookies.get('refreshToken');

  const refreshTokenPayload = refreshToken
    ? await verifyToken(refreshToken, { returnPayload: true })
    : false;

  if (env.USE_AUTH && !refreshTokenPayload) {
    return [403, { message: 'Invalid refresh token' }];
  }

  const user = getUserById(refreshTokenPayload.data);

  const accessToken = await generateAccessToken(refreshToken);

  return [200, env.USE_AUTH ? { accessToken, user: cleanUser(user) } : null];
});

adapter.onPost('/api/signout').reply(
  withAuth(() => {
    Cookies.remove('refreshToken');

    return [200];
  }),
);

export default api;
