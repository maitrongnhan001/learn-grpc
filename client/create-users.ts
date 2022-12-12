import { User, UserRequest } from "../proto/users_pb";
import { client, noop } from "./utils";

export default function createNewUser(users: User[]) {
    const stream = client.createUser(noop);
    for(const user of users) {
        stream.write(user);
    }
    stream.end();
}