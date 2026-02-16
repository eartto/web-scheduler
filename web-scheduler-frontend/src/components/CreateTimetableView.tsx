import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import type { Control } from 'react-hook-form';
import type { FormInputs } from '../@types/formInputs';

import './CreateTimetableView.css';
import NaviBar from './NaviBar';
import { useState } from 'react';
import timetableService from '../services/timetableService';

const RestrictDuration = ({ control }: { control: Control<FormInputs> }) => {
  const { register } = useFormContext();
  const restrictDuration = useWatch({
    control,
    name: 'reservationRestrictionDuration',
  });
  const reservationType = useWatch({
    control,
    name: 'reservationType',
  });
  const [durationValue, setDurationValue] = useState('7');

  const isHourly = (reservationType: string) => {
    if (reservationType === 'daily') {
      return false;
    } else {
      return true;
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationValue(event.target.value);
  };

  if (isHourly(reservationType)) {
    return (
      <div>
        {restrictDuration === 'limitDuration' && (
          <div>
            <label htmlFor="duration">{durationValue} hours</label>
            <br />
            <input
              className="limit-duration"
              type="range"
              id="restrictionDuration"
              min={'1'}
              max={'12'}
              {...register('restrictionDuration', {
                onChange: handleValueChange,
                shouldUnregister: true,
              })}
            />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {restrictDuration === 'limitDuration' && (
          <div>
            <label htmlFor="duration">{durationValue} days</label>
            <br />
            <input
              className="limit-duration"
              type="range"
              id="restrictionDuration"
              min={'1'}
              max={'21'}
              {...register('restrictionDuration', {
                onChange: handleValueChange,
                shouldUnregister: true,
              })}
            />
          </div>
        )}
      </div>
    );
  }
};

const RestrictFrequency = ({ control }: { control: Control<FormInputs> }) => {
  const { register } = useFormContext();
  const restrictFrequency = useWatch({
    control,
    name: 'reservationRestrictionFrequency',
  });
  const reservationType = useWatch({
    control,
    name: 'reservationType',
  });
  const [frequencyValue, setFrequencyValue] = useState('2');

  const isHourly = (reservationType: string) => {
    if (reservationType === 'daily') {
      return false;
    } else {
      return true;
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequencyValue(event.target.value);
  };

  if (isHourly(reservationType)) {
    return (
      <div>
        {restrictFrequency === 'limitFrequency' && (
          <div>
            <label htmlFor="restrictionFrequency">
              {frequencyValue} per week
            </label>
            <br />
            <input
              className="limit-frequency"
              type="range"
              id="restrictionFrequency"
              min={'1'}
              max={'6'}
              {...register('restrictionFrequency', {
                onChange: handleValueChange,
                shouldUnregister: true,
              })}
            />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {restrictFrequency === 'limitFrequency' && (
          <div>
            <label htmlFor="restrictionFrequency">
              {frequencyValue} per month
            </label>
            <br />
            <input
              className="limit-frequency"
              type="range"
              min={'1'}
              max={'20'}
              {...register('restrictionFrequency', {
                onChange: handleValueChange,
                shouldUnregister: true,
              })}
            />
          </div>
        )}
      </div>
    );
  }
};

const CreateTimetableView = () => {
  const methods = useForm<FormInputs>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const reservationType = useWatch({
    control,
    name: 'reservationType',
  });

  const isHourly = (reservationType: string) => {
    if (reservationType === 'daily') {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="create-timetable-view">
      <NaviBar />
      <h1>Create a new timetable</h1>
      <FormProvider {...methods}>
        <form
          className="timetable-form"
          onSubmit={handleSubmit((data) => timetableService.create(data))}
        >
          <label htmlFor="name">Timetable name:</label>
          <br />
          <input
            className="name-input"
            autoFocus
            id="name"
            autoComplete="on"
            placeholder="name"
            {...register('timetableName', {
              required: 'name required',
              maxLength: {
                value: 40,
                message: 'name exceeds the character limit',
              },
            })}
          />
          <br />
          <ErrorMessage
            errors={errors}
            name="timetableName"
            render={({ message }) => <p className="error-message">{message}</p>}
          />
          <label htmlFor="description">description:</label>
          <br />
          <textarea
            className="description-input"
            id="description"
            placeholder="description"
            maxLength={175}
            {...register('timetableDescription', {
              maxLength: {
                value: 175,
                message: 'description exceeds the character limit',
              },
            })}
          />
          <br />
          <fieldset className="type-input">
            <legend> reservation type</legend>
            <div>
              <input
                type="radio"
                defaultChecked
                {...register('reservationType', {
                  required: 'reservation type required',
                })}
                id="hourly"
                value={'hourly'}
              />
              <label htmlFor="hourly">hourly</label>
              <input
                type="radio"
                {...register('reservationType', {
                  required: 'reservation type required',
                })}
                id="daily"
                value={'daily'}
              />
              <label htmlFor="daily">daily</label>
            </div>
          </fieldset>
          <ErrorMessage
            errors={errors}
            name="reservationType"
            render={({ message }) => <p className="error-message">{message}</p>}
          />
          <fieldset className="restriction-input">
            <legend> reservation restrictions</legend>
            <div>
              <input
                type="checkbox"
                {...register('reservationRestrictionDuration')}
                id="limitDuration"
                value={'limitDuration'}
              />
              <label htmlFor="limitDuration">limit duration</label>
              <input
                type="checkbox"
                {...register('reservationRestrictionFrequency')}
                id="limitFrequency"
                value={'limitFrequency'}
              />
              <label htmlFor="limitFrequency">limit frequency</label>
            </div>
          </fieldset>
          {isHourly(reservationType) && <RestrictDuration control={control} />}
          {!isHourly(reservationType) && <RestrictDuration control={control} />}
          {isHourly(reservationType) && <RestrictFrequency control={control} />}
          {!isHourly(reservationType) && (
            <RestrictFrequency control={control} />
          )}
          <input className="submit-button" type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateTimetableView;
