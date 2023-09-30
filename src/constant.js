var currentLocation = window.location;

export const url =
  currentLocation.host == 'localhost:3000' ? 'http://localhost:7098' : 'http://192.168.18.71:7098';
export const localurl =
  currentLocation.host == 'localhost:3000' ? 'http://localhost:3000' : 'https://capeclouds.com';
