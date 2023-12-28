const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://santifeas:4220@vidaverdeecomm.vddlmop.mongodb.net/VidaVerdeEcomm?retryWrites=true&w=majority');
    console.log('Base de datos conectada.');
  } catch (error) {
    console.error('Error de conexión con MongoDB:', error.message);
    throw error;
  }
};

