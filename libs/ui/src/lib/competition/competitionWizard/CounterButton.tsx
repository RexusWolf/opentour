import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';

type Props = {
  handleCounterChange: (counter: number) => void;
};

export const CounterButton: React.FunctionComponent<Props> = ({
  handleCounterChange,
}) => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => handleCounterChange(counter), [counter]);

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </Button>
      {<Button disabled>{counter}</Button>}
      {
        <Button
          disabled={counter < 1}
          onClick={() => {
            setCounter(counter - 1);
            handleCounterChange(counter);
          }}
        >
          -
        </Button>
      }
    </ButtonGroup>
  );
};
