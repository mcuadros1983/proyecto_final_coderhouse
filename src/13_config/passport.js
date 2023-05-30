import UsersRepository from '../02_persistence/repository/usersRepository.js' 
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
        console.log("userfound", user)
        
        if (!user) {
          console.log("usuario", user)
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
            console.log("done")
            return done(err);
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);


