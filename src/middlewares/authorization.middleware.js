exports.authenticate =(roles)=> {
    return async (req, res, next) => {
        if(roles [0].toUpperCase() === 'PUBLIC') return next ();
        //PROF -if(!req.user) return res.status(401).redirect({status: 'error', error: 'Unauthorized'})
        if(!req.user) return res.redirect('/login'); //verifica si el usuario esta autenticado
        
        if(!roles.map(role => role.toUpperCase()).includes(req.user.role.toUpperCase())){
            return res.status(403).send({ statsu: 'error', error: 'Permisos denegados'})
        }
        //PROF- if (roles.toUpperCase().includes(req.user.role.toUpperCase())) return res.status(403).send({status: 'error', error: 'Permisos denegados'})
        next();
    };

};