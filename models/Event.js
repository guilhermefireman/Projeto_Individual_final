// models/Event.js
const supabase = require('../config/database');

class Event {
  static async buscarTodos() {
    const { data, error } = await supabase.from('events').select('*');
    if (error) throw error;
    return data;
  }

  static async buscarPorCidade(cidade) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('cidade', cidade);
    if (error) throw error;
    return data;
  }

  static async buscarPorId(id) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
  static async excluir(id) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
  


}

module.exports = Event;

