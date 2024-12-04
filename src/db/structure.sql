
create table "roles" (
  "id"   bigint generated always as identity,
  "name" varchar(32) not null
);

alter table "roles" add constraint "pkRoles" primary key ("id");
alter table "roles" add constraint "rolesChecks" check (length("name") >= 3);
create unique index "akRolesName" on "roles" ("name");

create table "users" (
  "id"         bigint generated always as identity,
  "roleId"     bigint not null,
  "firstName"  varchar(64) not null,
  "secondName" varchar(64) not null,
  "username"   varchar(64) not null,
  "password"   varchar(256) not null,
  "token"      varchar(128) not null,
  "createdAt"  timestamptz default current_timestamp
);

alter table "users" add constraint "pkUsers" primary key ("id");
alter table "users" add constraint "fkUsersRolesId" foreign key ("roleId") references "roles" ("id");
alter table "users" add constraint "usersChecks" check (length("firstName") >= 2 and length("secondName") >= 2 and length("username") >= 2);
create unique index "akUsersUsername" on "users" ("username");
create unique index "akUsersToken" on "users" ("token");
create index "akUsersName" on "users" ("firstName", "secondName");

create table "categories" (
  "id"   bigint generated always as identity,
  "name" varchar(32) not null
);

alter table "categories" add constraint "pkCategories" primary key ("id");
alter table "categories" add constraint "categoriesChecks" check (length("name") >= 2);
create unique index "akCategoriesName" on "categories" ("name");

create table "mediaContents" (
  "id"          bigint generated always as identity,
  "categoryId"  bigint not null,
  "userId"      bigint not null,
  "isActive"    boolean default true,
  "createdAt"   timestamptz default current_timestamp,
  "updatedAt"   timestamptz,
  "description" text
);

alter table "mediaContents" add constraint "pkMediaContent" primary key ("id");
alter table "mediaContents" add constraint "fkMediaContentsCategoryId" foreign key ("categoryId") references "categories" ("id");
alter table "mediaContents" add constraint "fkMediaContentUserId" foreign key ("userId") references "users" ("id");
create index "akMediaContentsCategoryId" on "mediaContents" ("categoryId");
create index "akMediaContentsUserId" on "mediaContents" ("userId");

create table "sources" (
  "id"          bigint generated always as identity,
  "mediaId"     bigint not null,
  "createdAt"   timestamptz default current_timestamp,
  "source"      text,
  "description" text
);

alter table "sources" add constraint "pkSources" primary key ("id");
alter table "sources" add constraint "fkSourcesMediaId" foreign key ("mediaId") references "mediaContents" ("id");
