import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseURL = process.env.SUPABASE_URL;

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
