// db.js
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.URL_BDD;
const supabaseKeyAdmin = process.env.SERVICE_KEY_BDD;
const supabaseAdmin = createClient(supabaseUrl, supabaseKeyAdmin);

export default supabaseAdmin
