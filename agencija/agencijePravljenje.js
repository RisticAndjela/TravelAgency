// Assuming you have already initialized Firebase and obtained a reference to the database

// Fetch data from Firebase Realtime Database
firebase.database().ref('your-database-path').once('value')
  .then(snapshot => {
    const data = snapshot.val();
    
    // Iterate over the retrieved data
    Object.keys(data).forEach(key => {
      const item = data[key];
      
      // Create a new HTML file
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${item.title}</title>
        </head>
        <body>
          <h1>${item.title}</h1>
          <p>${item.description}</p>
        </body>
        </html>
      `;
      
      // Create a Blob from the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element for downloading the HTML file
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${item.title}.html`;
      downloadLink.innerText = `Download ${item.title}`;
      
      // Append the download link to the body or any desired container
      document.body.appendChild(downloadLink);
    });
  })
  .catch(error => {
    console.log(error);
  });
