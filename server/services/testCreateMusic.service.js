"use strict"

const axios = require("axios")


module.exports = {
    name: "testCreateMusic",

    actions: {
        async testCreateMusicFunction(ctx) {

            let { prompt, vibe } = ctx.params 

            if(prompt == "" || prompt == null){
                prompt = "drake beat"
            }

            if(vibe == "" || vibe == null){
                vibe = "Hip-hop"
            }

            const response = await axios.post("https://www.veed.io/text-to-music-ap/api/text-to-music", {
                "prompt": prompt,
                "vibe": vibe,
                "duration": 30
            }, {
                "Content-Type": "application/json"
            })

            console.log(response.headers["x-mubert-download-link"])
            return { musicFile: response.headers["x-mubert-download-link"] }
        }
    }
}