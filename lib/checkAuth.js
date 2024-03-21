import { parseCookies } from "nookies";
import supabaseAdmin from "@/db";

export default async function checkAuth(context) {
    const cookies = parseCookies(context);
    const rememberToken = cookies.rememberme;

    if (!rememberToken) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const { data: rows } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("remember_token", rememberToken)
        .eq("is_verified", true);
    if (rows.length === 0) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const userData = rows[0];
    if (userData.date_de_creation) {
        userData.date_de_creation = userData.date_de_creation.toISOString();
    }
    if (context.resolvedUrl.includes("/salle/1/")) {
        const data = await checkSalles(context.resolvedUrl.replace("/salle/1/", ""));
        return { props: { userData, data } };
    }

    return { props: { userData } };
}


async function checkSalles(uuid) {
    const  { data, error } = await supabaseAdmin
        .from("salles")
        .select("*")
        .eq("uuid", uuid)
    return data;
}
