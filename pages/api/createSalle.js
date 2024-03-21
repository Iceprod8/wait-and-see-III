// api/createSalle.js
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import supabaseAdmin from "@/db";
import cardsOriginal from "../../data/cards.json";

const getDefaultImages = async () => Promise.all(cardsOriginal.map(async card => ({
    id: card.id,
    type: "png",
    base64: `./public/images/card/${card.id}.webp`
})));

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).setHeader('Allow', ['POST']).redirect(302, "/verification/invalid");
    new IncomingForm().parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: "Erreur lors du parsing du formulaire : " + err });
        const { nomSalle, mdpSalle, joueurs, proprietaire } = fields, uuidSalle = generateUUID();
        const tabJoueurs = joueurs.map(el => {
            return {
                id: proprietaire[0],
                name: el
            }
        })
        const filesArray = JSON.parse(JSON.stringify(Object.keys(files).map(key => files[key])));
        let userImagesBase64 = [];
        for (let i = 0; i <= filesArray[0].length ; i++) {
            if (!filesArray[0][i]) continue;
            try {
                const buffer = await fs.readFile(filesArray[0][i].filepath);
                userImagesBase64.push({ type: "base64", base64: buffer.toString('base64') });
            } catch (readError) {
                console.error("Error reading file:", readError);
            }
        }
        let allImages = await getDefaultImages(), finalImages = userImagesBase64.concat(allImages).slice(0, 59);
        console.log(finalImages)
        finalImages = shuffleArray(finalImages.reduce((acc, card, index) => {
            acc.push(...Array.from({ length: getCount(card.id) }, () => ({ images: card.base64, id: index + 1, type: card.type ? "png" : "base64" })));
            return acc;
        }, []));
        const { error } = await supabaseAdmin.from('salles').insert([{ uuid: uuidSalle, joueurs: JSON.stringify(tabJoueurs), images: JSON.stringify(finalImages), password: mdpSalle, name: nomSalle, proprietaire }]);
        error ? res.status(500).json({ error: error.message }) : res.status(200).json({ url: `/salle/1/${uuidSalle}` });
        const wsUrl = `ws://localhost:3000/api/socket?${uuidSalle}`;
        const ws = new WebSocket(wsUrl);
    });
}

const getCount = id => ["2", "4", "6", "7", "9", "11", "14", "16", "17", "22", "25", "26", "35", "36", "37", "39", "47", "48", "50", "57"].includes(id) ? 2 : ["10", "18", "21", "24", "51"].includes(id) ? 3 : ["23", "30"].includes(id) ? 4 : 1;

const shuffleArray = array => array.sort(() => Math.random() - 0.5);

const generateUUID = () => 'xxxx-xxxx-4xxx-yxxx-xxxx-yyyy'.replace(/[xy]/g, c => ((c === 'x' ? Math.random() * 16 | 0 : (Math.random() * 16 | 0) & 0x3 | 0x8)).toString(16));
