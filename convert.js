const fs = require('fs')

const data =
  fs.readFileSync('submodules/Magnezone462/Zyevio/隋語廣韻全字表.csv').toString()
    .trim()
    .split('\n')
    .slice(1)
    .map(line => {
      const row = line.split(',');
      const character = row[1];
      const romanization = row[2]
        .normalize('NFD')
        .replace(/[\u0301\u0302]/, '');
      const tone = '平上去入'.indexOf(row[10]);
      const romanizationNew = [
        [/^x/, 'h'],
        [/^qh/, 'x'],

        [/^c/, 'ț'],
        [/^dz/, 'd̦'],

        [/^g/, 'c'],
        [/ŋ/g, 'g'],

        [/^sh/, 'ſ'],
        [/^zh/, 'ʒ'],

        [/^kh/, 'ꝁ'],
        [/^th/, 'ŧ'],
        [/^țh/, 'ṯ'],
        [/^ph/, 'ᵽ'],

        [/ə/, 'v'],
      ].reduce((acc, [x, y]) => acc.replace(x, y), romanization)
        .replace(/$/, ['', 'q', 's', ''][tone])
        .normalize('NFKC');

      return `${character}\t${romanizationNew}`
    });

fs.writeFileSync(`data.tsv`, ['hani\tlatn'].concat(data).join('\n'))
