import fs from "fs/promises";

console.time("benchmark");

const users = [];
const usersId = {};
(async()=> {
const files = await fs.readdir("./LEADS");
for (let file of files) {
  const fc = await fs.readFile(`./LEADS/${file}`, "utf8");
  const lines = fc.split("\r\n");
  for (let line of lines) {
    let [id, fullName, email] = line.split(",");
    if (!(id in usersId)) {
      fullName = fullName.slice(1, -1);
      const user = {
        id,
        fullName,
        email,
      };
      users.push(user);
      usersId[id] = 0;
    }
  }
  await fs.writeFile("./users.json", JSON.stringify(users, null, 2));
}
console.log(`number of users: ${users.length}`);
})();
console.timeEnd("benchmark");

// import fs from "fs/promises";

// console.time('benchmark');

// const users = [];
// const usersId = {};

// fs.readdir("./LEADS")
//   .then(files => {
//     const fc = files.map((file) => {
//       return fs.readFile(`./LEADS/${file}`)
//     })
//     Promise.all(fc)
//       .then((mapArr) => {
//         const merged = mapArr.join("\r\n")
//         const lines = merged.split("\r\n")
//         for(let line of lines){
//           let [id, fullName, email] = line.split(",");
//           if(!(id in usersId)){
//             fullName = fullName.slice(1, -1);
//             const user = {
//               id,
//               fullName,
//               email
//             }
//           users.push(user);
//           usersId[id] = 0;
//           }
//         }
//         console.log(`number of users: ${users.length}`);
//         return fs.writeFile("./users.json", JSON.stringify(users, null, 2));
//       })
//   })
//   console.timeEnd("benchmark");
