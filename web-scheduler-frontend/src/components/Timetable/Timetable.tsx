import './Timetable.css';
import { Suspense, use, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NaviBar from '../NaviBar';
import timetableService from '../../services/timetableService';
import Loading from '../Loading';
import type { DataPromise, TimetableData } from '../../@types/global';
import { FormProvider, useForm } from 'react-hook-form';
import type { TimetableFormInputs } from '../../@types/CreateTimetable';

const TimetableInfo = ({ dataPromise }: DataPromise) => {
  const { data }: TimetableData = use(dataPromise);
  const navigate = useNavigate();
  console.log(data);

  const [editTimetable, setEditTimetable] = useState(false);
  const methods = useForm<TimetableFormInputs>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: TimetableFormInputs) => {
    try {
      await timetableService.edit(data!.id!, formData);

      navigate('/home');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  if (editTimetable) {
    return (
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit((formData) => onSubmit(formData))}>
            <input
              className="timetable-back-button"
              onClick={() => navigate(-1)}
              type="button"
              value={'back'}
            />
            <h2>{data.timetableName}</h2>
            <h3>key: {data.key}</h3>
            <h4>description: </h4>
            <textarea
              className="edit-timetable-description"
              id="description"
              defaultValue={data.timetableDescription}
              maxLength={175}
              {...register('timetableDescription', {
                maxLength: {
                  value: 175,
                  message: 'description exceeds the character limit',
                },
              })}
            />
            <div>reservation type: {data.reservationType}</div>
            {data.restrictionDuration ? (
              <div>
                duration restriction: {data.restrictionDuration}{' '}
                {data.reservationType === 'hourly' ? 'hours' : 'days'}
              </div>
            ) : null}
            {data.restrictionFrequency ? (
              <div>
                frequency restriction: {data.restrictionFrequency}{' '}
                {data.reservationType === 'hourly' ? ' per week' : ' per month'}
              </div>
            ) : null}
            <div className="button-panel">
              <input
                className="timetable-edit-button"
                onClick={() => setEditTimetable(true)}
                type="button"
                value={'edit'}
              />
              <input
                className="timetable-delete-button"
                onClick={() => navigate(-1)}
                type="button"
                value={'delete'}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    );
  } else {
    return (
      <div>
        <input
          className="timetable-back-button"
          onClick={() => navigate(-1)}
          type="button"
          value={'back'}
        />
        <h2>{data.timetableName}</h2>
        <h3>key: {data.key}</h3>
        <h4>description: </h4>
        <p className="timetable-description"> {data.timetableDescription}</p>
        <div>reservation type: {data.reservationType}</div>
        {data.restrictionDuration ? (
          <div>
            duration restriction: {data.restrictionDuration}{' '}
            {data.reservationType === 'hourly' ? 'hours' : 'days'}
          </div>
        ) : null}
        {data.restrictionFrequency ? (
          <div>
            frequency restriction: {data.restrictionFrequency}{' '}
            {data.reservationType === 'hourly' ? ' per week' : ' per month'}
          </div>
        ) : null}
        <div className="button-panel">
          <input
            className="timetable-edit-button"
            onClick={() => setEditTimetable(true)}
            type="button"
            value={'edit'}
          />
          <input
            className="timetable-delete-button"
            onClick={() => navigate(-1)}
            type="button"
            value={'delete'}
          />
        </div>
      </div>
    );
  }
};

const Timetable = () => {
  const { id } = useParams();

  const loadData = async () => {
    const timetable = await timetableService.findById(id!);
    return { data: timetable };
  };

  {
    return (
      <div className="timetable">
        <NaviBar />
        <div className="timetable-frame">
          <Suspense fallback={<Loading />}>
            <TimetableInfo dataPromise={loadData()} />
          </Suspense>
        </div>
      </div>
    );
  }
};

export default Timetable;
