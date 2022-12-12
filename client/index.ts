import { User, UserStatus } from "../proto/users_pb";
import getUser from "./get-users";
import createUsers from "./create-users";
import allUsers from "./all-users";
import allUser from "./all-users";

async function run() {
    const user = await getUser(1);
    console.log(user.toString());

    const jim = new User();
    jim.setName("Jim");
    jim.setAge(10);
    jim.setId(20);
    jim.setStatus(UserStatus.OFFLINE);
    createUsers([jim]);
    console.log(`\nCreate user ${jim.toString()}`);

    const users = await allUsers();
    console.log(`\nListing all ${users.length} users`);
    for(const user of users) {
        console.log(user.toString());
    }
}

run();