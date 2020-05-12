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
    center: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transform: 'translate(-50%, -50%)'
    },
    heading: {
      fontSize: '1.5em',
      padding: theme.spacing(1, 2)
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
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
      width: 56,
      height: 56
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
    },
    imageCenter: {
      width: '350px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: '0.5'
    }
  }));

