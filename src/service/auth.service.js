const connection = require('../app/database');

class AuthService{
    async checkResource(tableName,id,userId){
        const startment=`SELECT * FROM ${tableName} WHERE id=? AND user_id=?;`
        const [result]=await connection.execute(startment,[id,userId])
        return result.length===0?false:true
 
        
    }
}

module.exports=new AuthService()