const mongoose = require("mongoose");

const connectDataBase = () => {
    console.log("Espere estamos concectando ao Banco de Dados")

    mongoose
        .connect("mongodb+srv://root:root@cluster0.vh7vxg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => console.log("MongoDB Atlas Conectado !"))
        .catch((error) => console.log(error))
}

module.exports = connectDataBase; 