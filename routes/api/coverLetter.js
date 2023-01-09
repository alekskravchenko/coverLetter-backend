
const express = require('express')

const router = express.Router()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

require('dotenv').config()

/* router.get('/generate-cover-letterre', async (req, res) => {
  try {
    const jobDescription = req.query.jobDescription;
    const model = 'text-davinci-002';
    const prompt = `Write a cover letter for the following job: ${jobDescription}`;

    const response = await GPT3.createCompletion({ model, prompt });
    const coverLetter = response.data.choices[0].text;

    res.send(coverLetter);
  } catch (error) {
    res.status(500).send(error.message);
  }
}); */

router.get('/generate-cover-letter', async (req, res) => {
  
  // Make a request to the OpenAI ChatGPT API
  /* axios.post('https://api.openai.com/v1/completions', {
    prompt: prompt,
    model: 'text-davinci-003',
    api_key: process.env.OPENAI_API_KEY
  })
    .then(response => {
      // Extract the response from the API
      const { data } = response;

      // Send the response back to the client
      res.send(data.response);
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    }); */

    try {
      const jobDescription = req.query.jobDescription;
      const model = 'text-davinci-003';
      const prompt = `Write a cover letter for Upwork with for the following job: ${jobDescription}`;
  
      const response = await openai.createCompletion({
        model, 
        prompt,
        max_tokens: 1000,
        temperature: 0
      });

      const coverLetter = response.data;
  
      res.json(coverLetter);
    } catch (error) {
      res.status(500).send(error.message);
    }
});



module.exports = router