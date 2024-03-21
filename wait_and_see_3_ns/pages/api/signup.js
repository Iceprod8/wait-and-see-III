import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import supabaseAdmin from "../../db";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MDP_EMAIL,
    },
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end("Méthode ${req.method} non autorisée.");
    }
    const { pseudo, email, password, confirmPassword } = req.body;
    if (!pseudo || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Un des champs n'est pas remplis." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }
    try {
        let { data: userExists, error: userExistsError } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("is_verified", true);
        if (userExistsError) throw userExistsError;
        if (userExists.length > 0) {
            return res.status(409).json({ message: "Un utilisateur vérifié existe déjà avec cet email." });
        }
        const { error: deleteUserError } = await supabaseAdmin
            .from("users")
            .delete()
            .eq("email", email)
            .eq("is_verified", false);
        if (deleteUserError) throw deleteUserError;
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode();
        const verificationUrl = `http://localhost:3000/api/verify?email=${encodeURIComponent(email)}&code=${verificationCode}`;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Vérification de l'email",
            html: htmlEmail(verificationUrl),
        });
        const { error: insertUserError } = await supabaseAdmin
            .from("users")
            .insert([
                {
                    pseudo,
                    email,
                    password: hashedPassword,
                    verification_code: verificationCode,
                    is_verified: false,
                },
            ]);

        if (insertUserError) throw insertUserError;

        return res.status(201).json({ message: "Email de vérification envoyé. Veuillez vérifier votre boîte de réception." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
}

function generateVerificationCode(length = 6) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const htmlEmail = (verificationUrl) => {
    return `<html>
                <head>
                    <style>
                        .container {
                            max-width: 700px;
                            margin: 0 auto;
                            border-radius: 10px;
                            background-color: #f2f2f2;
                            padding: 20px;
                            text-align: center;
                            overflow-wrap: break-word;
                        }
                
                        .title {
                            color: #333;
                            margin: 10px 0;
                        }
                
                        .message {
                            font-size: 16px;
                            color: #777;
                            margin: 10px 0;
                        }
                
                        .button {
                            margin: 6%;
                        }
                
                        .button a {
                            text-decoration: none;
                            color: #fff;
                            font-weight: bold;
                            background-color: #7e22ce;
                            border-radius: 5px;
                            padding: 2.5% 5%;
                            transition: background-color 0.3s, color 0.3s;
                        }
                    </style>
                </head>
                <body>
                    <div>
                        <div className="container">
                            <h1 className="title">Vérification de compte pour FullData</h1>
                            <p className="message">Veuillez valider votre compte en cliquant sur le bouton ci-dessous.</p>
                            <div className="button">
                                <a href="${verificationUrl}">Vérifier mon compte</a>
                            </div>
                        </div>
                    </div>
                </body>
            </html>`;
}