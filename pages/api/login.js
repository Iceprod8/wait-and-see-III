import { serialize } from "cookie";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import supabaseAdmin from "../../db";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
    const { email, password, remember } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "L\'email et le mot de passe sont requis." });
    }
    try {
        const { data: users, error: userFetchError } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("is_verified", true);
        if (userFetchError) throw userFetchError;
        
        if (users.length === 0) {
            return res.status(401).json({ message: "Aucun utilisateur vérifié trouvé." });
        }
        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "L\'email ou le mot de passe est incorrect." });
        }
        const rememberToken = uuidv4();
        const { error: updateError } = await supabaseAdmin
            .from("users")
            .update({ remember_token: rememberToken })
            .eq("email", email);

        if (updateError) throw updateError;
        const serialized = serialize("rememberme", rememberToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        res.redirect(302, "/");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
}
