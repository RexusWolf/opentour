import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import locale from 'date-fns/locale/es';
import React, { useState } from 'react';

export type Props = {
  initialDate: Date;
  dateChange: (date: Date) => void;
};

export const DateAndTimePicker: React.FunctionComponent<Props> = (props) => {
  const { initialDate, dateChange } = props;

  const [selectedDate, handleDateChange] = useState<Date | null>(initialDate);

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  const onDateChange = (value: MaterialUiPickersDate) => {
    handleDateChange(value);
    if (value) dateChange(value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
      <DateTimePicker
        style={{ flexGrow: 1 }}
        variant="inline"
        ampm={false}
        label="Fecha del partido"
        value={selectedDate}
        onChange={(date) => onDateChange(date)}
        onError={console.log}
        disablePast
        format="dd/MM/yyyy HH:mm"
      />
    </MuiPickersUtilsProvider>
  );
};
