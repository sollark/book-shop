'use strict';

function generateTitle() {
  var name_prefixes = [
    'Master',
    'Mr.',
    'Professor',
    'Mrs.',
    'Princess',
    'Prince',
    "The Pauper's",
    'The',
    'Betsy',
    'Billy',
    'Johnny',
  ];

  var primary_nouns = [
    'Crystal',
    'Bugle',
    'Dreamer',
    'Dream',
    'Castle',
    'Moss',
    'Mountain',
    'Pit',
    'Bigfoot',
    'Dream maker',
    'Oathbreaker',
    'Bard',
    'Magic',
    'Acorn',
    'Sun',
    'Son',
    'Stump',
    'Arm',
  ];

  var adjectives = [
    'Lost',
    'Five',
    'Faded',
    'Ancient',
    'Blackened',
    'Den of',
    'Despairing',
    'Golden',
    'Many',
    'Merry',
    'Clever',
    'Wonderful',
    'Sullen',
    'Angry',
    'Little',
    'Cowardly',
    'Silver',
    'Lasting',
    'Heavy',
    'Festive',
    'Gleeful',
    'Enchanted',
    'Wise',
    'Wistful',
    'Dark',
    'Untold',
  ];

  var secondary_nouns = [
    'Hearts',
    'Stones',
    'Diamond Dogs',
    'Painted Toes',
    'Songs',
    'Tales',
    'Lords',
    'Promise',
    'Screams',
    'Plagues',
    'Dreams',
    'Roads',
    'Curses',
    'Spells',
    'Gloam',
    'Lands',
    'Marsh',
    'Hearts',
    'Rules',
    'Swamp',
    'Tale',
    'Apex',
    'Beggar',
  ];

  const name_prefix = sample(name_prefixes);

  const primary_noun = sample(primary_nouns);

  const adjective = sample(adjectives);

  const secondary_noun = sample(secondary_nouns);

  let title = '';

  if (Math.random() < 0.3) {
    title = `${name_prefix} ${primary_noun} and the ${adjective} ${secondary_noun}`;
  } else if (Math.random() < 0.4) {
    title = `The ${adjective} ${secondary_noun} of ${name_prefix} ${primary_noun}`;
  } else title = `The ${adjective} ${primary_noun}`;

  return title;
}

function sample(array) {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
}
