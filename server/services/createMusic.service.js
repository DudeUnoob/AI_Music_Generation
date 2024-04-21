"use strict"

const axios = require("axios")
require("dotenv").config()

module.exports = {
    name: "createMusic",

    actions: {
        async createMusicFunction(ctx) {

            // const { prompt="drake beat", vibe="Hip-hop", duration=30 } = ctx.params

            // const response = await axios.post("https://www.veed.io/text-to-music-ap/api/text-to-music", {
            //     "prompt": prompt,
            //     "vibe": vibe,
            //     "duration": duration
            // }, {
            //     "Content-Type": "application/json"
            // })

            // console.log(response.headers["x-mubert-download-link"])
            // return { musicFile: response.headers["x-mubert-download-link"] }

            const { textInput = "Drums that sound like rain and thunder" } = ctx.params

            const response = await axios.post("https://aitestkitchen.withgoogle.com/api/trpc/musicFx.generateSound", {
                "json": {
                    "generationCount": 2,
                    "input": {
                        "textInput": "Drums that sound like rain and thunder"
                    },
                    "loop": false,
                    "seed": null,
                    "soundLengthSeconds": 31,
                    "model": "DEFAULT",
                    "clientContext": {
                        "tool": "MUSICLM_V2"
                    }
                },
                "meta": {
                    "values": {
                        "seed": [
                            "undefined"
                        ]
                    }
                }
            },

                {
                    "Content-Type": "application/json",
                    "Cookie": process.env.COOKIE
                }

            )


            console.log(response)


            return response.data
        }
    }
}