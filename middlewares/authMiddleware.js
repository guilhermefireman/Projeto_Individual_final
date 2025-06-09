exports.proteger = (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/admin/login');
    }
    next();
  };
  