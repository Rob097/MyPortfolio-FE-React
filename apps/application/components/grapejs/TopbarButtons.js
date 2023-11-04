import * as React from 'react';
import { useEditor } from '@grapesjs/react';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CropFreeIcon from '@mui/icons-material/CropFree';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CodeIcon from '@mui/icons-material/Code';
import { useEffect, useState } from 'react';
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from './common';

export default function TopbarButtons({
  className,
}) {
  const editor = useEditor();
  const [, setUpdateCounter] = useState(0);
  const { UndoManager, Commands } = editor;
  const cmdButtons = [
    {
      id: 'core:component-outline',
      icon: CropFreeIcon,
    },
    {
      id: 'core:fullscreen',
      icon: FullscreenIcon,
      options: { target: '#root' },
    },
    {
      id: 'core:open-code',
      icon: CodeIcon,
    },
    {
      id: 'core:undo',
      icon: UndoIcon,
      disabled: () => !UndoManager.hasUndo(),
    },
    {
      id: 'core:redo',
      icon: RedoIcon,
      disabled: () => !UndoManager.hasRedo(),
    },
  ];

  useEffect(() => {
    const cmdEvent = 'run stop';
    const updateEvent = 'update';
    const updateCounter = () => setUpdateCounter((value) => value + 1);
    const onCommand = (id) => {
      cmdButtons.find((btn) => btn.id === id) && updateCounter();
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  }, []);

  return (
    <div className={cx('flex gap-3', className)}>
      {/* Da qui in poi va in errore */}
      {cmdButtons.map(({ id, icon, disabled, options = {} }) => (
        <button
          key={id}
          type="button"
          className={cx(
            BTN_CLS,
            MAIN_BORDER_COLOR,
            Commands.isActive(id) && 'text-sky-300',
            disabled?.() && 'opacity-50'
          )}
          onClick={() =>
            Commands.isActive(id)
              ? Commands.stop(id)
              : Commands.run(id, options)
          }
          disabled={disabled?.()}
        >
          {/* Render "icon" as a React component: */}
          {React.createElement(icon)}
        </button>
      ))}
    </div>
  );
}
