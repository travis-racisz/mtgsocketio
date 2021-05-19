// const { Client } = require('@elastic/elasticsearch')
// const elasticSearch = new Client({node: 'http://localhost:9200'})

// exports.info = function(socket, message, roomID){
//         elasticSearch.index({
//         index: 'log',
//         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//         type: "INFO", 
//         socket: socket,
//         message: message,
//         roomID: roomID
//     })
    
// }

// async function warn(socket, message, roomID){
//     await elasticSearch.index({
//         index: 'info',
//         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
//         type: "WARN", 
//         socket: socket,
//         message: message,
//         roomID: roomID
//     })
//     console.log("Warn")
// }
