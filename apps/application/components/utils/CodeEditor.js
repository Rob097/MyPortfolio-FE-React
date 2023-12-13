import Editor from "@monaco-editor/react";

const CodeEditor = ({ defaultValue }) => {

    /* function editorDidMount(editor, monaco) {
        setTimeout(function() {
          editor.getAction('editor.action.formatDocument').run();
        }, 300);
    } */

    return (
        <Editor
            className="me"
            options={{ readOnly: true }}
            theme="vs-light"
            defaultLanguage="javascript"
            defaultValue={defaultValue}
            // editorDidMount={editorDidMount.bind(this)}
        />
    )
}

export default CodeEditor;