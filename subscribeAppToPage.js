const axios = require('axios');

const PAGE_ID = '2261129057296354';
const PAGE_ACCESS_TOKEN = 'EAAPgjUpPcZA0BOyreUmfbiYUHHl4d2PykVx8Oh91E9TqLLRWBqc3kQZC7YJVlyyUo5F21ETsPt6U5uCkv6GXvgJP75OJLRyZB36nytIfAZAhnNRzyjRUvNaf9Smsd5rRlEtDLjZCALiUCGZB40o57w3vjOd4C3ZAAindeZAvBAIUxiZBGp9LsHIK2KGZAZBvdLU9BgnxQF1DoAX';
const SUBSCRIBED_FIELDS = ['feed', 'messages']; // Add other fields as needed

const subscribeAppToPage = async () => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/${PAGE_ID}/subscribed_apps`,
      {},
      {
        params: {
          access_token: PAGE_ACCESS_TOKEN,
          subscribed_fields: SUBSCRIBED_FIELDS.join(',')
        }
      }
    );
    console.log('Subscription successful:', response.data);
  } catch (error) {
    console.error('Error subscribing app to page:', error.response ? error.response.data : error.message);
  }
};

subscribeAppToPage();
