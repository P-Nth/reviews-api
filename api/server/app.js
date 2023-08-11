import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import reviews from "./data/reviews.js";
import getSearcheSuggestions from './data/searches.js';
import serviceproviders from './data/serviceprovider.js';
import physicalservices from './data/physicalservice.js';

const server = express();

server.use(bodyParser.json());
server.use(cors ({
    origin: 'http://localhost:3000'
}))

// gets
server.get('/api/searchesuggestions', (req, res) => {
    const suggestions = getSearcheSuggestions(10);
    res.send(suggestions);
});

server.get('/api/physicalservices', (req, res) => {
    res.send(physicalservices)
})

server.get('/api/serviceproviders/:providerId', (req, res) => {
    const { providerId } = req.params;

    // Filter the sps array by provider ID
    const serviceProvider = serviceproviders.filter((provider) => provider._spid === providerId);
    
    // Return the filtered sps as JSON
    res.send(serviceProvider)
})

server.get('/api/reviews/:serviceId', (req, res) => {
    const { serviceId } = req.params;

    // Filter the reviews array by service ID
    const serviceReviews = reviews.filter((review) => review._sid === serviceId);
    
    // Return the filtered reviews as JSON
    res.send(serviceReviews)
})

// updates
server.put('/api/reviews/:reviewId', (req, res) => {
    const { reviewId } = req.params;
    const { likes, dislikes } = req.body;
  
    // Find the review with the matching ID
    const review = reviews.find((review) => review._rid === reviewId);
  
    if (review) {
      // Update the likes and dislikes
      review.likes = likes;
      review.dislikes = dislikes;
  
      // Return the updated review as JSON
      res.json(review);
      console.log(review.likes, review.dislikes, likes, dislikes);
    } else {
      // Review not found
      res.status(404).json({ error: 'Review not found' });
    }
});
  
  

server.get('/api', (req, res) => {
    res.send("Server ready for development")
})


const PORT = process.env.PORT || 4000;

server.listen(PORT, console.log(`Server listening on port http://localhost:${PORT}`));