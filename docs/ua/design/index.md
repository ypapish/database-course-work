# Проєктування бази даних

## Модель бізнес-об'єктів

@startuml

entity User
entity User.username #FFFFFF 
entity User.password #FFFFFF
entity User.email #FFFFFF
entity User.id #FFFFFF
entity User.role #FFFFFF

User.username --* User 
User.password --* User 
User.email --* User 
User.id --* User
User.role --* User

entity Source
entity Source.id #FFFFFF
entity Source.url #FFFFFF
entity Source.name #FFFFFF

Source.id *-- Source
Source.url --* Source
Source.name --* Source

entity Category
entity Category.id #FFFFFF
entity Category.name #FFFFFF

Category.id --* Category
Category.name --* Category

entity MediaContent
entity MediaContent.id #FFFFFF
entity MediaContent.name #FFFFFF
entity MediaContent.category #FFFFFF
entity MediaContent.sources #FFFFFF
entity MediaContent.created_at #FFFFFF
entity MediaContent.updated_at #FFFFFF

MediaContent.id --* MediaContent
MediaContent.name --* MediaContent
MediaContent.category --* MediaContent
MediaContent.sources --* MediaContent
MediaContent.created_at --* MediaContent
MediaContent.updated_at --* MediaContent

entity Role
entity Role.id #FFFFFF
entity Role.name #FFFFFF

Role.id --* Role
Role.name --* Role

User -d- Role 
MediaContent -d- Category
MediaContent -d- Source

@enduml