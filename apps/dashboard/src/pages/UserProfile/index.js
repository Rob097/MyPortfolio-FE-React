import { Criteria, Operation, View } from "shared/utilities/criteria";
import React, { useRef } from 'react';
import { UserQ } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import Header from "./header";

const UserProfile = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    /*const userService = new UserService();
    userService.getByCriteria(
        new UserQ(
            [
                new Criteria(UserQ.id, Operation.equals, 1),
                new Criteria(UserQ.age, Operation.lessThan, 65)
            ],
            View.verbose,
            0,
            10,
            undefined
        )
    ).then(response => console.log("OK: %O", response)
    ).catch(error => console.log("KO: %O", error));*/

    return (
        <>
            <Header />
            <button onClick={log}>Log editor content</button>
        </>
    )
}

export default UserProfile;