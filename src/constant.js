var currentLocation = window.location;

export const url =
  currentLocation.host == 'localhost:3000' ? 'http://localhost:7098' : 'https://main--teal-cobbler-35a2bb.netlify.app';
export const localurl =
  currentLocation.host == 'localhost:3000' ? 'http://localhost:3000' : 'https://capeclouds.com';
