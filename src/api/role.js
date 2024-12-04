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
      return await db('roles').insert({ name }).returning(['id', 'name']);
    },
  },
  read: {
    structure: {
      name: { mandatory: false, validators: [isString] },
      id: { mandatory: false, validators: [isNumber] },
    },
    controller: async ({ name, id }) => {
      const roles = db('roles').select(['id', 'name']);
      if (id !== undefined) return await roles.where({ id });
      if (name === undefined) return await roles;
      return await roles.whereILike('name', `%${name}%`);
    },
  },
});
