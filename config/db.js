const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const { DB_USER, DB_PASS } = process.env;

    if (!DB_USER || !DB_PASS) {
      throw new Error("DB_USER or DB_PASS is missing in .env");
    }

    // Non-SRV connection string WITH database name (trustLife_db)
    const uri = `mongodb://${DB_USER}:${DB_PASS}@ac-gonaqz9-shard-00-00.bmunlsr.mongodb.net:27017,ac-gonaqz9-shard-00-01.bmunlsr.mongodb.net:27017,ac-gonaqz9-shard-00-02.bmunlsr.mongodb.net:27017/trustLife_db?ssl=true&replicaSet=atlas-1xbkmz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
