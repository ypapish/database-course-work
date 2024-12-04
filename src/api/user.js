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
    strcture: {
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
});
