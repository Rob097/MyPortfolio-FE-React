import {
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from '@grapesjs/react';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useState } from 'react';
import CustomBlockManager from './CustomBlockManager';
import CustomLayerManager from './CustomLayerManager';
import CustomPageManager from './CustomPageManager';
import CustomSelectorManager from './CustomSelectorManager';
import CustomStyleManager from './CustomStyleManager';
import CustomTraitManager from './CustomTraitManager';
import { MAIN_BORDER_COLOR, cx } from './common';

const defaultTabProps = {
  className: '!min-w-0',
};

export default function RightSidebar({
  className,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={cx('gjs-right-sidebar flex flex-col', className)}>
      <Tabs
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
        variant="fullWidth"
      >
        <Tab {...defaultTabProps} label={<BrushOutlinedIcon />} />
        <Tab {...defaultTabProps} label={<SettingsIcon />} />
        <Tab {...defaultTabProps} label={<LayersOutlinedIcon />} />
        <Tab
          {...defaultTabProps}
          label={<PostAddOutlinedIcon />}
        />
        {/* <Tab
          {...defaultTabProps}
          label={<FilterNoneOutlinedIcon />}
        /> */}
      </Tabs>
      <div
        className={cx('overflow-y-auto flex-grow border-t', MAIN_BORDER_COLOR)}
      >
        {selectedTab === 0 && (
          <>
            <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {(props) => <CustomStyleManager {...props} />}
            </StylesProvider>
          </>
        )}
        {selectedTab === 1 && (
          <TraitsProvider>
            {(props) => <CustomTraitManager {...props} />}
          </TraitsProvider>
        )}
        {selectedTab === 2 && (
          <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        )}
        {selectedTab === 3 && (
          <BlocksProvider>
            {(props) => <CustomBlockManager {...props} />}
          </BlocksProvider>
        )}
        {/* {selectedTab === 4 && (
          <PagesProvider>
            {(props) => <CustomPageManager {...props} />}
          </PagesProvider>
        )} */}
      </div>
    </div>
  );
}
