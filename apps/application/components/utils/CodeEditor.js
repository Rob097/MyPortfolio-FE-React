import Editor from "@monaco-editor/react";
import ShowIf from "./showIf";

const CodeEditor = ({ value, language }) => {

    function editorDidMount(editor) {
        editor.getAction('editor.action.formatDocument').run();
    }

    return (
        <ShowIf condition={value !== undefined && value != null}>
            <Editor
                className="me"
                options={{
                    readOnly: true,
                    automaticLayout: true,
                    autoIndent: true,
                    language: language ?? "javascript"
                }}
                theme="vs-light"
                defaultLanguage={language ?? "javascript"}
                value={value}
                editorDidMount={editorDidMount.bind(this)}
                wrapperProps={{ style: { marginTop: '1.5rem' } }}
            />
        </ShowIf>
    )
}

export default CodeEditor;