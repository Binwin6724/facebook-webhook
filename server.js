const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

// Your verify token and page access token
const VERIFY_TOKEN = 'thISisasampleVerifyToken';
const PAGE_ACCESS_TOKEN = 'EAAPgjUpPcZA0BO8et1MHuiaDKwZBOlZCrS2qAODKWkbUzvZCXcpAbLTWuABSLMeElkFPQ4KdzhBVZBx9iuEDy3nhSg9nXVuREZCZC0ZBZBrHqizBoQJSWohjun3h8a1ZC5mjZAZCaTlVQA0R4fHZBxHxfFURy4mrxGbiDfG2ufLZADw6W28sSmhnXaJxWuUFqSJx4cnYfOqA5PnLgZD';

// Verification endpoint
app.get('/webhook', (req, res) => {
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Endpoint to handle webhook events
app.post('/webhook', (req, res) => {
  let body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(async function(entry) {
      let pageID = entry.id;
      let timeOfEvent = entry.time;

      entry.changes.forEach(async function(change) {
        if (change.field === 'feed' && change.value.item === 'post') {
          let postID = change.value.post_id;
          console.log('New post added:', postID);

          // Fetch likes for the new post
          try {
            let response = await axios.get(`https://graph.facebook.com/v12.0/${postID}/likes`, {
              params: {
                access_token: PAGE_ACCESS_TOKEN
              }
            });
            console.log('Likes information:', response.data);
          } catch (error) {
            console.error('Error fetching likes:', error.response ? error.response.data : error.message);
          }
        }
      });
    });

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
