import axios from 'axios';
import { Character } from '../models/Character';
import { Starship } from 'src/models/Starship';

export default class CharacterService {
    public static async getCharactersByPage(
        page: number
    ): Promise<{ characters: Character[]; total: number }> {
        let chars: { characters: Character[]; total: number } = {
            characters: [],
            total: 0,
        };
        interface queryResult {
            data: {
                count: number;
                results: Character[];
            };
        }

        await axios
            .get(`https://swapi.dev/api/people/?page=${page}`)
            .then((res: queryResult) => {
                console.log(res);
                return (chars = {
                    characters: res.data.results,
                    total: res.data.count,
                });
            })
            .catch((err: Error) => console.error(err));

        return chars;
    }

    public static async getCharacterById(id: number): Promise<Character> {
        const res = await axios.get(`https://swapi.dev/api/people/${id}`);
        return res.data;
    }

    public static async getStarships(char: Character): Promise<Starship[]> {
        const ships: Array<Starship> = [];
        if (char.starships) {
            char.starships.forEach(async (shipUrl) => {
                const ship: { data: Starship } = await axios.get(shipUrl);
                ships.push(ship.data);
            });
        }
        return ships;
    }

    public static async getPicture(characterName: string): Promise<string> {
        let code = 404;
        let i = 0;
        while (code != 200) {
            const res = await axios.get(
                `https://www.googleapis.com/customsearch/v1?key=AIzaSyDKEWPZHKt0FSXvND6RNPtajUnr171dwbA&cx=ccdc96df0b94a890e&searchType=image&imgSize=xlarge&alt=json&num=1&start=1&q=${characterName}`
            );
            code = res.status;
            if (res.status == 200) {
                return res.data.items[i].link;
            }
            i++;
        }
        return '';
    }
}
