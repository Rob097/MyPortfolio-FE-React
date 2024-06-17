import { FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import {
    MenuButtonAddImage,
    MenuButtonAddTable,
    MenuButtonBlockquote,
    MenuButtonBold,
    MenuButtonBulletedList,
    MenuButtonCode,
    MenuButtonCodeBlock,
    MenuButtonEditLink,
    MenuButtonHighlightColor,
    MenuButtonHorizontalRule,
    MenuButtonIndent,
    MenuButtonItalic,
    MenuButtonOrderedList,
    MenuButtonRedo,
    MenuButtonStrikethrough,
    MenuButtonSubscript,
    MenuButtonSuperscript,
    MenuButtonTaskList,
    MenuButtonTextColor,
    MenuButtonUnderline,
    MenuButtonUndo,
    MenuButtonUnindent,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectFontSize,
    MenuSelectHeading,
    MenuSelectTextAlign,
    isTouchDevice,
    useRichTextEditorContext
} from "mui-tiptap";
import { useTranslation } from 'react-i18next';
import { REPLACE_MEDIA_MANAGER, useDashboardStore } from "shared/stores/DashboardStore";

export default function EditorMenuControls(props) {
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation('dashboard');
    const theme = useTheme();
    const editor = useRichTextEditorContext();


    function handleAddImage() {
        dispatch({ type: REPLACE_MEDIA_MANAGER, payload: { open: true, onlyImages: true, onSelect: addImageToEditor } });
    }

    function addImageToEditor(file) {
        console.log('addImageToEditor', file);
        if (file && file.url) {
            editor?.chain().focus().setImage({ src: file.url }).run();
        }
    }

    return (
        <MenuControlsContainer>

            <MenuSelectHeading
                aria-label={t('editor.header.headings.tooltip')}
                tooltipTitle={t('editor.header.headings.tooltip')}
                labels={{
                    empty: t('editor.header.headings.empty'),
                    paragraph: t('editor.header.headings.paragraph'),
                    heading1: t('editor.header.headings.h1'),
                    heading2: t('editor.header.headings.h2'),
                    heading3: t('editor.header.headings.h3'),
                    heading4: t('editor.header.headings.h4'),
                    heading5: t('editor.header.headings.h5'),
                    heading6: t('editor.header.headings.h6')
                }}
            />

            <MenuDivider />

            <MenuSelectFontSize
                aria-label={t('editor.header.font-size')}
                tooltipTitle={t('editor.header.font-size')}
            />

            <MenuDivider />

            <MenuButtonBold
                aria-label={t('editor.header.bold')}
                tooltipLabel={t('editor.header.bold')}
            />

            <MenuButtonItalic
                aria-label={t('editor.header.italic')}
                tooltipLabel={t('editor.header.italic')}
            />

            <MenuButtonUnderline
                aria-label={t('editor.header.underline')}
                tooltipLabel={t('editor.header.underline')}
            />

            <MenuButtonStrikethrough
                aria-label={t('editor.header.strike')}
                tooltipLabel={t('editor.header.strike')}
            />

            <MenuButtonSubscript
                aria-label={t('editor.header.subscript')}
                tooltipLabel={t('editor.header.subscript')}
            />

            <MenuButtonSuperscript
                aria-label={t('editor.header.superscript')}
                tooltipLabel={t('editor.header.superscript')}
            />

            <MenuDivider />

            <MenuButtonTextColor
                aria-label={t('editor.header.text-color.tooltip')}
                tooltipLabel={t('editor.header.text-color.tooltip')}
                labels={{
                    textFieldPlaceholder: t('editor.header.text-color.placeholder'),
                    cancelButton: t('editor.header.text-color.cancel'),
                    removeColorButton: t('editor.header.text-color.remove'),
                    saveButton: t('editor.header.text-color.save')
                }}
                defaultTextColor={theme.palette.text.primary}
                swatchColors={[
                    { value: "#000000", label: "Black" },
                    { value: "#ffffff", label: "White" },
                    { value: "#888888", label: "Grey" },
                    { value: "#ff0000", label: "Red" },
                    { value: "#ff9900", label: "Orange" },
                    { value: "#ffff00", label: "Yellow" },
                    { value: "#00d000", label: "Green" },
                    { value: "#0000ff", label: "Blue" },
                ]}
            />

            <MenuButtonHighlightColor
                aria-label={t('editor.header.highlight-color.tooltip')}
                tooltipLabel={t('editor.header.highlight-color.tooltip')}
                labels={{
                    textFieldPlaceholder: t('editor.header.highlight-color.placeholder'),
                    cancelButton: t('editor.header.highlight-color.cancel'),
                    removeColorButton: t('editor.header.highlight-color.remove'),
                    removeColorButtonTooltipTitle: t('editor.header.highlight-color.remove'),
                    saveButton: t('editor.header.highlight-color.save')
                }}
                swatchColors={[
                    { value: "#595959", label: "Dark grey" },
                    { value: "#dddddd", label: "Light grey" },
                    { value: "#ffa6a6", label: "Light red" },
                    { value: "#ffd699", label: "Light orange" },
                    // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
                    { value: "#ffff00", label: "Yellow" },
                    { value: "#99cc99", label: "Light green" },
                    { value: "#90c6ff", label: "Light blue" },
                    { value: "#8085e9", label: "Light purple" },
                ]}
            />

            <MenuDivider />

            <MenuButtonEditLink
                aria-label={t('editor.header.link.tooltip')}
                tooltipLabel={t('editor.header.link.tooltip')}
            />

            <MenuDivider />

            <MenuSelectTextAlign
                aria-label={t('editor.header.text-align.tooltip')}
                tooltipTitle={t('editor.header.text-align.tooltip')}
                options={[
                    {
                        value: "left",
                        label: t('editor.header.text-align.left'),
                        IconComponent: FormatAlignLeft,
                        shortcutKeys: ['Ctrl', 'Shift', 'L']
                    },
                    {
                        value: "center",
                        label: t('editor.header.text-align.center'),
                        IconComponent: FormatAlignCenter,
                        shortcutKeys: ['Ctrl', 'Shift', 'E']
                    },
                    {
                        value: "right",
                        label: t('editor.header.text-align.right'),
                        IconComponent: FormatAlignRight,
                        shortcutKeys: ['Ctrl', 'Shift', 'R']
                    },
                    {
                        value: "justify",
                        label: t('editor.header.text-align.justify'),
                        IconComponent: FormatAlignJustify,
                        shortcutKeys: ['Ctrl', 'Shift', 'J']
                    }
                ]}
            />

            <MenuDivider />

            <MenuButtonOrderedList
                aria-label={t('editor.header.ordered-list')}
                tooltipLabel={t('editor.header.ordered-list')}
            />

            <MenuButtonBulletedList
                aria-label={t('editor.header.bulleted-list')}
                tooltipLabel={t('editor.header.bulleted-list')}
            />

            <MenuButtonTaskList
                aria-label={t('editor.header.task-list')}
                tooltipLabel={t('editor.header.task-list')}
            />

            {/* On touch devices, we'll show indent/unindent buttons, since they're
      unlikely to have a keyboard that will allow for using Tab/Shift+Tab. These
      buttons probably aren't necessary for keyboard users and would add extra
      clutter. */}
            {isTouchDevice() && (
                <>
                    <MenuButtonIndent
                        aria-label={t('editor.header.indent')}
                        tooltipLabel={t('editor.header.indent')}
                    />

                    <MenuButtonUnindent
                        aria-label={t('editor.header.unindent')}
                        tooltipLabel={t('editor.header.unindent')}
                    />
                </>
            )}

            <MenuDivider />

            <MenuButtonBlockquote
                aria-label={t('editor.header.blockquote')}
                tooltipLabel={t('editor.header.blockquote')}
            />

            {/* Fin qui sono i menu della versione semplificata dell'editor */}
            {props.useComplete && (
                <>
                    <MenuDivider />

                    <MenuButtonCode
                        aria-label={t('editor.header.code')}
                        tooltipLabel={t('editor.header.code')}
                    />

                    <MenuButtonCodeBlock
                        aria-label={t('editor.header.code-block')}
                        tooltipLabel={t('editor.header.code-block')}
                    />

                    <MenuDivider />

                    <MenuButtonAddImage
                        aria-label={t('editor.header.upload-images')}
                        tooltipLabel={t('editor.header.upload-images')}
                        onClick={handleAddImage}
                    />

                    <MenuDivider />

                    <MenuButtonHorizontalRule
                        aria-label={t('editor.header.horizontal-rule')}
                        tooltipLabel={t('editor.header.horizontal-rule')}
                    />

                    <MenuButtonAddTable
                        aria-label={t('editor.header.table.tooltip')}
                        tooltipLabel={t('editor.header.table.tooltip')}
                    />

                </>
            )}

            {/* Fin qui sono i menu della versione completa dell'editor */}

            <MenuDivider />

            <MenuButtonUndo
                aria-label={t('editor.header.undo')}
                tooltipLabel={t('editor.header.undo')}
            />
            <MenuButtonRedo
                aria-label={t('editor.header.redo')}
                tooltipLabel={t('editor.header.redo')}
            />
        </MenuControlsContainer>
    );
}
