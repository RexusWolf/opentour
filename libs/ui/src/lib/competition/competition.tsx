import { Box, Button, Grid, Tab, Tabs } from '@material-ui/core';
import React from 'react';

import { Calendar } from '../calendar/calendar';
import { Ranking } from '../ranking/ranking';
import { TeamList } from '../teamsList/teamsList';
import { useStyles } from '../theme';
import { generateMatches } from './generateMatches';
import { ranking } from './ranking';
import { teams } from './teams';
import { TeamWizard } from './teamWizard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

export const Competition: React.FunctionComponent = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tabIndex, setTabIndex] = React.useState(1);
  const matches = generateMatches(teams);
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Grid
      container
      direction="column"
      className={[classes.competitionContainer, classes.container].join(' ')}
    >
      <Tabs indicatorColor="primary" value={tabIndex} onChange={handleChange}>
        <Tab label="Teams" />
        <Tab label="Calendar" />
        <Tab label="Ranking" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <TeamList teams={teams} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Calendar matches={matches} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <Ranking ranking={ranking} />
      </TabPanel>
      <Grid container justify="flex-end" className={classes.container}>
        <Button
          className={classes.containerItem}
          color="secondary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Create team for competition
        </Button>
        <TeamWizard open={open} onClose={handleClose} />
        <Button
          className={classes.containerItem}
          color="primary"
          variant="contained"
        >
          Start competition
        </Button>
      </Grid>
    </Grid>
  );
};
