import { Criteria, Operation, View } from "@rob097/common-lib/criteria.model";
import React, { useRef } from 'react';
import TinyEditorComponent from "../../components/TinyEditorComponent";
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

            <TinyEditorComponent
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    )
}

export default UserProfile;