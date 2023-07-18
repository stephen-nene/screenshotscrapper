const errors = (res) => {
    const htmlContent = `
    <html>
    <head>
      <title>Error route</title>
    </head>
    <body>
    <h1>Error 404</h1>
      <h1>No root matches this route </h1>
    </body>
  </html>
    `;
    res.send(htmlContent)

}

module.exports = {errors};