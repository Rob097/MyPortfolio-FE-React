import theme from "@/MUI/theme";
import UserService from '@/services/user.service';
import GjsEditor, {
  Canvas
} from '@grapesjs/react';
import { ThemeProvider } from '@mui/material/styles';
import RightSidebar from '@/components/grapejs/RightSidebar';
import Topbar from '@/components/grapejs/Topbar';
import { MAIN_BORDER_COLOR } from '@/components/grapejs/common';

// This function is used to add to CKEditor a custom select that allows to insert custom strings into the editor
// You can add user variables to it.
function initCustomCKEditor(editor, user) {

  // Define a CKEditor plugin that adds a custom button
  CKEDITOR.plugins.add('strinsert',
    {
      requires: ['richcombo'],
      init: function (editor) {
        //  array of strings to choose from that'll be inserted into the editor
        var strings = [];
        strings.push(['[[firstName]]', 'Your first name', 'Your first name']);
        strings.push(['[[lastName]]', 'Your last name', 'Your last name']);
        strings.push(['[[presentation]]', 'Your Presentation', 'Your Presentation']);
        strings.push(['@@CareerProfile::displayList()@@', 'Career Profiles', 'Career Profiles']);

        // add the menu to the editor
        editor.ui.addRichCombo('strinsert',
          {
            label: 'Insert Content',
            title: 'Insert Content',
            voiceLabel: 'Insert Content',
            className: 'cke_format',
            panel: {
              css: [CKEDITOR.skin.getPath('editor')].concat(editor.config.contentsCss),
              multiSelect: false,
              attributes: { 'aria-label': 'My Dropdown Title' }
            },

            init: function () {
              this.startGroup("Insert Content");
              for (var i in strings) {
                this.add(strings[i][0], strings[i][1], strings[i][2]);
              }
            },

            onClick: function (value) {
              editor.focus();
              editor.fire('saveSnapshot');
              editor.insertHtml(value);
              editor.fire('saveSnapshot');
            }
          });
      }
    });
}

// Important to fix tailwind classNames
const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-');

// Options for the editor
const gjsOptions = {
  height: '100vh',
  storageManager: {
    type: 'local', // Type of the storage, available: 'local' | 'remote'
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
    options: {
      local: { // Options for the `local` type
        key: 'gjsProject', // The key for the local storage
      },
    }
  },
  undoManager: { trackSelection: false },
  selectorManager: { escapeName }
};

export default function CustomEditor() {
  const onEditor = (editor) => {
    console.log('Editor loaded');
    (window).editor = editor;
    UserService.getById(1).then(user => {
      initCustomCKEditor(editor, user?.content);
      // customizeEditor(editor, user?.content); (Not used)
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <style>{'body { margin: 0;'}</style>
      <GjsEditor
        className="gjs-custom-editor !text-white bg-dark-main"
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[
          {
            id: 'gjs-blocks-basic',
            src: 'https://unpkg.com/grapesjs-blocks-basic',
          },
          {
            id: 'grapesjs-tailwind',
            src: 'https://unpkg.com/grapesjs-tailwind',
          },
          {
            id: 'grapesjs-plugin-ckeditor',
            src: 'https://unpkg.com/grapesjs-plugin-ckeditor',
            options: {
              // ckeditor options
              options: {
                language: 'en',
                extraPlugins: 'strinsert' // custom plugin for inserting custom strings
              }
            }
          }
        ]}
        onEditor={onEditor}
      >
        <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
          <div className="gjs-column-m flex flex-col flex-grow">
            <Topbar className="min-h-[48px]" />
            <Canvas className="flex-grow gjs-custom-editor-canvas" />
          </div>
          <RightSidebar
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
          />
        </div>
        {/* <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              children={content}
              close={close}
            />
          )}
        </ModalProvider>
        <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider> */}
      </GjsEditor>
    </ThemeProvider>
  );
}


// Example of custom trait added to all types of components (not used)
/*function customizeEditor(editor, user) {
  editor?.DomComponents?.getTypes().map(type => {

    editor?.DomComponents?.addType(type.id, {

      model: {
        defaults: {

          traits: [
            ...editor?.DomComponents?.getType(type.id).model.prototype.defaults.traits,
            {
              label: 'Your name',
              name: 'user-name',
              type: 'select',
              options: [ // Array of options
                { id: 'your-name', name: user?.firstName, },
                { id: 'your-surname', name: 'Your surname' },
              ]
            }
          ]
        }
      }

    })
  });
}*/