const jwt = require('jsonwebtoken')


const requireAuth = (req, res, next) => {

        // verify aurh
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json{{error: 'Authorization token required'}}
        }
        const token = authorization.split(' ')[1]

        try {
            const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await 
            //! Kaip prideti statini methoda kad patikrinti
            //! ar privalu naudoti connection.execute viduje?
            // paselektinti id {id} 
            // (next)
            //! middleware padeti pries visus /GET /POST /DELETE kad praeitu verifikacija
        } catch (error) {
            console.log(error)
            res.status(401).json({error: 'Request is not authorized'})
        }
        
 }


 module.exports = requireAuth