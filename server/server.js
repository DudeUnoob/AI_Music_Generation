"use strict";

const { MoleculerError } = require("moleculer").Errors;
const bodyParser = require("body-parser");
const express = require("express");

module.exports = {
    name: "www",

    settings: {
        port: process.env.PORT || 3000,
        pageSize: 5
    },

    methods: {
        initRoutes(app) {
            
            app.post("/api/createMusic", this.createMusic);
            app.post("/api/testEndpoint", this.testCreateMusic)
            
        },

        async createMusic(req, res) {
            
            try {
                const result = await this.broker.call("createMusic.createMusicFunction", req.body);
                res.json(result);
            } catch (err) {
                console.error("Error calling createMusicFunction:", err);
                res.status(500).json({ error: "Internal Server Error" });
            }
        },

        async testCreateMusic(req, res) {
            try{
                const result = await this.broker.call("testCreateMusic.testCreateMusicFunction", req.body)

                res.json(result)
            }
            catch(err) {
            console.error("Error calling createTestMusicFunction:", err);
              res.status(500).json({ error: "Internal Server Error" });
            }
        }

    },

    created() {
        const app = express();

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }));
       
        this.initRoutes(app);
        this.app = app;
    },

    started() {
        this.app.listen(Number(this.settings.port), err => {
            if (err)
                return this.broker.fatal(err);

            this.logger.info(`WWW server started on port ${this.settings.port}`);
        });
    },

    stopped() {
        if (this.app.listening) {
            this.app.close(err => {
                if (err)
                    return this.logger.error("WWW server close error!", err);

                this.logger.info("WWW server stopped!");
            });
        }
    }
};

