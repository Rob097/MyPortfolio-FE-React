import { Alert, AlertTitle } from '@mui/material';
import { SnackbarContent, SnackbarProvider, closeSnackbar, useSnackbar } from 'notistack';
import { forwardRef } from 'react';

export const VariantType = {
  default: 'default',
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info'
}

const InnerSnackbarUtilsConfigurator = (props) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = (useSnackbarRefProp) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = ({ children }) => {
  return (
    <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef}>
      {children}
    </InnerSnackbarUtilsConfigurator>
  )
};

//sets a default length for all Snack messages
const defaultSnackMessageLength = 1000;

const trimMessage = (
  msg,
  length = defaultSnackMessageLength
) => {
  return msg?.substring(0, length);
};

const Snack = {
  success(msg, options = {}) {
    this.toast(trimMessage(msg), { ...options, variant: VariantType.success });
  },
  warning(msg, options = {}) {
    this.toast(trimMessage(msg), { ...options, variant: VariantType.warning });
  },
  info(msg, options = {}) {
    this.toast(trimMessage(msg), { ...options, variant: VariantType.info });
  },
  error(msg, options = {}) {
    this.toast(trimMessage(msg), { ...options, variant: VariantType.error });
  },
  toast(msg, options = {}) {
    if (msg) {
      useSnackbarRef?.enqueueSnackbar(msg, options);
    }
  }
};
export default Snack;

export const CustomAlert = forwardRef((props, ref) => {

  const {
    id,
    message,
    variant,
    ...other
  } = props;

  return (
    <SnackbarContent
      ref={ref}
      role="alert"
      {...other}
    >
      <Alert severity={variant} onClose={() => closeSnackbar(id)} sx={{ width: '100%', maxWidth: '30em' }}>
        <AlertTitle>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </AlertTitle>
        {message}
      </Alert>
    </SnackbarContent>
  )
})

export const CustomSnackProvider = ({ children }) => (
  <SnackbarProvider
    maxSnack={3}
    // persist
    preventDuplicate
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    Components={{
      default: CustomAlert,
      error: CustomAlert,
      success: CustomAlert,
      warning: CustomAlert,
      info: CustomAlert
    }}
  >
    {children}
  </SnackbarProvider>
);

export function displayMessages(messages) {
  if (messages) {
    messages.forEach((m) => {
      if (m.level.toUpperCase() === VariantType.error.toUpperCase()) {
        Snack.error(m.text);
      } else if (m.level.toUpperCase() === VariantType.warning.toUpperCase()) {
        Snack.warning(m.text);
      } else if (m.level.toUpperCase() === VariantType.info.toUpperCase()) {
        Snack.info(m.text);
      } else if (m.level.toUpperCase() === VariantType.success.toUpperCase()) {
        Snack.success(m.text);
      }
    });
  }
}