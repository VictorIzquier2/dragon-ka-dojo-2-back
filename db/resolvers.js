const User = require('../models/User');
const Master = require('../models/Master');
const Civilian = require('../models/Civilian');
const Sensei = require('../models/Sensei');
const Karateka = require('../models/Karateka');
const bcryptjs = require('bcryptjs');
require('dotenv').config({path: '.env'});
const jwt = require('jsonwebtoken');

const crearToken = (usuario, secreta, expiresIn)  => {
  console.log(usuario);
  const {id, email, username, expire} = usuario;
  return jwt.sign({id, email, username, expire}, secreta, {expiresIn})
}

// Resolvers
const resolvers = {
  Query: {
    getUser: async (_, {token}) => {
      const usuarioId = await jwt.verify(token, process.env.SECRETA)
      console.log(usuarioId);
      return usuarioId;
    },

    getNumberOfKaratekas: async (_, {}, ctx) => {
      try{
        const numberOfKaratekas = await (await Karateka.find({owner: ctx.user.id})).length;
        return(numberOfKaratekas);
      }catch(err){
        console.log(err);
      }
    },

    getNumberOfCivilians: async (_, {}) => {
      const numberOfCivilians = await Civilian.countDocuments();
      return numberOfCivilians;
    },

    getNumberOfMasters: async (_, {}) => {
      const numberOfMasters = await Master.countDocuments();
      return numberOfMasters;
    }

  },

  Mutation: {
    newUser: async (_, {input}) => {
      console.log(input);
      const {username, email, password} = input;

      // Revisar si el usuario ya está registrado
      const existeUsuario = await User.findOne({username: username});
      if(!existeUsuario){
        console.log(existeUsuario);
        // Revisar si el email ya está siendo utilizado
        const existeMail = await User.findOne({email: email});
        if(!existeMail){
          // Hashear el password
          const salt = await bcryptjs.genSalt(10);
          input.password = await bcryptjs.hash(password, salt)
          
          try{
            // Guardar en la base de datos
            const user = new User(input);
            console.log(user);
            user.save(); // guardarlo

            try{
              // Generar aleatoriamente un maestro
              const randomMaster = () =>{
                const randomGenre = () => {
                  const genreList = ['male', 'female'];
                  return genreList[Math.round(Math.random())];
                };
  
                const genreResult = randomGenre();
                
                const randomName = (genre) =>{
                  const randomMaleName = () => {
                    const nameList = ['Davian', 'Sterling', 'Turner', 'Felipe', 'Rodrik', 'Rick', 'Jacob', 'Danny', 'August', 'Keon', 'Cannon', 'Wyatt', 'Manuel', 'Troy', 'Darek', 'Riley', 'Jason', 'Jeff', 'Michael', 'Luciano'];
                    return nameList[Math.round(Math.random() * (nameList.length))];
                  };
                  const randomFemaleName = () => {
                    const nameList = ['Grace', 'Janiah', 'Angeline', 'Krystal', 'Anaya', 'Janet', 'Kristin', 'Scarlet', 'Macie', 'Simone', 'Anahi', 'Carly', 'Sophie', 'Amani', 'Camila', 'Gloria', 'Natty', 'Raegan', 'Valerie', 'Shyanne'];
                    return nameList[Math.round(Math.random() * (nameList.length))];
                  };
                  if(genre == 'male'){
                    return randomMaleName();
                  }else {
                    return randomFemaleName();
                  }
                }
  
                const randomSolvency = () => {
                  const solvencyList = ['insolvent', 'solvent', 'wealthy'];
                  return solvencyList[Math.round(Math.random() * (solvencyList.length))];
                };
  
                const randomNature = () => {
                  const natureList = ['peaceful', 'wroth'];
                  return natureList[Math.round(Math.random())];
                };
  
                
                const randomLevel = () => {
                  const levelList = ['red', 'blue', 'green', 'brown', 'black'];
                  return levelList[Math.round(Math.random() * (levelList.length))];
                }
                const randomSkill = () => {
                  return Math.ceil(Math.random() * 5);
                }
                const randomMana = () => {
                  return Math.ceil(Math.random() * 10);
                }
                const randomStanding = () => {
                  return Math.floor(Math.random() * (81 - 30 ) + 30);
                }
                
                const randomUrl = (genre) => {
                  if(genre == 'male'){
                    const maleUrlList = ['/images/male1.jpg', '/images/male2.jpg', '/images/male3.jpg', '/images/male4.jpg']
                    return maleUrlList[Math.round(Math.random() * (maleUrlList.length))];
                  }else {
                    const femaleUrlList = ['/images/female1.jpg', '/images/female2.jpg', '/images/female3.jpg', '/images/female4.jpg']
                    return femaleUrlList[Math.round(Math.random() * (femaleUrlList.length))];
                  }
                }
  
                const newMaster = new Master({
                  name: randomName(genreResult),
                  genre: genreResult,
                  solvency: randomSolvency(),
                  nature: randomNature(),
                  level: randomLevel(),
                  strength: randomSkill(),
                  dexterity: randomSkill(),
                  stamina: randomSkill(),
                  mana: randomMana(),
                  standing: randomStanding(),
                  imageUrl: randomUrl(genreResult)
                })
                return newMaster;
              }
  
              const master = new Master(randomMaster());
              master.save(); // guardarlo
              
              try{
                const randomCivilian = () =>{
                  const randomGenre = () => {
                    const genreList = ['male', 'female'];
                    return genreList[Math.round(Math.random())];
                  };
    
                  const genreResult = randomGenre();
                  
                  const randomName = (genre) =>{
                    const randomMaleName = () => {
                      const nameList = ['Davian', 'Sterling', 'Turner', 'Felipe', 'Rodrik', 'Rick', 'Jacob', 'Danny', 'August', 'Keon', 'Cannon', 'Wyatt', 'Manuel', 'Troy', 'Darek', 'Riley', 'Jason', 'Jeff', 'Michael', 'Luciano'];
                      return nameList[Math.round(Math.random() * (nameList.length))];
                    };
                    const randomFemaleName = () => {
                      const nameList = ['Grace', 'Janiah', 'Angeline', 'Krystal', 'Anaya', 'Janet', 'Kristin', 'Scarlet', 'Macie', 'Simone', 'Anahi', 'Carly', 'Sophie', 'Amani', 'Camila', 'Gloria', 'Natty', 'Raegan', 'Valerie', 'Shyanne'];
                      return nameList[Math.round(Math.random() * (nameList.length))];
                    };
                    if(genre == 'male'){
                      return randomMaleName();
                    }else {
                      return randomFemaleName();
                    }
                  }
    
                  const randomSolvency = () => {
                    const solvencyList = ['insolvent', 'solvent', 'wealthy'];
                    return solvencyList[Math.round(Math.random() * (solvencyList.length))];
                  };
    
                  const randomNature = () => {
                    const natureList = ['peaceful', 'wroth'];
                    return natureList[Math.round(Math.random())];
                  };
    
                  const randomUrl = (genre) => {
                    if(genre == 'male'){
                      return '/images/male.jpg';
                    }else {
                      return '/images/female.jpg';
                    }
                  }
                  
                  const newCiv = new Civilian({
                    name: randomName(genreResult),
                    genre: genreResult,
                    solvency: randomSolvency(),
                    nature: randomNature(),
                    imageUrl: randomUrl(genreResult)
                  })
                  return newCiv;
                }
    
                const civAtStart = () => Civilian.create(randomCivilian());
                  Promise.all([civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart(), civAtStart()])

                return user;
              }catch(err){
                throw new Error('Error al crear nuevos ciudadanos', err);
              }
            }catch(err){
              throw new Error('Error al crear un nuevo maestro', err);
            }
          }catch(err){
            throw new Error('Error al crear el nuevo usuario', err);
          }
        }else{
          throw new Error('Ese email de usuario ya existe. Trata de hacer Log In')          
        }
      }else{
        throw new Error('Ese nombre de usuario ya existe. Usa otro para registrarte')
      }
    },

    authUser: async (_, {input}) => {
      const {email, password} = input
      
      // Si el usuario existe
      const existeUsuario = await User.findOne({email});
      if(!existeUsuario){
        throw new Error('Usuario no encontrado');
      }
      
      // Revisar si el password es correcto
      const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
      if(!passwordCorrecto){
        throw new Error('La contraseña es incorrecta');
      }
      await User.findOneAndUpdate({expire: Date.now()})
      // Crear token
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, '24h')
      }
    },

    newSensei: async (_, {input}, ctx) => {
      const user = await User.findOne({_id: ctx.user.id});
      
      console.log(user);
      console.log(user._id);
      
      const senseiExiste = await Sensei.findOne({owner: user.id})
      if(!senseiExiste){
        const master = await Master.findOne();
        try{
          const sensei = () => {
            name = master.name;
            genre = master.genre;
            solvency = master.solvency;
            nature = master.nature;
            level = master.level;
            strength = master.strength;
            dexterity = master.dexterity;
            stamina = master.stamina;
            mana = master.mana;
            standing = master.standing;
            imageUrl = master.imageUrl;
            owner = user._id
            
            const newSensei = new Sensei({
              name: name,
              genre: genre,
              solvency: solvency,
              nature: nature,
              level: level,
              strength: strength,
              dexterity: dexterity,
              stamina: stamina,
              mana: mana,
              standing: standing,
              imageUrl: imageUrl,
              owner: owner
            })
            return newSensei;            
          }
          const {name, genre, solvency, nature, level, strength, dexterity, stamina, mana, standing, imageUrl, owner} = input;
          
          const recruitedSensei = new Sensei(sensei());
          const resultado = await recruitedSensei.save();
          try{
            await User.updateOne({_id: user.id}, {$push: {sensei: newSensei}})
            try{
              await Master.deleteOne({_id: master._id})
              try{
                await Master.countDocuments();
                return resultado;
              }catch(err){
                throw new Error('Error upgrade number of masters');
              }
            }catch(err){
              throw new Error('Error deleting master', err);
            }
          }catch(err){
            throw new Error('Error updating user', err);
          }
        }catch(err){
         throw new Error('Error creating Sensei', err) 
        }
      }else{
        throw new Error('You can only recruit one sensei');
      }
    }
  }
}
module.exports = resolvers;