import { serialize } from "cookie";
import { v4 as uuidv4 } from "uuid";
import supabaseAdmin from "../../db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.redirect(302, "/verification/invalid");
    }
    const { email, code } = req.query;
    if (!email || !code) {
        return res.redirect(302, "/verification/invalid");
    }
    try {
        const { data: user, error } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", email)
            .single();
        if (error || !user) {
            return res.redirect(302, "/verification/invalid");
        }

        if (user.verification_code !== code) {
            return res.redirect(302, "/verification/invalid");
        }
        const rememberToken = uuidv4();
        const { error: updateError } = await supabaseAdmin
            .from("users")
            .update({ is_verified: true, verification_code: null, remember_token: rememberToken })
            .eq("email", email);

        if (updateError) {
            throw updateError;
        }
        const serialized = serialize("rememberme", rememberToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        res.redirect(302, "/verification/valid");
    } catch (error) {
        console.error(error);
        return res.redirect(302, "/verification/invalid");
    }
}
