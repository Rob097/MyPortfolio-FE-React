"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _styles = require("@mui/material/styles");
var _borders = _interopRequireDefault(require("../theme/base/borders"));
var _boxShadows = _interopRequireDefault(require("../theme/base/boxShadows"));
var _breakpoints = _interopRequireDefault(require("../theme/base/breakpoints"));
var _colors = _interopRequireDefault(require("../theme/base/colors"));
var _globals = _interopRequireDefault(require("../theme/base/globals"));
var _typography = _interopRequireDefault(require("../theme/base/typography"));
var _boxShadow = _interopRequireDefault(require("../theme/functions/boxShadow"));
var _hexToRgb = _interopRequireDefault(require("../theme/functions/hexToRgb"));
var _linearGradient = _interopRequireDefault(require("../theme/functions/linearGradient"));
var _pxToRem = _interopRequireDefault(require("../theme/functions/pxToRem"));
var _rgba = _interopRequireDefault(require("../theme/functions/rgba"));
var _appBar = _interopRequireDefault(require("../theme/components/appBar"));
var _avatar = _interopRequireDefault(require("../theme/components/avatar"));
var _breadcrumbs = _interopRequireDefault(require("../theme/components/breadcrumbs"));
var _button = _interopRequireDefault(require("../theme/components/button"));
var _buttonBase = _interopRequireDefault(require("../theme/components/buttonBase"));
var _card = _interopRequireDefault(require("../theme/components/card"));
var _cardContent = _interopRequireDefault(require("../theme/components/card/cardContent"));
var _cardMedia = _interopRequireDefault(require("../theme/components/card/cardMedia"));
var _divider = _interopRequireDefault(require("../theme/components/divider"));
var _autocomplete = _interopRequireDefault(require("../theme/components/form/autocomplete"));
var _checkbox = _interopRequireDefault(require("../theme/components/form/checkbox"));
var _formControlLabel = _interopRequireDefault(require("../theme/components/form/formControlLabel"));
var _formLabel = _interopRequireDefault(require("../theme/components/form/formLabel"));
var _input = _interopRequireDefault(require("../theme/components/form/input"));
var _inputBase = _interopRequireDefault(require("../theme/components/form/inputBase"));
var _radio = _interopRequireDefault(require("../theme/components/form/radio"));
var _select = _interopRequireDefault(require("../theme/components/form/select"));
var _switchButton = _interopRequireDefault(require("../theme/components/form/switchButton"));
var _icon = _interopRequireDefault(require("../theme/components/icon"));
var _iconButton = _interopRequireDefault(require("../theme/components/iconButton"));
var _linearProgress = _interopRequireDefault(require("../theme/components/linearProgress"));
var _link = _interopRequireDefault(require("../theme/components/link"));
var _list = _interopRequireDefault(require("../theme/components/list"));
var _listItem = _interopRequireDefault(require("../theme/components/list/listItem"));
var _listItemText = _interopRequireDefault(require("../theme/components/list/listItemText"));
var _menu = _interopRequireDefault(require("../theme/components/menu"));
var _menuItem = _interopRequireDefault(require("../theme/components/menu/menuItem"));
var _popover = _interopRequireDefault(require("../theme/components/popover"));
var _sidenav = _interopRequireDefault(require("../theme/components/sidenav"));
var _slider = _interopRequireDefault(require("../theme/components/slider"));
var _stepper = _interopRequireDefault(require("../theme/components/stepper"));
var _step = _interopRequireDefault(require("../theme/components/stepper/step"));
var _stepConnector = _interopRequireDefault(require("../theme/components/stepper/stepConnector"));
var _stepIcon = _interopRequireDefault(require("../theme/components/stepper/stepIcon"));
var _stepLabel = _interopRequireDefault(require("../theme/components/stepper/stepLabel"));
var _svgIcon = _interopRequireDefault(require("../theme/components/svgIcon"));
var _tableCell = _interopRequireDefault(require("../theme/components/table/tableCell"));
var _tableContainer = _interopRequireDefault(require("../theme/components/table/tableContainer"));
var _tableHead = _interopRequireDefault(require("../theme/components/table/tableHead"));
var _tabs = _interopRequireDefault(require("../theme/components/tabs"));
var _tab = _interopRequireDefault(require("../theme/components/tabs/tab"));
var _tooltip = _interopRequireDefault(require("../theme/components/tooltip"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = (0, _styles.createTheme)({
  breakpoints: _objectSpread({}, _breakpoints.default),
  palette: _objectSpread({}, _colors.default),
  typography: _objectSpread({}, _typography.default),
  boxShadows: _objectSpread({}, _boxShadows.default),
  borders: _objectSpread({}, _borders.default),
  functions: {
    boxShadow: _boxShadow.default,
    hexToRgb: _hexToRgb.default,
    linearGradient: _linearGradient.default,
    pxToRem: _pxToRem.default,
    rgba: _rgba.default
  },
  prova: {
    "Chiave": "valore"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: _objectSpread({}, _globals.default)
    },
    MuiDrawer: _objectSpread({}, _sidenav.default),
    MuiList: _objectSpread({}, _list.default),
    MuiListItem: _objectSpread({}, _listItem.default),
    MuiListItemText: _objectSpread({}, _listItemText.default),
    MuiCard: _objectSpread({}, _card.default),
    MuiCardMedia: _objectSpread({}, _cardMedia.default),
    MuiCardContent: _objectSpread({}, _cardContent.default),
    MuiButton: _objectSpread({}, _button.default),
    MuiIconButton: _objectSpread({}, _iconButton.default),
    MuiInputBase: _objectSpread({}, _inputBase.default),
    MuiMenu: _objectSpread({}, _menu.default),
    MuiMenuItem: _objectSpread({}, _menuItem.default),
    MuiSwitch: _objectSpread({}, _switchButton.default),
    MuiDivider: _objectSpread({}, _divider.default),
    MuiTableContainer: _objectSpread({}, _tableContainer.default),
    MuiTableHead: _objectSpread({}, _tableHead.default),
    MuiTableCell: _objectSpread({}, _tableCell.default),
    MuiLinearProgress: _objectSpread({}, _linearProgress.default),
    MuiBreadcrumbs: _objectSpread({}, _breadcrumbs.default),
    MuiSlider: _objectSpread({}, _slider.default),
    MuiAvatar: _objectSpread({}, _avatar.default),
    MuiTooltip: _objectSpread({}, _tooltip.default),
    MuiAppBar: _objectSpread({}, _appBar.default),
    MuiTabs: _objectSpread({}, _tabs.default),
    MuiTab: _objectSpread({}, _tab.default),
    MuiStepper: _objectSpread({}, _stepper.default),
    MuiStep: _objectSpread({}, _step.default),
    MuiStepConnector: _objectSpread({}, _stepConnector.default),
    MuiStepLabel: _objectSpread({}, _stepLabel.default),
    MuiStepIcon: _objectSpread({}, _stepIcon.default),
    MuiSelect: _objectSpread({}, _select.default),
    MuiFormControlLabel: _objectSpread({}, _formControlLabel.default),
    MuiFormLabel: _objectSpread({}, _formLabel.default),
    MuiCheckbox: _objectSpread({}, _checkbox.default),
    MuiRadio: _objectSpread({}, _radio.default),
    MuiAutocomplete: _objectSpread({}, _autocomplete.default),
    MuiInput: _objectSpread({}, _input.default),
    MuiOutlinedInput: _objectSpread({}, _input.default),
    MuiFilledInput: _objectSpread({}, _input.default),
    MuiPopover: _objectSpread({}, _popover.default),
    MuiButtonBase: _objectSpread({}, _buttonBase.default),
    MuiIcon: _objectSpread({}, _icon.default),
    MuiSvgIcon: _objectSpread({}, _svgIcon.default),
    MuiLink: _objectSpread({}, _link.default)
  }
});
exports.default = _default;