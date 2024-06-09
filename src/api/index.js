import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

import { env } from '@/lib/env';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  withAuth,
} from './helpers';
import { getListingById, getListings } from './listings';
import { getLocationById } from './locations';
import { getUser } from './users';

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

    return [
      200,
      {
        accessToken: env.USE_AUTH ? accessToken : null,
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

  const accessToken = await generateAccessToken(refreshToken);

  return [200, env.USE_AUTH ? { accessToken } : null];
});

adapter.onPost('/api/signout').reply(
  withAuth(() => {
    Cookies.remove('refreshToken');

    return [200];
  }),
);

export default api;
