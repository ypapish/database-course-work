# Проєктування бази даних

## Модель бізнес-об'єктів

@startuml
entity roles
entity roles.id #FFFFFF
entity roles.name #FFFFFF

roles.id --* roles 
roles.name --* roles 

entity users
entity users.id #FFFFFF 
entity users.roleId #FFFFFF
entity users.firstName #FFFFFF
entity users.secondName #FFFFFF
entity users.username #FFFFFF
entity users.password #FFFFFF
entity users.token #FFFFFF
entity users.createdAt #FFFFFF

users.id --* User 
users.roleId --* User 
users.firstName --* User 
users.username --* User
users.password --* User
users.token --* User
users.createdAt --* User

entity categories
entity categories.id #FFFFFF
entity categories.name #FFFFFF

categories.id --* categories
categories.name --* categories

entity mediaContents
entity mediaContents.id #FFFFFF
entity mediaContents.categoryId #FFFFFF
entity mediaContents.userId #FFFFFF
entity mediaContents.isActive #FFFFFF
entity mediaContents.createdAt #FFFFFF
entity mediaContents.updatedAt #FFFFFF
entity mediaContents.source #FFFFFF
entity mediaContents.description #FFFFFF

mediaContents.id --* mediaContents
mediaContents.categoryId --* mediaContents
mediaContents.userId --* mediaContents
mediaContents.isActive --* mediaContents
mediaContents.createdAt --* mediaContents
mediaContents.updatedAt --* mediaContents
mediaContents.source --* mediaContents
mediaContents.description --* mediaContents

users "0,*" -d- "1,1" roles
mediaContents "0,*" -d- "1,1" categories
mediaContents "0,*" -d- "1,1" sources
@enduml

## ER-модель

@startuml
entity "roles" {
    + id: bigint 
    + name: text
  }
 
entity "categories" {
    + id: bigint
    + name: text
  }
  
entity "users" {
    + id: bigint
    + roleId: bigint
    + firstName: varchar(64)
    + secondName: varchar(64)
    + username: varchar(64)
    + password: varchar(256)
    + token: varchar(128)
    + createdAt: timestamptz
  }

entity "mediaContents" {
    + id: bigint
    + categoryId: bigint
    + isActive: boolean  
    + createdAt: timestamptz
    + updatedAt: timestamptz 
    + description: text 
  }
  
    entity "sources" {
    + id: bigint
    + mediaId: bigint
    + createdAt: timestamptz
    + source: text
    + description: text
  }
  
users "0,*" -d- "1,1" roles
mediaContents "0,*" -d- "1,1" categories
mediaContents "0,*" -d- "1,1" sources

@enduml

## Реляційна схема

@startuml

entity "Roles" as roles {
  + id : bigint <<PK>>   -- Primary Key
  --
  * name : varchar(32)   -- Unique
}

entity "Users" as users {
  + id : bigint <<PK>>   -- Primary Key
  --
  * roleId : bigint <<FK>>   -- Foreign Key to Roles
  * firstName : varchar(64)
  * secondName : varchar(64)
  * username : varchar(64) <<AK>>  -- Unique
  * password : varchar(256)
  * token : varchar(128) <<AK>>  -- Unique
  * createdAt : timestamptz
}

entity "Categories" as categories {
  + id : bigint <<PK>>   -- Primary Key
  --
  * name : varchar(32)   -- Unique
}

entity "MediaContents" as media_contents {
  + id : bigint <<PK>>   -- Primary Key
  --
  * categoryId : bigint <<FK>>   -- Foreign Key to Categories
  * userId : bigint <<FK>>       -- Foreign Key to Users
  * isActive : boolean
  * createdAt : timestamptz
  * updatedAt : timestamptz
  * description : text
}

entity "Sources" as sources {
  + id : bigint <<PK>>   -- Primary Key
  --
  * mediaId : bigint <<FK>>   -- Foreign Key to MediaContents
  * createdAt : timestamptz
  * source : text
  * description : text
}

' Define relationships
roles ||--o{ users : "roleId"
categories ||--o{ media_contents : "categoryId"
users ||--o{ media_contents : "userId"
media_contents ||--o{ sources : "mediaId"
@enduml
