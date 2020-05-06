import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
      height: '100vh'
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    fullList: {
      width: 'auto'
    },
    block: {
      display: 'block'
    },
    white: {
      color: 'white'
    },
    resetLink: {
      color: theme.palette.text.primary,
      background: 'transparent',
      textDecoration: 'none',
      '&:active': {
        color: theme.palette.text.primary,
        background: 'transparent',  
      }
    },
    heightFix: {
      height: '24px'
    }
  }));

