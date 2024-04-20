import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
    LinkBubbleMenu,
    MenuButton,
    RichTextEditor,
    RichTextReadOnly,
    TableBubbleMenu,
    insertImages
} from "mui-tiptap";
import { useCallback, useRef, useState } from "react";
import ShowIf from 'shared/components/ShowIf';
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

const MuiEditor = (props) => {
    const rteRef = useRef(null);
    const [isEditable, setIsEditable] = useState(true);
    const [showMenuBar, setShowMenuBar] = useState(true);
    const [submittedContent, setSubmittedContent] = useState("");

    const extensions = useExtensions({
        placeholder: "Add your own content here...",
    });

    const exampleContent =
        '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';

    const exampleContent3 =
        "<p>As a recent graduate of the University of Trento with a degree in Information Engineering and Business Organization, I have gained a strong foundation in computer science and a passion for developing scalable, reliable and efficient solutions for complex software projects. In addition to my studies, I also completed a three-month internship in Barcelona at an e-commerce company, where I gained hands-on experience in web marketing and e-commerce development. <br/> Since April 2023, I have been working as a Full Stack developer at Fleap, where I have been actively contributing to the development of simple and reliable software solutions for the company. In my career, I have had the opportunity to work with talented teams of developers and have developed a range of skills and expertise. <br/> Some of my key achievements include:<br/> 🚀 Successfully developed and launched an e-commerce platform for a family business<br/> 📈 Contributed to the development of various software projects, consistently meeting project deadlines and exceeding quality standards<br/> 💻 Demonstrated strong problem-solving and communication skills in a fast-paced, team-oriented environment<br/> 🙍 Developed many personal projects with new technologies and published on my personal GitHub portfolio with an important documentation.<br/> 📅 In the future, I am eager to continue learning and growing as a software engineer, and hope to take on more leadership roles and work on challenging and meaningful projects that make a positive impact.</p>";

    ////////////////// IMAGE FUNCTIONS - START //////////////////////////

    function fileListToImageFiles(fileList) {
        // You may want to use a package like attr-accept
        // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
        // types.
        return Array.from(fileList).filter((file) => {
            const mimeType = (file.type || "").toLowerCase();
            return mimeType.startsWith("image/");
        });
    }

    const handleNewImageFiles = useCallback(
        (files, insertPosition) => {

            if (!props.useComplete) {
                return;
            }

            if (!rteRef.current?.editor) {
                return;
            }

            // For the sake of a demo, we don't have a server to upload the files to,
            // so we'll instead convert each one to a local "temporary" object URL.
            // This will not persist properly in a production setting. You should
            // instead upload the image files to your server, or perhaps convert the
            // images to bas64 if you would like to encode the image data directly
            // into the editor content, though that can make the editor content very
            // large. You will probably want to use the same upload function here as
            // for the MenuButtonImageUpload `onUploadFiles` prop.
            const attributesForImageFiles = files.map((file) => ({
                src: URL.createObjectURL(file),
                alt: file.name,
            }));

            insertImages({
                images: attributesForImageFiles,
                editor: rteRef.current.editor,
                insertPosition,
            });
        },
        [],
    );

    const handleDrop = useCallback(
        (view, event, _slice, _moved) => {

            if (!props.useComplete) {
                return false;
            }

            if (!(event instanceof DragEvent) || !event.dataTransfer) {
                return false;
            }

            const imageFiles = fileListToImageFiles(event.dataTransfer.files);
            if (imageFiles.length > 0) {
                const insertPosition = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                })?.pos;

                handleNewImageFiles(imageFiles, insertPosition);

                // Return true to treat the event as handled. We call preventDefault
                // ourselves for good measure.
                event.preventDefault();
                return true;
            }

            return false;
        },
        [handleNewImageFiles],
    );

    const handlePaste = useCallback(
        (_view, event, _slice) => {

            if (!props.useComplete) {
                return false;
            }

            if (!event.clipboardData) {
                return false;
            }

            const pastedImageFiles = fileListToImageFiles(
                event.clipboardData.files,
            );
            if (pastedImageFiles.length > 0) {
                handleNewImageFiles(pastedImageFiles);
                // Return true to mark the paste event as handled. This can for
                // instance prevent redundant copies of the same image showing up,
                // like if you right-click and copy an image from within the editor
                // (in which case it will be added to the clipboard both as a file and
                // as HTML, which Tiptap would otherwise separately parse.)
                return true;
            }

            // We return false here to allow the standard paste-handler to run.
            return false;
        },
        [handleNewImageFiles],
    );

    ////////////////// IMAGE FUNCTIONS - END //////////////////////////

    function handleSave(data) {
        setSubmittedContent(data);
        if (props.handleSave) {
            props.handleSave(data);
        }
    }

    return (
        <div>
            <RichTextEditor
                ref={rteRef}
                extensions={extensions} // Or any Tiptap extensions you wish!
                content={props.existingText} // Initial content for the editor
                // Optionally include `renderControls` for a menu-bar atop the editor:
                editable={isEditable}
                editorProps={{
                    handleDrop: handleDrop,
                    handlePaste: handlePaste,
                }}
                renderControls={() => <EditorMenuControls useComplete={props.useComplete} />}
                RichTextFieldProps={{
                    // The "outlined" variant is the default (shown here only as
                    // example), but can be changed to "standard" to remove the outlined
                    // field border from the editor
                    variant: "outlined",
                    MenuBarProps: {
                        hide: !showMenuBar,
                    },
                    // Below is an example of adding a toggle within the outlined field
                    // for showing/hiding the editor menu bar, and a "submit" button for
                    // saving/viewing the HTML content
                    footer: (
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                borderTopStyle: "solid",
                                borderTopWidth: 1,
                                borderTopColor: (theme) => theme.palette.divider,
                                py: 1,
                                px: 1.5,
                            }}
                        >
                            <MenuButton
                                value="formatting"
                                tooltipLabel={
                                    showMenuBar ? "Hide formatting" : "Show formatting"
                                }
                                size="small"
                                onClick={() =>
                                    setShowMenuBar((currentState) => !currentState)
                                }
                                selected={showMenuBar}
                                IconComponent={TextFields}
                            />

                            <MenuButton
                                value="formatting"
                                tooltipLabel={
                                    isEditable
                                        ? "Prevent edits (use read-only mode)"
                                        : "Allow edits"
                                }
                                size="small"
                                onClick={() => setIsEditable((currentState) => !currentState)}
                                selected={!isEditable}
                                IconComponent={isEditable ? Lock : LockOpen}
                            />

                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    handleSave(
                                        rteRef.current?.editor?.getHTML() ?? "",
                                    );
                                }}
                            >
                                Save
                            </Button>
                        </Stack>
                    ),
                }}
            >
                {() => (
                    <>
                        <LinkBubbleMenu />
                        <TableBubbleMenu />
                    </>
                )}
            </RichTextEditor>

            <ShowIf condition={props.showPreview === true}>
                {submittedContent ? (
                    <>
                        <pre style={{ marginTop: 10, overflow: "auto", maxWidth: "100%" }}>
                            <code>{submittedContent}</code>
                        </pre>

                        <Box mt={3}>
                            <Typography variant="overline" sx={{ mb: 2 }}>
                                Read-only saved snapshot:
                            </Typography>

                            <RichTextReadOnly
                                content={submittedContent}
                                extensions={extensions}
                            />
                        </Box>
                    </>
                ) : (
                    <>
                        Press “Save” above to show the HTML markup for the editor content.
                        Typically you'd use a similar <code>editor.getHTML()</code> approach
                        to save your data in a form.
                    </>
                )}
            </ShowIf>
        </div>
    );
}

export default MuiEditor;