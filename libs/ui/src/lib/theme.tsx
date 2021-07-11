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
  mainContainer: {
    padding: 0,
  },
  marginContainer: {
    padding: 40,
  },
  container: {
    padding: theme.spacing(2),
  },
  fullContainer: {
    display: 'flex',
    height: '100vh',
  },
  carouselNavButton: {
    backgroundColor: theme.palette.secondary.main,
  },
  carousel: {
    width: '60%',
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
    margin: '20px',
    textTransform: 'none',
    color: theme.palette.primary.dark,
    borderBottom: '2px solid #614201',
    borderRadius: '0',
    transition: theme.transitions.create(['border-color', 'color'], {
      duration: 400,
    }),
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
    },
  },
  tabsContainer: {
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
  containerItem: {
    margin: '4px',
  },
  greenColor: {
    color: 'green',
  },
  calendarMatch: {
    padding: '4px',
    border: 'solid 1px whitesmoke',
  },
  errorButton: {
    backgroundColor: '#D00000',
    color: 'white',
  },
  tertiaryButton: {
    backgroundColor: '#003249',
    color: 'white',
  },
  calendarBlock: {
    backgroundColor: '#dbdbdb',
    padding: 20,
    margin: 10,
    borderRadius: 6,
  },
}));

let muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFb627',
      dark: '#946400',
    },
    secondary: {
      main: '#3F88C5',
    },
    error: {
      main: '#D00000',
    },
    background: {
      default: 'whitesmoke',
    },
  },
});

muiTheme = responsiveFontSizes(muiTheme);
export const theme = muiTheme;
