const application = require("../server/server")

const {  ServiceBroker } = require("moleculer")

const broker = new ServiceBroker({})

broker.createService(application)

broker.start().then(() => console.log("started"))