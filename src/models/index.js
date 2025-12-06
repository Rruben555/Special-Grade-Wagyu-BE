// import { Sequelize, DataTypes } from "sequelize";
// import dotenv from "dotenv";

// import userModel from "./user.js";
// import characterModel from "./character.js";
// import weaponModel from "./weapon.js";
// import postModel from "./post.js";
// import commentModel from "./comment.js";

// dotenv.config();

// export const sequelize = new Sequelize(
//   process.env.PG_DATABASE,
//   process.env.PG_USER,
//   process.env.PG_PASSWORD,
//   {
//     host: process.env.PG_HOST,
//     dialect: "postgres",
//     logging: false,
//   }
// );

// export const User = userModel(sequelize, DataTypes);
// export const Character = characterModel(sequelize, DataTypes);
// export const Weapon = weaponModel(sequelize, DataTypes);
// export const Post = postModel(sequelize, DataTypes);
// export const Comment = commentModel(sequelize, DataTypes);

// // ---- User ↔ Post ----
// User.hasMany(Post, { foreignKey: "user_id" });
// Post.belongsTo(User, { foreignKey: "user_id" });

// // ---- User ↔ Comment ----
// User.hasMany(Comment, { foreignKey: "user_id" });
// Comment.belongsTo(User, { foreignKey: "user_id" });

// // ---- Post ↔ Comment ----
// Post.hasMany(Comment, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE"
// });
// Comment.belongsTo(Post, { foreignKey: "post_id" });


// export default {
//   sequelize,
//   User,
//   Character,
//   Weapon,
//   Post,
//   Comment,
// };


// src/models/index.js
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

dotenv.config();

const globalCache = globalThis.__SEQUELIZE__ || {};

function createSequelize() {
  if (process.env.DATABASE_URL) {
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    });
  }

  // fallback jika pakai PG_* manual
  return new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
      }
    }
  );
}

if (!globalCache.instance) {
  globalCache.instance = createSequelize();
  globalThis.__SEQUELIZE__ = globalCache;
}

export const sequelize = globalCache.instance;

// --- MODELS ---
export const User = userModel(sequelize, DataTypes);
export const Character = characterModel(sequelize, DataTypes);
export const Weapon = weaponModel(sequelize, DataTypes);
export const Post = postModel(sequelize, DataTypes);
export const Comment = commentModel(sequelize, DataTypes);

// --- RELATIONS ---
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

export default {
  sequelize,
  User,
  Character,
  Weapon,
  Post,
  Comment,
};
