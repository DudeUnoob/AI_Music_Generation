"use strict"

const axios = require("axios")

module.exports = {
    name: "createMusic",

    actions: {
        async createMusicFunction(ctx) {

            const { prompt="drake beat", vibe="Hip-hop", duration=30 } = ctx.params

            const response = await axios.post("https://www.veed.io/text-to-music-ap/api/text-to-music", {
                "prompt": prompt,
                "vibe": vibe,
                "duration": duration
            }, {
                "Content-Type": "application/json"
            })

            console.log(response.headers["x-mubert-download-link"])
            return { musicFile: response.headers["x-mubert-download-link"] }
        }
    }
}