const fields = ['id', 'name'];

({
  create: {
    structure: {
      name: {
        mandatory: true,
        validators: [isString, (str) => str.length >= 3],
      },
    },
    controller: async ({ name }) => {
      const exists = await db('roles').where({ name }).first();
      if (exists) throw new Error('Role with such name already exists');
      return await db('roles').insert({ name }).returning(fields);
    },
  },
  read: {
    structure: {
      name: { mandatory: false, validators: [isString] },
      id: { mandatory: false, validators: [isNumber] },
    },
    controller: async ({ name, id }) => {
      const roles = db('roles').select(fields);
      if (id !== undefined) return await roles.where({ id });
      if (name === undefined) return await roles;
      return await roles.whereILike('name', `%${name}%`);
    },
  },
  update: {
    structure: {
      name: {
        mandatory: true,
        validators: [isString, (str) => str.length >= 3],
      },
      id: { mandatory: true, validators: [isNumber] },
    },
    controller: async ({ name, id }) => {
      const role = await db('roles').select(fields).where({ id }).first();
      if (!role) throw new Error(`Role with id ${id} does not exist`);
      return await db('roles').update({ name }).returning(fields);
    },
  },
  delete: {
    structure: { id: { mandatory: true, validators: [isNumber] } },
    controller: async ({ id }) => {
      const role = await db('roles').select(fields).where({ id }).first();
      if (!role) throw new Error(`Role with id ${id} does not exist`);
      await db('roles').where({ id }).delete();
    },
  },
});
