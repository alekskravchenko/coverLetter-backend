
const express = require('express')

const router = express.Router()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

require('dotenv').config()

router.get('/generate-cover-letter', async (req, res) => {

    try {
      const jobDescription = req.query.jobDescription;
      const model = 'text-davinci-003';
      const prompt = `Write a cover letter for Upwork with for the following job: ${jobDescription}`;
  
      const response = await openai.createCompletion({
        model, 
        prompt,
        max_tokens: 4000,
        temperature: 0
      });

      const coverLetter = response.data.choices[0].text;
  
      res.send(coverLetter);
    } catch (error) {
      res.status(500).send(error.message);
    }
});



module.exports = router