import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';
import { Session } from 'next-auth';
import React from 'react';

import { useStyles } from '../theme';

/* eslint-disable-next-line */
export interface NavbarProps {
  open: boolean;
  onOpenSidebar: (event: React.MouseEvent) => void;
  session: Session;
}

export function Navbar({
  open,
  onOpenSidebar: onOpenDrawer,
  session,
}: NavbarProps) {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          OpenTour
        </Typography>
        {session && (
          <Link href="/api/auth/signout">
            <Button color="inherit">Cerrar sesión</Button>
          </Link>
        )}
        {!session && (
          <Link href="/api/auth/signin">
            <Button color="inherit">Iniciar sesión</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
