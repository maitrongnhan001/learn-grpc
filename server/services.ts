import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import {
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
  ServerWritableStream,
  ServerReadableStream,
} from "grpc";

import { IUsersServer } from "../proto/users_grpc_pb";
import { User, UserRequest } from "../proto/users_pb";
import { users } from "./db";

export class UsersServer implements IUsersServer {
    getUser(call: ServerUnaryCall<UserRequest>, callback: sendUnaryData<User>) {
        const userId = call.request.getId();
        const user = users.find((u) => u.getId() === userId);
        if (!user) {
            const err: ServiceError = {
                name: 'User missing',
                message: `User with ID ${userId} does not exit.`
            };
            callback(err, null);
        }

        console.log(`getUser: returning ${user?.getName()} (id: ${user?.getId()}).`);
        callback(null, user as User);
    }

    async getUsers(call: ServerWritableStream<Empty>) {
        console.log('getUsers: streaming all users.');
        for (const user of users) {
            await setTimeout(() => {console.log('loading data ...')}, 5000);
            call.write(user);
        };
        call.end();
    }

    createUser(
        call: ServerReadableStream<Empty>,
        callback: sendUnaryData<Empty>
    ) {
        console.log(`createUsers: creating new users from stream.`);
        
        let userCount = 0;

        call.on("data", (u) => {
            userCount ++;
            users.push(u);
        });

        call.on("end", () => {
            callback(null, new Empty());
        });
    }
}
