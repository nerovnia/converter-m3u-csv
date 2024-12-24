import * as path from 'path';
import { convertM3UtoCSV } from './converters/m3u';

// Path
const pathToRes = '@/../res/';

const m3uFilePath = path.join(pathToRes, 'stations.m3u');
const csvFilePath = path.join(pathToRes, 'stations.csv');

convertM3UtoCSV(m3uFilePath, csvFilePath)
    .then(() => console.log('Conversion complete!'))
    .catch(err => console.error('Error converting M3U to CSV:', err));