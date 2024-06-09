import { isListingAvailable } from './data/listings';
import { getDatabaseTable } from './helpers';

export const getListingById = (id) => {
  const listings = getDatabaseTable('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  return listings.find((listing) => listing.id === id);
};

export const getListings = (params = {}) => {
  const { dates, guests, search } = params;

  const listings = getDatabaseTable('listings');
  if (!listings) {
    console.log('No listings table found');
    return;
  }

  let filteredListings = listings;

  if (dates) {
    filteredListings = filteredListings.filter((listing) =>
      isListingAvailable(listing, dates),
    );
  }

  if (guests) {
    filteredListings = filteredListings.filter(
      (listing) => guests <= listing.maxGuests,
    );
  }

  if (search) {
    filteredListings = filteredListings.filter((listing) =>
      listing.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return filteredListings;
};
