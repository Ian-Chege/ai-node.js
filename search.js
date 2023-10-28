import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

import { openai } from "./openai.js";

const movies = [
    {
        id: 1,
        title: 'Stepbrother',
        description: `Comedic journey full of adult humor and awkwardness.`,
    },
    {
        id: 2,
        title: 'The Matrix',
        description: `Deals with alternate realities and questioning what's real.`,
    },
    {
        id: 3,
        title: 'Shutter Island',
        description: `A mind-bending plot with twists and turns.`,
    },
    {
        id: 4,
        title: 'Memento',
        description: `A non-linear narrative that challenges the viewer's perception.`,
    },
    {
        id: 5,
        title: 'Doctor Strange',
        description: `Features alternate dimensions and reality manipulation.`,
    },
    {
        id: 6,
        title: 'Paw Patrol',
        description: `Children's animated movie where a group of adorable puppies save people from all sorts of emergencies.`,
    },
    {
        id: 7,
        title: 'Interstellar',
        description: `Features futuristic space travel with high stakes`,
    },
    {
        id: 8,
        title: 'Lupin',
        description: `A modern twist on the tales of Arsène Lupin, a gentleman thief who operates in the heart of Paris.`,
    },
    {
        id: 9,
        title: "My dad's a bounty hunter",
        description: `An action-packed animated series about a young girl whose father is an intergalactic bounty hunter.`,
    },
    {
        id: 10,
        title: "Abattoir",
        description: `Story of a young teacher, Martins, who has seemed to be reliving his troubled past. Martins, who lost his mother to his brutal cultist of a Father, still had these bad memories hovering over him.`
    },
    {
        id: 11,
        title: 'Hitman',
        description: `Follows the story of Agent 47, a professional hitman working for an organization known as the International Contract Agency.`,
    },
    {
        id: 12,
        title: "The Black Book",
        description: `A Nigerian action thriller that tells a gripping story of corruption and police brutality. It focuses on a deacon named Paul Edima, whose son is wrongly accused of kidnapping. Paul sets off on a path to revenge as he looks to expose the corrupt officials responsible for framing his innocent son`,
    }
]

const createStore = () =>
    MemoryVectorStore.fromDocuments(movies.map((movie) => new Document({
        pageContent: `Title: ${movie.title}\nDescription: ${movie.description}\n`,
        metadata: { source: movie.id, title: movie.title },
    })
    ),
        new OpenAIEmbeddings()
    )

export const search = async (query, count = 3) => {
    const store = await createStore()
    return store.similaritySearch(query, count)
}

console.log(await search('For kids...'))