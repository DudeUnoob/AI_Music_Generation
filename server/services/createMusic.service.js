const axios = require("axios");
require("dotenv").config();

module.exports = {
    name: "createMusic",

    actions: {
        async createMusicFunction(ctx) {
            let { textInput } = ctx.params;

            if(textInput == "" || textInput == null) {
                textInput = "A jazz style light"
            }

            const body = {
                "json": {
                    "generationCount": 2,
                    "input": {
                        "textInput": textInput
                    },
                    "loop": false,
                    "seed": null,
                    "soundLengthSeconds": 31,
                    "model": "DEFAULT",
                    "clientContext": {
                        "tool": "MUSICLM_V2",
                    }
                },
                "meta": {
                    "values": {
                        "seed": [
                            "undefined"
                        ]
                    }
                }
            };
            
            try {
                const response = await axios.post(
                    "https://aitestkitchen.withgoogle.com/api/trpc/musicFx.generateSound",
                    body,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "User-Agent": "Insomnia/2023.5.7",
                            "Cookie": process.env.COOKIE
                        }
                    }
                );
                
                const base64Audio = response?.data?.result?.data?.json?.result?.sounds[0]?.data;
                const dataURI = `data:audio/mp3;base64,${base64Audio}`;
                
                
                response.data.result.data.json.result.sounds[0].data = dataURI;

                return response.data;
            } catch (error) {
                console.error("Error occurred:", error);
                return { error: error.message };
            }
        }
    }
};
