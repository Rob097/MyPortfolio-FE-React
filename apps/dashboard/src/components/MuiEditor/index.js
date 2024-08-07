import { AttachmentService } from "@/services/attachment.service";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter } from "react-promise-tracker";
import { Link } from "react-router-dom";
import ShowIf from 'shared/components/ShowIf';
import { MAX_FILE_SIZE } from "shared/utilities/constants";
import { displayMessages } from "../alerts";
import EditorMenuControls from "./EditorMenuControls";
import classes from './MuiEditor.module.scss';
import useExtensions from "./useExtensions";

const ONE_MB = 1024 * 1024;
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

    function validateFiles(fileList) {
        const files = Array.from(fileList);
        const wrongFiles = files.filter(file => !file.type.includes('image'));
        if (wrongFiles?.length > 0) {
            displayMessages(wrongFiles.map(file => {
                return { text: t('files.errors.wrong-type', { fileName: file.name, allowedTypes: t('files.imageTypes') }), level: 'error' };
            }));
        }

        const filesTooLarge = files.filter(file => file.size > MAX_FILE_SIZE);
        if (filesTooLarge?.length > 0) {
            displayMessages(filesTooLarge.map(file => {
                return { text: t('files.errors.too-large', { fileName: file.name, maxSize: MAX_FILE_SIZE / ONE_MB }), level: 'error' };
            }));
        }

        const filteredFiles = files.filter(file => file.size <= MAX_FILE_SIZE && file.type.includes('image'));
        return filteredFiles;
    }

    const handleNewImageFiles = useCallback(
        async (files, insertPosition) => {

            if (!files || files?.length === 0) {
                return;
            }

            if (!props.useComplete) {
                displayMessages([{ text: t('files.errors.image-not-allowed'), level: 'warning' }]);
                return;
            }

            if (!rteRef.current?.editor) {
                displayMessages([{ text: t('files.errors.image-generic-error'), level: 'error' }]);
                return;
            }

            // Map each file to a promise that resolves to the response from AttachmentService.create
            const requests = files.map(file => AttachmentService.create(file));

            try {
                manuallyIncrementPromiseCounter();

                // Use Promise.all to wait for all promises to resolve
                const responses = await Promise.all(requests);

                // Map each response to a promise that resolves to an object with the src property
                const attributesForImageFilesPromises = responses.map(async response => {
                    const json = await response.json();
                    console.log(json);
                    return {
                        src: json?.content?.[0]?.url
                    };
                });

                // Use Promise.all to wait for all promises to resolve
                const attributesForImageFiles = await Promise.all(attributesForImageFilesPromises);

                // Insert images
                insertImages({
                    images: attributesForImageFiles,
                    editor: rteRef.current.editor,
                    insertPosition,
                });

            } catch (error) {
                // Log any errors that occurred during the process
                console.error('An error occurred while processing the files:', error);
            } finally {
                manuallyDecrementPromiseCounter();
            }
        },
        [],
    );

    const handleDrop = useCallback(
        (view, event, _slice, _moved) => {

            if (event?.dataTransfer?.files?.length > 0) {
                if (!props.useComplete) {
                    displayMessages([{ text: t('files.errors.image-not-allowed'), level: 'warning' }]);
                    return false;
                }

                if (!(event instanceof DragEvent) || !event.dataTransfer) {
                    displayMessages([{ text: t('files.errors.image-generic-error'), level: 'error' }]);
                    return false;
                }

                const imageFiles = validateFiles(event.dataTransfer.files);
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
            }

            return false;
        },
        [handleNewImageFiles],
    );

    const handlePaste = useCallback(
        (_view, event, _slice) => {

            if (event?.clipboardData?.files?.length > 0) {
                if (!props.useComplete) {
                    displayMessages([{ text: t('files.errors.image-not-allowed'), level: 'warning' }]);
                    return false;
                }

                if (!event.clipboardData) {
                    displayMessages([{ text: t('files.errors.image-generic-error'), level: 'error' }]);
                    return false;
                }

                const pastedImageFiles = validateFiles(
                    event.clipboardData.files,
                );
                if (pastedImageFiles?.length > 0) {
                    handleNewImageFiles(pastedImageFiles);
                    return true;
                }
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

    function handleUpdate() {
        if (props.onChange) {
            props.onChange(rteRef.current?.editor?.getHTML() !== '<p></p>' ? rteRef.current?.editor?.getHTML() : null);
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
                onUpdate={debounce(handleUpdate, 500)}
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
                    {t('labels.start-with-ai')}
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