import { readFileSync } from 'node:fs';
import path from 'node:path';

function loadEnv(envPath) {
  try {
    const content = readFileSync(envPath, 'utf8');
    const vars = {};
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (match && !line.trim().startsWith('#')) {
        let value = match[2].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        vars[match[1]] = value;
      }
    }
    return vars;
  } catch {
    return {};
  }
}

const env = { ...process.env, ...loadEnv(path.resolve(process.cwd(), '.env')) };
const PAT = env.AIRTABLE_PAT;
const BASE_ID = env.AIRTABLE_BASE_ID;
if (!PAT || !BASE_ID) {
  console.error('Error: AIRTABLE_PAT and AIRTABLE_BASE_ID must be set in .env or the environment');
  process.exit(1);
}

const configJson = JSON.parse(readFileSync(path.resolve(process.cwd(), 'scripts/airtable-config.json'), 'utf8'));
const scheduleTableId = configJson.tables.Schedule.id;
const schedulePostFieldId = configJson.tables.Schedule.fields.Post;
const postStatusFieldId = configJson.tables.Posts.fields.Status;
const postPartFieldId = configJson.tables.Posts.fields.Part;

const headers = {
  Authorization: `Bearer ${PAT}`,
  'Content-Type': 'application/json',
};

async function createField(tableId, body) {
  const url = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables/${tableId}/fields`;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create field ${body.name}: ${res.status} ${text}`);
  }
  const data = await res.json();
  console.log(`Created field '${body.name}': ${data.id}`);
  return data;
}

async function main() {
  const fieldsToCreate = [
    {
      name: 'Day',
      type: 'formula',
      options: {
        formula: "DATETIME_FORMAT(Date,'dddd')",
        result: { type: 'singleLineText' },
      },
    },
    {
      name: 'Status',
      type: 'multipleLookupValues',
      options: {
        recordLinkFieldId: schedulePostFieldId,
        fieldIdInLinkedTable: postStatusFieldId,
      },
    },
    {
      name: 'Part',
      type: 'multipleLookupValues',
      options: {
        recordLinkFieldId: schedulePostFieldId,
        fieldIdInLinkedTable: postPartFieldId,
      },
    },
  ];

  for (const field of fieldsToCreate) {
    try {
      await createField(scheduleTableId, field);
    } catch (err) {
      console.error(err.message);
    }
  }
}

main();
