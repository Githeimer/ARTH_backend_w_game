import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseKey = process.env.SUPABASE_KEY;
const supabaseURL = process.env.SUPABASE_URL;
// console.log(supabaseKey,'/n',supabaseURL);

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
