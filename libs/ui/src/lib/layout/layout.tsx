import { Container, CssBaseline } from '@material-ui/core';
import { Session } from 'next-auth';
import React from 'react';

import Navbar from '../navbar/navbar';
import { useStyles } from '../theme';

export interface LayoutProps {
  session?: Session;
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  session,
  children,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        open={open}
        session={session}
        onOpenSidebar={() => setOpen(true)}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.mainContainer} maxWidth={false}>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
