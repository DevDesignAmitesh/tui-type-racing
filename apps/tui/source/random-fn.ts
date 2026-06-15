export const SENTENCES = [
  "The quick brown fox jumped over the old wooden fence while a group of curious children watched from the nearby field and laughed as the animal disappeared into the forest beyond the hill.",

  "A skilled developer spends more time understanding the problem than writing code because a clear understanding often leads to simpler solutions and fewer bugs throughout the lifetime of the project.",

  "The train slowly approached the crowded station as passengers gathered their bags checked their tickets and prepared to continue their journeys to different cities across the country.",

  "Learning a new technology can feel overwhelming at first but consistent practice patience and curiosity usually transform confusion into confidence over time and experience.",

  "The bright afternoon sun reflected across the calm surface of the lake while small boats drifted peacefully and birds circled above searching for a place to rest.",

  "A successful team communicates openly shares knowledge frequently and supports one another during difficult challenges because collaboration often produces better outcomes than individual effort alone.",

  "The local bakery filled the street with the smell of freshly baked bread attracting customers from every corner of the neighborhood throughout the busy morning hours.",

  "Building software is not only about writing code but also about understanding users designing reliable systems and continuously improving the overall experience through thoughtful decisions.",

  "The cyclist continued along the winding mountain road despite the strong wind determined to reach the summit before sunset and enjoy the view from the top.",

  "Reading books from different subjects can broaden your perspective expose you to new ideas and strengthen your ability to think critically about complex topics.",

  "A group of friends gathered around the campfire sharing stories and laughter while the stars slowly appeared across the dark night sky above them.",

  "Modern web applications often rely on distributed systems caching databases and asynchronous communication to deliver fast and reliable experiences for millions of users.",

  "The young student practiced typing every evening and gradually noticed significant improvements in both speed and accuracy after several weeks of dedicated effort.",

  "An experienced engineer understands that maintainable code is often more valuable than clever code because future developers must be able to read and modify it.",

  "Heavy rain covered the city streets as people hurried beneath umbrellas searching for shelter while traffic moved slowly through the crowded intersections.",

  "The scientist carefully recorded every observation during the experiment ensuring that future researchers would be able to verify and reproduce the results accurately.",

  "Many entrepreneurs fail several times before achieving success because each setback teaches valuable lessons about decision making execution and long term planning.",

  "The small village remained quiet throughout the winter months except for the occasional sound of distant footsteps echoing through the narrow streets.",

  "Open source software allows developers from around the world to collaborate share knowledge and contribute improvements that benefit entire communities.",

  "The library offered a peaceful environment where students could focus on their studies complete assignments and explore new subjects without distractions.",

  "Advances in artificial intelligence are changing how people work learn and communicate creating opportunities as well as challenges across many industries.",

  "The captain carefully guided the ship through rough waters relying on experience preparation and teamwork to ensure the safety of everyone on board.",

  "A healthy routine that includes exercise proper sleep and balanced nutrition can significantly improve both physical health and mental well being.",

  "The artist spent months perfecting every detail of the painting determined to create a piece that would inspire emotion and reflection in viewers.",

  "Software performance issues are often discovered in production environments where real world usage patterns reveal limitations that were not visible during testing."
];

export function getRandomSentence(): string {
	const idx = Math.floor(Math.random() * SENTENCES.length);
	return SENTENCES[idx]!;
}