import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { User, UserRequest } from "../proto/users_pb";
import { client } from "./utils";

export default function allUser() {
    return new Promise<User[]>((resolve, reject) => {
        const stream = client.getUsers(new Empty());
        const users: User[] = [];
        stream.on("data", (user) => users.push(user));
        stream.on("error", reject);
        stream.on("end", () => resolve(users));
    });
}