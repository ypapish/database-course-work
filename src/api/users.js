const checkLength = (length) => (str) => str.length > length;

const fields = [
  'id',
  'roleId',
  'username',
  'firstName',
  'secondName',
  'createdAt',
];

({
  create: {
    structure: {
      roleId: {
        mandatory: true,
        validators: [isNumber],
        refers: { table: 'roles', column: 'id', exists: true },
      },
      firstName: { mandatory: true, validators: [isString, checkLength(1)] },
      secondName: { mandatory: true, validators: [isString, checkLength(1)] },
      username: {
        mandatory: true,
        validators: [isString, checkLength(1)],
        refers: { table: 'users', column: 'username', exists: false },
      },
      password: { mandatory: true, validators: [isString, checkLength(7)] },
    },
    controller: async (body) => {
      const token = common.generateToken();
      const password = await common.hashPassword(body.password);
      const data = { ...body, password, token };
      return await db('users').insert(data).returning(fields);
    },
  },

  read: {
    structure: {
      username: { mandatory: false, validators: [isString] },
      firstName: { mandatory: false, validators: [isString] },
      secondName: { mandatory: false, validators: [isString] },
      id: { mandatory: false, validators: [isNumber] },
    },
    controller: async (body) => {
      const query = db('users').select(fields);
      if ('id' in body) return await query.where({ id: body.id });
      for (const [key, value] of Object.entries(body)) {
        if (value) query.orWhereILike(key, `%${value}%`);
      }
      return await query;
    },
  },

  update: {
    structure: {
      roleId: {
        mandatory: true,
        validators: [isNumber],
        refers: { table: 'roles', column: 'id', exists: true },
      },
      firstName: { mandatory: true, validators: [isString, checkLength(1)] },
      secondName: { mandatory: true, validators: [isString, checkLength(1)] },
      username: {
        mandatory: true,
        validators: [isString, checkLength(1)],
        refers: { table: 'users', column: 'username', exists: false },
      },
      password: { mandatory: true, validators: [isString, checkLength(7)] },
      id: {
        mandatory: false,
        validators: [isNumber],
        refers: { table: 'users', column: 'id', exists: true },
      },
    },
    controller: async ({ id, ...data }) => {
      if ('password' in data) {
        data.password = common.hashPassword(data.password);
      }
      return await db('users').where({ id }).update(data).returning(fields);
    },
  },

  delete: {
    structure: {
      id: {
        mandatory: true,
        validators: [isNumber],
        refers: { table: 'users', column: 'id', exists: true },
      }
    },
    controller: async ({ id }) => (
      void await db('userd').where({ id }).delete()
    )
  }
});
