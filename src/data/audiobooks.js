import { Descriptions } from "antd";

const audiobooks = [
  {
    id: 1,
    title: 'The "Falcon" on the Baltic',
    author: "Edward Frederick Knight",
    descriptions:
      "A coasting voyage boyage in a small yacht from Hammersmith in the UK to Copenhagen and back, including various visits to places on the Baltic. - Summary by Jane Bennett",
    Genre: " Travel & Geography",
    language: "English",
    cover: "/audiobooks/cover/falcononthebaltic_2011.jpg",
    audio: Array.from(
      { length: 15 },
      (_, i) =>
        `/audiobooks/audio/falcon_2011_librivox/falcon_${String(i + 1).padStart(
          2,
          "0"
        )}_knight_64kb.mp3`
    ),
  },
  {
    id: 1,
    title: '"Boy" The Wandering Dog',
    author: "Marshall Saunders",
    descriptions:
      "Another 'dog's-eye view' book for children by this early activist for the American Humane Society. In this tale, we follow the travels and adventures of Boy, a loveable and loyal wire-haired fox-terrier in city and country. - Summary by Lynne Thompson",
    Genre: " Animals & Nature",
    language: "English",
    cover: "/audiobooks/cover/boythewanderingdog_1608.jpg",
    audio: Array.from(
      { length: 29 },
      (_, i) =>
        `/audiobooks/audio/boythewanderingdog_1608_librivox/boythewanderingdog_${String(
          i + 1
        ).padStart(2, "0")}_saunders_64kb.mp3`
    ),
  },
];

export default audiobooks;
