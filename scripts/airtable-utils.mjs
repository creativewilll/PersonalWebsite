import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

export function loadEnv(envPath) {
  const vars = {};
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf8');
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
  }
  return { ...process.env, ...vars };
}

export function loadConfig(configPath = 'scripts/airtable-config.json') {
  const fullPath = path.resolve(process.cwd(), configPath);
  return JSON.parse(readFileSync(fullPath, 'utf8'));
}

export function getCredentials() {
  const env = loadEnv(path.resolve(process.cwd(), '.env'));
  const pat = env.AIRTABLE_PAT;
  const baseId = env.AIRTABLE_BASE_ID;
  if (!pat || !baseId) {
    throw new Error('AIRTABLE_PAT and AIRTABLE_BASE_ID must be set in .env or environment');
  }
  return { pat, baseId };
}

export async function airtableRequest(url, options = {}) {
  const { pat } = getCredentials();
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Airtable API error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function createRecords(tableId, records, batchSize = 10, delayMs = 200) {
  const created = [];
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const data = await airtableRequest(`https://api.airtable.com/v0/${getCredentials().baseId}/${tableId}`, {
      method: 'POST',
      body: JSON.stringify({ records: batch }),
    });
    created.push(...data.records);
    if (i + batchSize < records.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  return created;
}

export async function listAllRecords(tableId, fields = []) {
  const { baseId } = getCredentials();
  const all = [];
  let offset = null;
  do {
    const params = new URLSearchParams();
    if (offset) params.set('offset', offset);
    for (const f of fields) params.append('fields[]', f);
    const data = await airtableRequest(`https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`);
    all.push(...(data.records || []));
    offset = data.offset;
  } while (offset);
  return all;
}

export async function updateRecord(tableId, recordId, fields) {
  const { baseId } = getCredentials();
  return airtableRequest(`https://api.airtable.com/v0/${baseId}/${tableId}/${recordId}`, {
    method: 'PATCH',
    body: JSON.stringify({ fields }),
  });
}
