const Connection = require('../Database/connection');

module.exports = {
    async Index(request,response){
        const ong_id = request.headers.authorization;

        const Incidents = await Connection('incidents')
        .where('ong_id',ong_id)
        .select('*');

        return response.json(Incidents);
    }
};