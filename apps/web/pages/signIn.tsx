import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { theme, useStyles } from '@opentour/ui';
import { getProviders, signIn } from 'next-auth/client';
import React from 'react';

export default function SignIn({ providers }) {
  const classes = useStyles();

  return (
    <Grid
      container
      style={{
        minHeight: '100vh',
        backgroundImage: `url(https://images.unsplash.com/photo-1484482340112-e1e2682b4856?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8)`,
        objectFit: 'cover',
      }}
    >
      <Grid item sm={6}></Grid>
      <Grid
        container
        item
        sm={6}
        xs={12}
        style={{
          padding: 60,
          backgroundColor: '#000000CC',
        }}
        justify="space-between"
        direction="column"
        alignItems="center"
      >
        <div />
        <Grid
          container
          item
          direction="column"
          justify="space-around"
          style={{ minHeight: '40%', maxWidth: '400px' }}
        >
          <Grid container justify="center">
            <Typography variant="h1" style={{ color: 'white' }}>
              OpenTour
            </Typography>
            <img
              width="100%"
              alt="opentour-homepage-logo"
              src="https://www.graphicsprings.com/filestorage/stencils/713d3d68575cf7a54570c5ba2efec1e9.png?width=1200&height=1200"
            />
          </Grid>

          {Object.values(providers).map((provider) => (
            <Button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              style={{
                backgroundColor: 'white',
                color: 'black',
                height: '100px',
              }}
              variant="contained"
              color="secondary"
            >
              <Typography variant="button">
                Iniciar sesión con {provider.name}
              </Typography>
            </Button>
          ))}
        </Grid>
        <div />
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
