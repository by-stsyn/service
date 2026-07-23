const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZuIxRNJwvEDA-FmBDWZ8yxAYSm2TgDDRcK0H3cnY5IxkehLF0DYe8C-mUlZ5KNqMQPpKq05Fwffhw/pub?gid=667206035&single=true&output=csv';
fetch(url)
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);
