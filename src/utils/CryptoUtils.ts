import bcrypt from 'bcrypt';

class CryptoUtils{
    private static readonly SaltRounds = 10;
    EncryptPassword(password : string){
        const salt = bcrypt.genSaltSync(CryptoUtils.SaltRounds);
        return bcrypt.hashSync(password, salt)
    }
}
const cryptoUtils = new CryptoUtils();
export default cryptoUtils;