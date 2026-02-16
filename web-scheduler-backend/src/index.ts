import config from './utils/config';
import express from 'express';
const app = express();

import logger from './utils/logger';
import timetablesRouter from './routes/timetables';

app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/timetables', timetablesRouter);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});