var currentLocation = window.location;

export const url =
  currentLocation.host == 'localhost:3000'
    ? 'http://localhost:7098'
    : 'https://capecloudsbackend.onrender.com';
