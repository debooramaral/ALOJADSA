import mongoose from 'mongoose';

const connectDataBase = () => {
    console.log("Espere estamos concectando ao Banco de Dados")
    
        mongoose
        .connect(process.env.MONGODB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => console.log("MongoDB Atlas Conectado !"))
        .catch((error) => console.log(error))
}
 
export default connectDataBase;   