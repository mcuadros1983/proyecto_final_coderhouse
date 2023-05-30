import UsersRepository from '../persistence/repository/usersRepository.js' 
const UsersRepo = new UsersRepository()
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use( 
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await UsersRepo.getByEmail(email);
        
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          try {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Incorrect username or password.",
              });
            }
          } catch (err) {
            return done(err);
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);


