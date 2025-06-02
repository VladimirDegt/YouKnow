import {fanCategories, scienceCategories} from '@/src/db/categories';

function getRandomCategory(categories: string[]) {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

export const fanFactPromt = `Tell a short, real and curious historical or factual story related to ${getRandomCategory(fanCategories)}, excluding anything about Russia, Rus', Russian people, or the Russian language. The story must be based on verified events or true facts. Add a touch of humor if appropriate, but do not include fictional elements. Start directly with the story without introductions or explanations.`

export const scienceFactPromt = `Provide a concise, well-researched explanation of an interesting ${getRandomCategory(scienceCategories)}, excluding any topics related to Russia, Rus', Russian scientists, or the Russian language. The explanation should be suitable for professional discussions. Use a formal and informative tone. Begin directly with the explanation — do not include any introductions, greetings, or preambles.`;
