import red from '@material-ui/core/colors/red';
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    height: '100vh',
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    display: 'flex',
    height: '100vh',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  homeButton: {
    width: '60%',
    aspectRatio: '3/1',
    margin: '10px',
  },
}));

let muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#414BB2',
    },
    secondary: {
      main: '#32936F',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

muiTheme = responsiveFontSizes(muiTheme);
export const theme = muiTheme;
