let getUsers = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/users.json`, options)
       const json = await response.json();
       console.log("json")
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let users = await getUsers()
console.log("users")
console.log(users)

export default () => /*html*/`
    <h1>About</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
`;