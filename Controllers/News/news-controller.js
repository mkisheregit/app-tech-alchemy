const axios = require('axios');

const getNews = (req, res) => {
    let q = req.query.search;
    if (q) {
        url = `https://newsapi.org/v2/everything?q=${q}&apiKey=9f9ef2344ea745489e28acd703eb00a4`;
    } else {
        url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=9f9ef2344ea745489e28acd703eb00a4';
    }
    axios
        .get(
            url
        )
        .then((response) => {
            let data = [];
            response.data.articles.forEach(article => {
                data.push({
                    headline: article.title,
                    description: article.description,
                    source: article.url
                })
            })

            res.status(200).json({
                count: data.length,
                data: data
            });
        })
        .catch((error) => {
            res.status(404).json(error);
        });
};
module.exports = getNews;