var admin = require("firebase-admin");
const mtg = require('mtgsdk')

var serviceAccount = require("./mtgiov2-firebase-adminsdk-xdy7q-a512384743.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


// function dbCollection(keys, card, a, card_num_in_set){ 
//   // keys == list of set names 
//   // a == set we are on
//   // we need to know what card we are in for respective collection for this call 
//   db.collection('cards').doc(card.name).set({data: card})
//   .then(() => {
//     console.log(`were in set ${keys} a incremented a = ${a}`) 
//     if (keys.length == (card_num_in_set - 1 )){
//       collection_iterator++
//       // increment the set num and call itself
//     }
//   })
//   .catch(err => console.log(err))
  
// }

// function iterateSet(keys, a){ 
//   console.log('starting set', a)
//   
// }

/*
  json  
    - data  
     - collection_name: []cards_in_collection
      - card_in_collection
    {
      data: [
        {
          10E || "collection_name": [
            {
              name: name
            }
          ]
        }
      ]
    }
*/


// async function getCards(){ 
//   const cardRef = db.collection('card_collection');
//   const snapshot = await cardRef.orderBy("ab")
//     .startAt("ab")
//     .endAt("ab + '\uf8fff'")

//     .get();
//   if (snapshot.empty) {
//     console.log('No matching documents.');
//     return;
//   }  
  
//   snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());
//   });
// }

// getCards()

let counter = 394; 
let cardCounter = 0
function getMtgCardsByPage(){ 
  counter++
  mtg.card.where({page:counter, pageSize: 100})
  .then(cards => {
    if(!cards){ 
      return
    }
  //  const filtered = cards.filter(card => card.imageUrl ? card : "")
  //  if(filtered.length === 0){ 
  //   getMtgCardsByPage()
  //  }
    setTimeout(() => {uploadBatchToDB(cards, counter, cardCounter)}, 500)
    
  } 
    )
    .catch(err => console.error(err))
  

}

function uploadBatchToDB(card, counter, cardCounter){
  if(cardCounter === card.length - 1){
    cardCounter = 0 
    getMtgCardsByPage()
    return
}
  if(card[cardCounter]?.name.includes("/")){ card[cardCounter].name = card[cardCounter].name.replace(/[/]/g, "")}
    db.collection('card_list').doc(card[cardCounter].name).set(card[cardCounter])
        .then(() => {
          console.log("PAGE: ", counter, ": Upload Card-", card[cardCounter].name, "Card", cardCounter, "/", card.length)
          cardCounter++
          setTimeout(() => {uploadBatchToDB(card, counter, cardCounter)},500)
      })
        .catch(err => console.error(err))
}


getMtgCardsByPage()


// const collection_name = Object.keys(collection.data)
// let collection_iterator = 0 
// // let collection_length = collection.length
// let card_iterator = 0 

// // console.log(collection.data[collection_name[collection_iterator]].cards[0].name)


// dbCollection(collection.data[collection_name[collection_iterator]].cards[card_iterator], 0)
  
// function dbCollection(card, card_num_in_set){
  
//   const nums_cards_in_collection = collection.data[collection_name[collection_iterator]].cards.length
//   // console.log("Card # in set", card_num_in_set, "Set Length", nums_cards_in_collection)
  
//   if(nums_cards_in_collection === card_num_in_set){
//     console.log("Set Length", nums_cards_in_collection)

//     card_iterator = 0
//     collection_iterator++
//     console.log(collection_iterator)
//     console.log("Last Card in Collection. Onto next set", collection_name[collection_iterator])
//     if(collection_iterator === collection_name.length){ return console.log("Done Bitch!")}
//     // card_num_in_set = 0
//     setTimeout(() => {dbCollection(collection.data[collection_name[collection_iterator]].cards[card_iterator], 0)}, 100)
//   }


//   // console.log("Set: ", collection_name[collection_iterator] , "Card: ", collection.data[collection_name[collection_iterator]].cards[card_iterator]?.name, )
//   // console.log("Second Collection Size", collection.data[collection_name[collection_iterator]].cards.length)
  // if(card?.name.includes("/")){ card.name = card.name.replace(/[/]/g, "")}
  // if(card === undefined) {
  //   // console.log(collection.data[collection_name[1]].cards[0])
  //   return
  // } 
//   // console.log("Pre-upload. card:", card)


//   db.collection('cards_collection').doc(card.name).set(card).then(() => {
//     console.log(collection_name[collection_iterator], ": Upload Card-", collection.data[collection_name[collection_iterator]].cards[card_iterator].name, "Card", card_num_in_set, "/", nums_cards_in_collection)
//   }).catch(err => console.log(err))


//   card_iterator++
//   card_num_in_set++
//   setTimeout(() => {dbCollection(collection.data[collection_name[collection_iterator]].cards[card_iterator], card_iterator)}, 100)
  

// }

// function iterateSet(keys, a){ 
//   console.log('starting set', a)
//     json.data[keys[a]].cards.forEach((card) => { 
//       if(card.name.includes("/")){ 
//         card.name = card.name.replace(/[/]/g, "")
//          dbCollection(keys[a], card, a)
//           .then()
//       } else { 
//         dbCollection(keys[a], card, a) 
//       }
//     })
// }

// console.log(json.meta)

// console.log(keys.length)

// console.log(json.data['10E'].cards)
// let b = 0

// function recursion(){ 
//   if(b === keys.length){ 
//     console.log("break")
//     return
//   }

//   console.log(`b = ${b}`)
//   iterateSet(keys, b)
// }

// recursion()
// for(let a = 0; a < keys.length;) { 
//   iterateSet(keys, a)
//   console.log(`b = ${b}`)

// }

// console.log(cards)
// keys.forEach((card) => { 
//  console.log(json.data[card])
// })
