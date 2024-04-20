"use strict";

const { MoleculerError } = require("moleculer").Errors;
const express = require("express");

module.exports = {
    name: "www",

    settings: {
        port: process.env.PORT || 3000,
        pageSize: 5
    },

    methods: {
        initRoutes(app) {
            
            app.get("/api/createMusic", this.createMusic);
            
        },

        async createMusic(req, res) {
            try {
              const result = await this.broker.call("createMusic.createMusicFunction");
               res.json(result);
            } catch (err) {
              console.error("Error calling createMusicFunction:", err);
              res.status(500).json({ error: "Internal Server Error" });
            }
        },

    },

    created() {
        const app = express();

       
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

