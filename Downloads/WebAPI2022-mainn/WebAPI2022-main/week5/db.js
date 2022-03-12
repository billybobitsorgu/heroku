var mongoose = require('mongoose')
var debug = require('debug')('demo')
var dbURI = 'mongodb://localhost:27017/Reviews'

if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI
}

mongoose.connect(dbURI,{
    useNewURLParser:true,
    useUnifiedTopology:true
})

mongoose.Promise = Promise

mongoose.connection.on('connected', function(){
    debug('Connected to ' + dbURI)
})

mongoose.connection.on('error', function(err){
    debug('Connected to ' + err)
    process.exit(0)
})

mongoose.connection.on('disconnected', function(){
    debug('Mongoose Disconnected ')
})

process.on('exit', function(code){
    debug('About to exit with code ', code)
})