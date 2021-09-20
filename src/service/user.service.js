const connection=require('../app/database')

class UserService{
    async create(user){
        const {name,password}=user
        // 将user储存到数据库中
        const staetment="INSERT INTO user (name,password) VALUES (?,?);"
        const result=await connection.execute(staetment,[name,password])
        return result[0]  
    }

    async getUserByName(name){
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const result = await connection.execute(statement, [name]);
        console.log(result[0]);
        return result[0];
    }


    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
      }

      async getAvatarByUserId(userId){
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
        const [result] = await connection.execute(statement, [userId]);
        return result[0];
      }
}

module.exports=new UserService()