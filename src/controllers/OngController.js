const Connection = require('../Database/connection');
const Crypto = require('crypto');


module.exports ={
    async Index(request,response){
        const ongs = await Connection('ongs').select('*');
        return  response.json(ongs);
        
    },
    async Create(request,response){
        const {name,email,whatsapp,city,uf} = request.body;

        const id = Crypto.randomBytes(4).toString('HEX');

        await Connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        console.log(id);

        return response.json({id});
   }
};