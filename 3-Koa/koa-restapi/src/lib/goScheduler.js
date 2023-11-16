const schedule = require('node-schedule');

const startScheduler = (cronExp, func) => {
    // cronExp：如 */5 * * * *
    // func：如 () => {}
    const job = schedule.scheduleJob(cronExp, func)
    return job
}

const stopScheduler = (job) => {
    job.cancel();
}

module.exports = {
    startScheduler, stopScheduler
}

