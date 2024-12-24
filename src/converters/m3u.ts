import * as fs from 'fs';
import * as readline from 'readline';

interface Station {
    name: string;
    url: string;
}

async function convertM3UtoCSV(m3uFilePath: string, csvFilePath: string): Promise<void> {
    const stations: Station[] = [];
    const fileStream = fs.createReadStream(m3uFilePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let currentStation: Station | null = null;

    for await (const line of rl) {
        if (line.startsWith('#EXTINF')) {
            const match = line.match(/,(.+)/);
            if (match) {
                currentStation = { name: match[1], url: '' };
            }
        } else if (currentStation && line.startsWith('http')) {
            currentStation.url = line;
            stations.push(currentStation);
            currentStation = null;
        }
    }

    const csvContent = stations.map(station => `${station.name},${station.url}`).join('\n');
    fs.writeFileSync(csvFilePath, csvContent);
    console.log(`Converted ${stations.length} stations to ${csvFilePath}`);
}

export {
  convertM3UtoCSV,
};