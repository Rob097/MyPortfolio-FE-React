import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import UpdateIcon from '@mui/icons-material/Update';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { debounce } from '@mui/material/utils';
import {
    LinkBubbleMenu,
    MenuButton,
    RichTextEditor,
    RichTextReadOnly,
    TableBubbleMenu,
    insertImages
} from "mui-tiptap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import ShowIf from 'shared/components/ShowIf';
import EditorMenuControls from "./EditorMenuControls";
import classes from './MuiEditor.module.scss';
import useExtensions from "./useExtensions";
import { Link } from "react-router-dom";

const MuiEditor = (props) => {
    const { t } = useTranslation('dashboard');
    const rteRef = useRef(null);
    const [isEditable, setIsEditable] = useState(true);
    const [showMenuBar, setShowMenuBar] = useState(true);
    const [submittedContent, setSubmittedContent] = useState("");

    const extensions = useExtensions({
        placeholder: props.placeholder ?? t('editor.default-placeholder'),
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

    1) ✅ Mockup
    2) BE
        - ✅ Tabella
        - ✅ Entity, DTO e Mapper
        - ✅ Service, Repository e Controller
        - ✅ API per caricare immagini
        - ✅ API per eliminare immagini
        - ✅ API per ritornare immagini
        - ✅ Eliminare files quando un utente viene eliminato
    3) ✅ Test
    4) Migrazione dati esistenti
    5) FE
    6) Test
    7) Eventuale pulizia codice
    8) Deploy
    9) Test finali

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
                                    showMenuBar ? t('editor.footer.hide-formatting') : t('editor.footer.show-formatting')
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
                                        ? t('editor.footer.prevent-edits')
                                        : t('editor.footer.allow-edits')
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
                                {t('labels.save')}
                            </Button>
                            }

                            {props.showAIButton && <AIButton />
                            }
                        </Stack>
                    ) : null,
                }}
            >
                {() => (
                    <>
                        <LinkBubbleMenu
                            labels={{
                                editLinkAddTitle: t('editor.header.link.add'),
                                editLinkCancelButtonLabel: t('editor.header.link.cancel'),
                                editLinkEditTitle: t('editor.header.link.edit'),
                                editLinkHrefInputLabel: t('editor.header.link.url'),
                                editLinkSaveButtonLabel: t('editor.header.link.save'),
                                editLinkTextInputLabel: t('editor.header.link.text'),

                                viewLinkEditButtonLabel: t('editor.header.link.view-edit'),
                                viewLinkRemoveButtonLabel: t('editor.header.link.view-remove')
                            }}
                        />
                        <TableBubbleMenu
                            labels={{
                                insertColumnBefore: t('editor.header.table.insertColumnBefore'),
                                insertColumnAfter: t('editor.header.table.insertColumnAfter'),
                                deleteColumn: t('editor.header.table.deleteColumn'),
                                insertRowAbove: t('editor.header.table.insertRowAbove'),
                                insertRowBelow: t('editor.header.table.insertRowBelow'),
                                deleteRow: t('editor.header.table.deleteRow'),
                                mergeCells: t('editor.header.table.mergeCells'),
                                splitCell: t('editor.header.table.splitCell'),
                                toggleHeaderRow: t('editor.header.table.toggleHeaderRow'),
                                toggleHeaderColumn: t('editor.header.table.toggleHeaderColumn'),
                                toggleHeaderCell: t('editor.header.table.toggleHeaderCell'),
                                deleteTable: t('editor.header.table.deleteTable'),
                            }}
                        />
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
                                {t('editor.footer.snapshot')}
                            </Typography>

                            <RichTextReadOnly
                                content={submittedContent}
                                extensions={extensions}
                            />
                        </Box>
                    </>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: t('editor.footer.instructions') }}></p>
                )}
            </ShowIf>
        </div>
    );
}

export default MuiEditor;

const AIButton = () => {
    const { t, i18n } = useTranslation('dashboard');
    const buttonRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        // Set gradient position to fixed value
        root.style.setProperty("--gradient-pos-x", `50%`);
        root.style.setProperty("--gradient-pos-y", `50%`);
    }, []);

    return (
        <>
            <button ref={buttonRef} id="AIButton" type="button" className={classes.button} onClick={() => setModalOpen(true)}>
                <div className={classes.neon}>
                    <div className={classes.gradient}>
                    </div>
                </div>
                <div className={classes.border}>
                    <div className={classes.gradient}></div>
                </div>
                <div className={classes.content}>
                    <AutoAwesomeIcon />
                    Start With AI
                </div>
            </button>

            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                keepMounted
            >
                <DialogTitle id="alert-dialog-title">{t('user-profile.plan.aiIntegration.title')}</DialogTitle>
                <DialogContent>
                    <Box textAlign="center" m={2}>
                        <Typography variant="h4" component="p" style={{ fontWeight: 'bold' }} className="flex flex-col justify-center items-center">
                            <NotificationsActiveIcon color="primary" /> {t('user-profile.plan.aiIntegration.announcement')}
                        </Typography>
                        <br />
                        <Typography variant="body1" component="p" style={{ margin: '20px 0' }} className="flex flex-col justify-center items-center">
                            <WorkIcon color="primary" /> {t('user-profile.plan.aiIntegration.description')}
                        </Typography>
                        <br />
                        <Typography variant="body1" component="p" style={{ margin: '20px 0' }} className="flex flex-col justify-center items-center">
                            <UpdateIcon color="primary" /> {t('user-profile.plan.aiIntegration.stayTuned')}
                        </Typography>
                        <br />
                        <Typography variant="h4" component="p" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                            <Link to={`https://www.my-portfolio.it/${i18n.language ?? 'en'}/support`} target="_blank" rel="noreferrer" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                                <span className="!underline !underline-offset-4">{t('user-profile.plan.aiIntegration.comingSoon')}</span><span> 🚀</span>
                            </Link>
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary" autoFocus>
                        {t('labels.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}