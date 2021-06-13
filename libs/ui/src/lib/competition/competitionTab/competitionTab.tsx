import { Box } from '@material-ui/core';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const CompetitionTab: React.FunctionComponent<TabPanelProps> = ({
  children,
  value,
  index,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
};
