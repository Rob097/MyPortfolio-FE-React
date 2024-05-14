import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { debounce } from '@mui/material/utils';
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
import classes from './MuiEditor.module.scss';

const MuiEditor = (props) => {
    const rteRef = useRef(null);
    const [isEditable, setIsEditable] = useState(true);
    const [showMenuBar, setShowMenuBar] = useState(true);
    const [submittedContent, setSubmittedContent] = useState("");

    const extensions = useExtensions({
        placeholder: "Add your own content here...",
    });

    ////////////////// IMAGE FUNCTIONS - START //////////////////////////

    /*
    TODO:
    Gestione immagini in-editor:
    Per gestire al meglio le immagini aggiunte alle storie tramite l'editor e i file di un utente (i.e. CVs), sarà necessario implementare un architettura ad-hoc. (soluzione più corretta e semplice):
    Innanzitutto servirà una tabella a DB con:
     - id (autoincrement)
     - user_id
     - attachment_url
     - attachment_type (image, pdf, ecc)
    Dopodiché servirà un API a cui passare un file che caricherà su FireBase nella cartella chiamata "USER_${user_id}" e salverà l'url ritornato nella nuova tabella (userAttachments).
    Servirà anche un API che, dato un url, elimini l'immagine/file da firebase e dalla tabella.
    Infine, servirà un API che, dato un user_id, ritorni tutte le immagini associate a quell'utente o tutti i file.

    NOTA PER IL BE:
    In generale, quando un utente viene eliminato dal sistema, bisogna eliminare tutte le immagini associate a quell'utente da firebase e dalla tabella userImages.
    Servirà comunque revisionare tutto il funzionamento dell'applicazione quando un utente viene rimosso (mai testato).

    Per quanto riguarda il FE invece, servirà implementare un componente che è una modale che permette di:
     - visualizzare tutte le immagini dell'utente
     - selezionare un'immagine da inserire nell'editor (url)
     - eliminare un'immagine
     - caricare un'immagine

    Servirà chiamare questo componente sia dai EditorMenuControls che dalla funzione di drag&drop e paste delle immagini.
    Valutare se creare il componente normalemente e fare una versione "modale" in modo da poter usare il componente anche in altre parti dell'applicazione.

    */

    function fileListToImageFiles(fileList) {
        // You may want to use a package like attr-accept
        // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
        // types.
        return Array.from(fileList).filter((file) => {
            const mimeType = (file.type || "").toLowerCase();
            return mimeType.startsWith("image/");
        });
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleNewImageFiles = useCallback(
        async (files, insertPosition) => {

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
            const attributesForImageFiles = await Promise.all(files.map(async (file) => {
                const src = await toBase64(file);
                return {
                    src,
                    alt: file.name,
                };
            }));
            console.log(attributesForImageFiles);

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
                    attributes: {
                        class: `${classes['custom-editor-min-height']}`

                    }
                }}
                renderControls={() => <EditorMenuControls useComplete={props.useComplete} />}
                // debounce((e, value) => fetchSkills(value), 500)
                /* onUpdate={({ editor }) => {
                    props.onChange(editor.getHTML());
                }} */
                // onUpdate should call props.onUpdate if it exists but through a debounce function:
                onUpdate={props.onChange ? debounce(({ editor }) => props.onChange(editor.getHTML() !== '<p></p>' ? editor.getHTML() : null), 500) : undefined}
                RichTextFieldProps={{
                    // The "outlined" variant is the default (shown here only as
                    // example), but can be changed to "standard" to remove the outlined
                    // field border from the editor
                    variant: "outlined",
                    MenuBarProps: {
                        hide: !showMenuBar,
                    },
                    classes: {
                        outlined: `${props.error ? classes['error-outline'] : ''}`
                    },
                    // Below is an example of adding a toggle within the outlined field
                    // for showing/hiding the editor menu bar, and a "submit" button for
                    // saving/viewing the HTML content
                    footer: props.showFooter ? (
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
                            {props.showHideFormatting && <MenuButton
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
                            />}

                            {props.showOnlyReading && <MenuButton
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
                            />}

                            {props.showSaveButton && <Button
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
                            }
                        </Stack>
                    ) : null,
                }}
            >
                {() => (
                    <>
                        <LinkBubbleMenu />
                        <TableBubbleMenu />
                    </>
                )}
            </RichTextEditor>
            {props.error?.message &&
                <Typography variant="caption" sx={{ mt: 2 }} className={classes['error-message']}>
                    {props.error?.message}
                </Typography>
            }

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