"use strict";

const os = require("os");

module.exports = {

	nodeID: (process.env.NODEID ? process.env.NODEID + "-" : "") + os.hostname().toLowerCase(),
	metrics: false,
	cacher: true,
	tracing: {
		enabled: true,
		exporter: {
			type: "Console", 
			options: {
				logger: null,

				colors: true,

				width: 100,
	
				gaugeWidth: 40
			}
		}
	},

	errorHandler(err, info) {
		this.logger.warn("Log the error:", err);
		throw err; // Throw further
	}
};