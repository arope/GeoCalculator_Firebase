import * as firebase from "firebase";
import "firebase/database";
import { firebaseConfig } from "./fb-credentials";

export function initRemindersDB() {
  firebase.initializeApp(firebaseConfig);
}

export function storeGeocalcItem(item) {
  firebase.database().ref("GeocalcData/").push(item);
}

export function setupDataListener(updateFunc) {
  firebase
    .database()
    .ref(`GeocalcData/`)
    .on("value", (snapshot) => {
      //  console.log("data listener fires up with: ", snapshot);
      if (snapshot?.val()) {
        const fbObject = snapshot.val();
        const newArr = [];
        Object.keys(fbObject).map((key, index) => {
          //    console.log(key, "||", index, "||", fbObject[key]["vals"]);
          newArr.push({
            val: fbObject[key]["vals"],
            id: key,
            timeStamp: fbObject[key]["timeStamp"],
          });
        });
        //  console.log(newArr);
        updateFunc(newArr);
      } else {
        updateFunc([]);
      }
    });
}

// export function setupReminderListener(updateFunc) {
//     console.log("setupReminderListener called");
//     firebase
//       .database()
//       .ref("reminderData/")
//       .on("value", (snapshot) => {
//         console.log("setupReminderListener fires up with: ", snapshot);
//         if (snapshot?.val()) {
//           const fbObject = snapshot.val();
//           const newArr = [];
//           Object.keys(fbObject).map((key, index) => {
//             console.log(key, "||", index, "||", fbObject[key]);
//             newArr.push({ ...fbObject[key], id: key });
//           });
//           updateFunc(newArr);
//         } else {
//           updateFunc([]);
//         }
//       });
//   }
