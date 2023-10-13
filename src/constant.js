var currentLocation = window.location;

export const url =
  currentLocation.host == 'localhost:3000'
    ? 'http://localhost:7098'
    : 'https://backend-five-nu.vercel.app';
export const localurl =
  currentLocation.host == 'localhost:3000' ? 'http://localhost:3000' : 'https://capeclouds.com';
