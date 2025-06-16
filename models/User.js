// models/User.js
const supabase = require('../config/database');

class User {
  static async buscarPorEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = User;
