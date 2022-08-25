

import { tokenize , associate , dropEmptyGroups } from './Parsers/LaTeX/mod.js'


const test_string = `\\huge \\textcolor{Green}{n} \\textcolor{Blue}{!} \\textcolor{BrickRed}{=}  \\textcolor{Blue}{\\begin{cases} \\\\   \\textcolor{Green}{n} \\textcolor{BrickRed}{=} \\textcolor{Blue}{0} :&     1 \\\\ \\\\   \\textcolor{Green}{n} \\textcolor{BrickRed}{\\geq} \\textcolor{Blue}{0} : &  \\textcolor{Blue}{\\displaystyle\\prod_{ \\textcolor{Blue}{1} \\textcolor{BrickRed}{\\to} \\textcolor{Green}{ n } }^{ \\textcolor{DarkOrchid}{ x } } \\textcolor{DarkOrchid}{x}} \\\\ \\end{cases} } `;

const { log } = console;

log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');

const tokens = tokenize(test_string);

log('Tokens',tokens);

const tree = associate(tokens);

log('Tree',tree);

log('\n\n\n');

log('Dropped',dropEmptyGroups(tree));