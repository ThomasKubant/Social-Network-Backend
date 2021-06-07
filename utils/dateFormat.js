const moment = require('moment')
module.exports = (dateData) => {
    return moment(dateData).format("dddd, MMMM Do YYYY, h:mm:ss a")
}