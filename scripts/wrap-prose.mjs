import { readFileSync, writeFileSync } from 'node:fs';

const filePath = 'content/blog/2026/07/how-to-stop-client-facing-ai-agents-from-hallucinating.md';
const content = readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let inFrontmatter = false;
let frontmatterCount = 0;
let inCodeBlock = false;
let outLines = [];

function wrapParagraph(text, limit = 48) {
  const words = text.split(/\s+/);
  let lines = [];
  let currentLine = '';

  for (const word of words) {
    if (!word) continue;
    if (currentLine.length + word.length + 1 > limit) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      if (currentLine) currentLine += ' ' + word;
      else currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

let i = 0;
while (i < lines.length) {
  const line = lines[i];

  if (line === '---') {
    frontmatterCount++;
    if (frontmatterCount === 1) inFrontmatter = true;
    else if (frontmatterCount === 2) inFrontmatter = false;
    outLines.push(line);
    i++;
    continue;
  }

  if (inFrontmatter) {
    outLines.push(line);
    i++;
    continue;
  }

  if (line.startsWith('```')) {
    inCodeBlock = !inCodeBlock;
    outLines.push(line);
    i++;
    continue;
  }

  if (inCodeBlock) {
    outLines.push(line);
    i++;
    continue;
  }

  // Preserve headers, list items, numbered lists, tables, horizontal rules, and blank lines
  if (
    line.startsWith('#') ||
    line.startsWith('|') ||
    line.startsWith('-') ||
    line.startsWith('*') ||
    line.startsWith('>') ||
    /^\d+\./.test(line.trim()) ||
    line.trim() === ''
  ) {
    outLines.push(line);
    i++;
    continue;
  }

  // Gather consecutive prose lines to form a paragraph
  let paraLines = [];
  while (
    i < lines.length &&
    lines[i].trim() !== '' &&
    !lines[i].startsWith('#') &&
    !lines[i].startsWith('|') &&
    !lines[i].startsWith('-') &&
    !lines[i].startsWith('*') &&
    !lines[i].startsWith('>') &&
    !/^\d+\./.test(lines[i].trim()) &&
    !lines[i].startsWith('---') &&
    !lines[i].startsWith('```')
  ) {
    paraLines.push(lines[i].trim());
    i++;
  }

  const paraText = paraLines.join(' ');
  const wrapped = wrapParagraph(paraText, 48);
  outLines.push(...wrapped);
}

writeFileSync(filePath, outLines.join('\n'), 'utf8');
console.log('Successfully wrapped prose with 48-character limit.');
