"use strict"

const axios = require("axios")


module.exports = {
    name: "testCreateMusic",

    actions: {
        async testCreateMusicFunction(ctx) {

            const response = await axios.post("https://www.veed.io/text-to-music-ap/api/text-to-music", {
                "prompt": "drake beat",
                "vibe": "Hip-hop",
                "duration": 30
            }, {
                "Content-Type": "application/json"
            })

            console.log(response.headers["x-mubert-download-link"])
            return { musicFile: response.headers["x-mubert-download-link"] }
        }
    }
}