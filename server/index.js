const application = require("../server/server")
const createMusicService = require("./services/createMusic.service.js");
const testCreateMusicService = require("./services/testCreateMusic.service.js")

const { ServiceBroker } = require("moleculer")

const broker = new ServiceBroker({})

broker.createService(application)
broker.createService(createMusicService);
broker.createService(testCreateMusicService)

broker.start().then(() => console.log("started"))