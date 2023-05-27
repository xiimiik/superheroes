import { prisma } from "./prisma-client.js";

export function parseImages(hero) {
  return {
    ...hero,
    images: JSON.parse(hero.images || "[]"),
  };
}

export function stringifyImages(hero) {
  return {
    ...hero,
    images: JSON.stringify(hero.images),
  };
}

export const heroes = [
  {
    id: 1,
    nickname: "Superman",
    real_name: "Kal-El",
    superpowers: "Flight, super strength, invulnerability, heat vision, freeze breath",
    origin_description:
      "Kal-El, born on the planet Krypton, was sent to Earth as a baby before the destruction of his home planet. Raised as Clark Kent by the Kent family, he discovers his superhuman abilities and uses them to protect humanity as Superman.",
    catch_phrase: "Truth, justice, and the American way!",
    images: ["superman.png"],
  },
  {
    id: 2,
    nickname: "Ant-Man",
    real_name: "Scott Lang",
    superpowers: "Ability to shrink in size and communicate/control ants",
    origin_description:
      "Scott Lang is a skilled thief who becomes the new Ant-Man after stealing the Ant-Man suit from its original creator, Dr. Hank Pym. With the help of Pym's technology, Lang can shrink in size while increasing his strength and agility.",
    catch_phrase: "I'm Ant-Man!",
    images: ["antman.png"],
  },
  {
    id: 3,
    nickname: "Black Panther",
    real_name: "T'Challa",
    superpowers: "Enhanced strength, speed, agility, and senses; Vibranium suit",
    origin_description:
      "T'Challa is the king of Wakanda, a hidden African nation with advanced technology thanks to its rich deposits of Vibranium. As the Black Panther, T'Challa uses his enhanced physical abilities and high-tech suit to protect his people and fight for justice.",
    catch_phrase: "Wakanda forever!",
    images: ["black.png"],
  },
  {
    id: 4,
    nickname: "Batman",
    real_name: "Bruce Wayne",
    superpowers: "Exceptional detective skills, martial arts mastery, high-tech gadgets",
    origin_description:
      "Bruce Wayne witnessed the murder of his parents as a child, which fueled his quest to rid Gotham City of crime. Without superhuman powers, he relies on his intellect, physical training, and cutting-edge technology to become Batman, the Dark Knight.",
    catch_phrase: "I'm Batman!",
    images: ["batman.png"],
  },
  {
    id: 5,
    nickname: "Captain America",
    real_name: "Steve Rogers",
    superpowers: "Peak human strength, agility, and endurance; Vibranium shield",
    origin_description:
      "Steve Rogers, a frail young man, volunteered for an experiment that transformed him into the ultimate super soldier. As Captain America, he fights for justice and leads the Avengers with his incredible strength, unwavering courage, and indestructible shield.",
    catch_phrase: "Avengers, assemble!",
    images: ["cap.png"],
  },
  {
    id: 6,
    nickname: "Iron Man",
    real_name: "Tony Stark",
    superpowers: "Genius-level intellect, powered armor suit",
    origin_description:
      "Tony Stark, a brilliant inventor and billionaire industrialist, builds a high-tech suit of armor to save his own life and becomes the armored superhero known as Iron Man. With his technological prowess and charismatic personality, he fights against threats to humanity.",
    catch_phrase: "I am Iron Man!",
    images: ["ironman.jpg"],
  },
  {
    id: 7,
    nickname: "Wonder Woman",
    real_name: "Diana Prince",
    superpowers: "Superhuman strength, agility, durability; Lasso of Truth, Bracelets of Submission",
    origin_description:
      "Diana, an Amazon princess from the island of Themyscira, ventures into the world of men as Wonder Woman to bring peace and protect the innocent. Gifted with divine powers, she uses her combat skills and iconic weapons to fight evil forces.",
    catch_phrase: "In the name of all that is good, in the name of truth, we choose love over hatred!",
    images: ["wonderwoman.png"],
  },
  {
    id: 8,
    nickname: "Spider-Man",
    real_name: "Peter Parker",
    superpowers: "Agility, web-slinging, spider-sense, proportional strength and speed of a spider",
    origin_description:
      "Peter Parker, a high school student, gains incredible spider-like abilities after being bitten by a radioactive spider. Using his web-slinging skills, enhanced strength, and 'spider-sense', he fights crime in New York City as the friendly neighborhood superhero, Spider-Man.",
    catch_phrase: "With great power comes great responsibility.",
    images: ["spiderman.png"],
  },
  {
    id: 9,
    nickname: "Hulk",
    real_name: "Bruce Banner",
    superpowers: "Superhuman strength and durability; transforms into a raging green monster (Hulk) when angry",
    origin_description:
      "Bruce Banner, a brilliant scientist, is exposed to gamma radiation, which unleashes his alter ego, the Hulk, whenever he gets angry. The Hulk possesses immense strength and becomes an unstoppable force, making him both a hero and a potential threat to humanity.",
    catch_phrase: "Hulk smash!",
    images: ["hulk.png"],
  },
];

export const loadNewHeroes = async () => {
  await prisma.$transaction([
    prisma.superhero.deleteMany({}),
    ...heroes.map((hero) =>
      prisma.superhero.create({
        data: {
          nickname: hero.nickname,
          real_name: hero.real_name,
          superpowers: hero.superpowers,
          origin_description: hero.origin_description,
          catch_phrase: hero.catch_phrase,
          images: JSON.stringify(hero.images),
        },
      })
    ),
  ]);
}
