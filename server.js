require('@babel/register')({
    ignore: [/node_modules/], 
    presets: ['@babel/preset-env', '@babel/preset-react'],
  });
  
  const express = require('express');
  const React = require('react');
  const ReactDOMServer = require('react-dom/server');
  const path = require('path');
  const fs = require('fs');
  const App = require('./src/App').default; // Import your React component
  
  // Set up Express for SSR
  const app = express();
  
  // Serve static assets from build folder (generated by `npm run build`)
  app.use(express.static(path.resolve(__dirname, 'build')));
  
  // Handle all requests and render the app using React Server-Side Rendering
  app.get('*', (req, res) => {
    const indexFile = path.resolve(__dirname, 'build', 'index.html');
    
    fs.readFile(indexFile, 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).send('Some error happened!');
      }
  
      // Render the React app and inject it into the HTML template
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
        )
      );
    });
  });
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`SSR app running at http://localhost:${PORT}`);
  });
