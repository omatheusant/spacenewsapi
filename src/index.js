const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    express.json()
    next();
  })
const port = process.env.PORT || 3000;

const New = mongoose.model('New', {
    title: String,
    author: String,
    url: String,
    imageUrl: String
})

app.get("/", async (req, res) => {
    const news = await New.find()
    return res.send(news)
})

app.delete("/:id", async(req, res) => {
    const _new = await New.findByIdAndRemove(req.params.id)
    return res.send(_new)
})

app.put("/:id", async(req, res) => {
    const _new = await New.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        imageUrl: req.body.imageUrl
    }, {
        new: true
    })
    return res.send(_new)
})

app.post("/", async (req, res) => {
    const news = new New({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        imageUrl: req.body.imageUrl
    })
    await news.save()
    return res.send(news)
})

app.listen(port, "0.0.0.0", () => {
    mongoose.connect('mongodb+srv://matalvessantana:JeqdiiUv7JJQrfYh@spacenewsapi.6ubmmbv.mongodb.net/?retryWrites=true&w=majority')

    console.log('app is running')
})