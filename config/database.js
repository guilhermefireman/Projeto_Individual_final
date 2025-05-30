require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Cria o cliente Supabase com as variáveis do .env
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// (Opcional) Testa a conexão apenas quando você quiser verificar
// Pode comentar ou remover depois que confirmar que funciona
async function testarConexao() {
  const { data, error } = await supabase.from('events').select('*').limit(1);
  if (error) {
    console.error('❌ Erro ao conectar com Supabase:', error.message);
  } else {
    console.log('✅ Conexão com Supabase funcionando:', data);
  }
}

testarConexao();

module.exports = supabase;
