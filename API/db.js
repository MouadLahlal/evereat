const { SUPABASE_HOST, SUPABASE_KEY } = require("./constants");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(SUPABASE_HOST, SUPABASE_KEY);

module.exports = { supabase };