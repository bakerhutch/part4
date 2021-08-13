//Let's see if any errors arise from that weird o
const bcrypt = require('bcrypt');

const initialUsers = [
  {
    name: 'Eragon Bromsson',
    username: 'humanelf',
    password: 'dragonz'
  },
  {
    name: 'Saphira Bjartskular',
    username: 'sapphire',
    password: 'bighungrydog'
  },
  {
    name: 'Arya Dröttningu',
    username: 'travelelf',
    password: 'Strengthof100years'
  },
  {
    name: 'Murtagh Morzansson',
    username: 'leftovers',
    password: 'pickedlast'
  },
  {
    name: 'Galbatorix',
    username: 'bigking',
    password: 'insecure'
  }
];

const validUser = {
  name: 'Orik Thrifksson',
  username: 'grimstborith',
  password: 'kingdwarf'
};

const invalidUsers = [
  {
    name: 'Invalid Username',
    username: 'leftovers',
    password: 'kingdwarf'
  },
  {
    name: 'Invalid password',
    username: 'bball',
    password: 'kd'
  },
  {
    name: 'Not Unique Username',
    username: 'gr',
    password: 'dwarfking'
  }
];

//saltRounds=10
const hashedUsers = [
  {
    name: 'Eragon Bromsson',
    username: 'humanelf',
    passwordHash: '$2b$10$IX8f8JLlIgOQN26qkF/Eyu3.TzUBZKVS5fzjeRT9WHD1aZ0a9009K'
  },
  {
    name: 'Saphira Bjartskular',
    username: 'sapphire',
    passwordHash: '$2b$10$T3AkboTCAA.qMRav4T2T8euH6hXgzW3EC1Y.7qLaekCE7sGqxR1Fm'
  },
  {
    name: 'Arya Dröttningu',
    username: 'travelelf',
    passwordHash: '$2b$10$pKkBSL5bFWUnVReE71Zi8u0fstTY0SN8P69O/aJJlRWwB2u4b6KrS'
  },
  {
    name: 'Murtagh Morzansson',
    username: 'leftovers',
    passwordHash: '$2b$10$TMDesIcF4ALyRLym3nWjn.Djsy5ZIBCKxh5k6c5QZ/u.MataZ06/C'
  },
  {
    name: 'Galbatorix',
    username: 'bigking',
    passwordHash: '$2b$10$kz7gbnFP1A1eizaDUqv3OuXf/uNwCX9WEDEVBX0nh0wlHJF81sg46'
  }
];

const createHashedUsers = async () => {
  let list = initialUsers;
  const saltRounds = 10;
  for (const [i] of initialUsers.entries()) {
    list[i].passwordHash = await bcrypt.hash(initialUsers[i].password, saltRounds);
    delete list[i].password;
  }
  //console.log(list);
  return list;
};

module.exports = {initialUsers, validUser, invalidUsers, hashedUsers, createHashedUsers};