import Papa from 'papaparse';
import fetch from 'node-fetch';

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZuIxRNJwvEDA-FmBDWZ8yxAYSm2TgDDRcK0H3cnY5IxkehLF0DYe8C-mUlZ5KNqMQPpKq05Fwffhw/pub?gid=667206035&single=true&output=csv&cb=' + Date.now();

fetch(url)
  .then(res => res.text())
  .then(csv => {
    const results = Papa.parse(csv, { 
      header: true, 
      skipEmptyLines: true,
      transformHeader: (h) => h.toLowerCase().trim() 
    });
    const categories = new Set();
    results.data.forEach(row => {
      let cat = row['категория'];
      if (cat) {
        categories.add(cat.trim());
      }
    });
    console.log(Array.from(categories).join('\n'));
  });
