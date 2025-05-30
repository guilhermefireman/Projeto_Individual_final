const supabase = require('../config/database');

async function listarEventos() {
  const { data, error } = await supabase.from('events').select('*');
  if (error) throw error;
  return data;
}

module.exports = { listarEventos };
