const Connection = require('../Database/connection');

module.exports = {
   async Create(request,response) {
       const {title,description,value}= request.body;
       const ong_id = request.headers.authorization;
       const [id] = await Connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
       });
       return response.json({id});
   },

   async Index(request,response){
        const {page = 1} = request.query;
        
        const [Count] = await Connection('incidents').count();

        console.log(Count);

        const Incidents = await Connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
        ]);
        
        response.header('X-Total-Count',Count['count(*)']);

        return response.json(Incidents);
   },

   async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;
        const Incident = await Connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();

        if(Incident.ong_id !== ong_id){
            return response.status(401).json({error:'Operation Not Permited'});
        }
       
        await Connection('incidents').where('id',id).delete();
        return response.status(204).send();
   }
};