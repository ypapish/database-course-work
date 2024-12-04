const fields = ['id', 'name'];

({
  create: {
    structure: {
      name: {
        mandatory: true,
        validators: [isString, (str) => str.length >= 3],
        refers: { table: 'roles', column: 'name', exists: false }
      },
    },
    controller: async ({ name }) => (
      await db('roles').insert({ name }).returning(fields)
    ),
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
      id: {
        mandatory: true,
        validators: [isNumber],
        refers: { table: 'roles', column: 'id', exists: true },
      }
    },
    controller: async ({ name, id }) => (
      await db('roles').where({ id }).update({ name }).returning(fields)
    ),
  },

  delete: {
    structure: {
      id: {
        mandatory: true,
        validators: [isNumber],
        refers: { table: 'roles', column: 'id', exists: true },
      }
    },
    controller: async ({ id }) => void await db('roles').where({ id }).delete()
  },
});
