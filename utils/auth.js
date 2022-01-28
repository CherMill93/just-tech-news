const withAuth = (req, res, next) => { //if an uthorization exists in the session it will run
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
