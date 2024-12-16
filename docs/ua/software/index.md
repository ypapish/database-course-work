# Реалізація інформаційного та програмного забезпечення

В рамках проєкту розробляється:

- [SQL-скрипт для створення на початкового наповнення бази даних](#sql-скрипт-для-створення-на-початкового-наповнення-бази-даних)
- [RESTful сервіс для управління даними](#restful-сервіс-для-управління-даними)

## **SQL-скрипт для створення на початкового наповнення бази даних**

```sql

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`roles` ;

CREATE TABLE IF NOT EXISTS `mydb`.`roles` (
  `id` BIGINT NOT NULL,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `roleId` BIGINT NOT NULL,
  `firstName` VARCHAR(64) NOT NULL,
  `secondName` VARCHAR(64) NOT NULL,
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `token` VARCHAR(128) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  `roles_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`, `roles_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE,
  INDEX `fk_users_roles1_idx` (`roles_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `mydb`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`categories` ;

CREATE TABLE IF NOT EXISTS `mydb`.`categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bame_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`mediaContent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`mediaContent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`mediaContent` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `isActive` TINYINT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  `updatedAt` TIMESTAMP NOT NULL,
  `description` TEXT NOT NULL,
  `users_id` BIGINT NOT NULL,
  `categories_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `categories_id`),
  INDEX `fk_mediaContent_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_mediaContent_categories1_idx` (`categories_id` ASC) VISIBLE,
  CONSTRAINT `fk_mediaContent_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mediaContent_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `mydb`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`sources`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`sources` ;

CREATE TABLE IF NOT EXISTS `mydb`.`sources` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `source` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `mediaContent_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`, `mediaContent_id`),
  INDEX `fk_cources_mediaContent_idx` (`mediaContent_id` ASC) VISIBLE,
  CONSTRAINT `fk_cources_mediaContent`
    FOREIGN KEY (`mediaContent_id`)
    REFERENCES `mydb`.`mediaContent` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mydb`.`roles`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`roles` (`id`, `name`) VALUES (1, 'Адмін');
INSERT INTO `mydb`.`roles` (`id`, `name`) VALUES (2, 'Користувач');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`users` (`id`, `roleId`, `firstName`, `secondName`, `username`, `password`, `token`, `createdAt`, `roles_id`) VALUES (2, 2, 'Олександр', 'Сидоренко', 'sidorenko', 'qwerty', 'token_0987654321', '2024-12-15 08:15:00', 2);
INSERT INTO `mydb`.`users` (`id`, `roleId`, `firstName`, `secondName`, `username`, `password`, `token`, `createdAt`, `roles_id`) VALUES (3, 2, 'Іван', 'Григоренко', 'ivan123', '1111', 'token_abcd', '2024-12-14 15:30:45', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`categories`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`categories` (`id`, `name`) VALUES (1, 'Книги');
INSERT INTO `mydb`.`categories` (`id`, `name`) VALUES (2, 'Фільми');
INSERT INTO `mydb`.`categories` (`id`, `name`) VALUES (3, 'Новини');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`mediaContent`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`mediaContent` (`id`, `isActive`, `createdAt`, `updatedAt`, `description`, `users_id`, `categories_id`) VALUES (1, True, '2023-12-13 10:00:00', '2024-12-13 10:00:00', 'Весела комедія', 3, 2);
INSERT INTO `mydb`.`mediaContent` (`id`, `isActive`, `createdAt`, `updatedAt`, `description`, `users_id`, `categories_id`) VALUES (2, True, '2023-12-01 10:00:23', '2024-10-13 11:21:00', 'Цікавий детектив', 2, 2);
INSERT INTO `mydb`.`mediaContent` (`id`, `isActive`, `createdAt`, `updatedAt`, `description`, `users_id`, `categories_id`) VALUES (3, False, '2023-12-13 11:45:23', '2024-10-13 15:12:54', 'Класична англійська література', 2, 1);
INSERT INTO `mydb`.`mediaContent` (`id`, `isActive`, `createdAt`, `updatedAt`, `description`, `users_id`, `categories_id`) VALUES (4, True, '2023-12-13 22:01:00', '2024-12-14 10:12:00', 'Новини за 14.12.2024', 3, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`sources`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`sources` (`id`, `source`, `description`, `mediaContent_id`) VALUES (1, 'https://www.channel/my/qwerty', 'Офіційний сайт телеканалу', 3);
INSERT INTO `mydb`.`sources` (`id`, `source`, `description`, `mediaContent_id`) VALUES (2, 'https://www.online_library.com.ua', 'Онлайн-бібліотека', 1);
INSERT INTO `mydb`.`sources` (`id`, `source`, `description`, `mediaContent_id`) VALUES (3, 'https://www.onlinecinema123', 'Онлайн-кінотеатр.', 2);
INSERT INTO `mydb`.`sources` (`id`, `source`, `description`, `mediaContent_id`) VALUES (4, 'https://www.english_literature.com', 'Сайт з англійською класичною літературою.', 2);

COMMIT;

```

## **RESTful сервіс для управління даними**

**main.py**

_Створюємо та налаштовуємо веб-додаток FastAPI, підключаємо маршрути й забезпечуємо синхронізацію структури бази даних із моделями._

```python
from fastapi import FastAPI
from database import engine, Base
from routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router)
```

**database.py**

_Налаштовуємо підключення до бази даних за допомогою SQLAlchemy, створюємо об'єкт двигуна для взаємодії з базою, сесію для керування транзакціями та базовий клас для визначення ORM-моделей._

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from config import DB_PASSWORD


SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://root:{DB_PASSWORD}@127.0.0.1:3306/mydb"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

**models.py**

_Визначаємо ORM-моделі для відображення структури бази даних у Python-класах. Це дозволяє працювати з базою даних на рівні об'єктів, забезпечуючи зручну взаємодію між Python-кодом та SQL-таблицями._

```python
from sqlalchemy import Column, BigInteger, Text, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.dialects.mysql import VARCHAR, TINYINT
from datetime import datetime

Base = declarative_base()


class Role(Base):
    __tablename__ = 'roles'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(32), nullable=False, unique=True)
    users = relationship("User", back_populates="role")


class User(Base):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    roleId = Column(BigInteger, ForeignKey('roles.id'), nullable=False)
    firstName = Column(VARCHAR(64), nullable=False)
    secondName = Column(VARCHAR(64), nullable=False)
    username = Column(VARCHAR(64), nullable=False, unique=True)
    password = Column(VARCHAR(256), nullable=False)
    token = Column(VARCHAR(128), nullable=False, unique=True)
    createdAt = Column(TIMESTAMP, default=datetime.utcnow)
    role = relationship("Role", back_populates="users")
    media_contents = relationship("MediaContent", back_populates="user")


class Category(Base):
    __tablename__ = 'categories'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(VARCHAR(32), nullable=False, unique=True)
    media_contents = relationship("MediaContent", back_populates="category")


class MediaContent(Base):
    __tablename__ = 'mediaContent'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    isActive = Column(TINYINT, nullable=False)
    createdAt = Column(TIMESTAMP, default=datetime.utcnow)
    updatedAt = Column(TIMESTAMP, default=datetime.utcnow)
    description = Column(Text, nullable=False)
    users_id = Column(BigInteger, ForeignKey('users.id'), nullable=False)
    categories_id = Column(BigInteger, ForeignKey('categories.id'), nullable=False)
    user = relationship("User", back_populates="media_contents")
    category = relationship("Category", back_populates="media_contents")
    sources = relationship("Source", back_populates="media_content")


class Source(Base):
    __tablename__ = 'sources'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    source = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    mediaContent_id = Column(BigInteger, ForeignKey('mediaContent.id'), nullable=False)
    media_content = relationship("MediaContent", back_populates="sources")
```

**schemas.py**

_Описуємо схеми Pydantic для валідації даних, які використовуються в запитах та відповідях._

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class RoleCreate(BaseModel):
    id: Optional[int] = None
    name: str


class RoleResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class RolePatch(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    firstName: str
    secondName: Optional[str] = None
    username: str
    password: str
    token: str
    createdAt: Optional[datetime] = None
    roleId: Optional[int] = None


class UserResponse(BaseModel):
    id: int
    firstName: str
    secondName: str
    username: str
    token: str
    createdAt: datetime
    roleId: int

    class Config:
        from_attributes = True


class UserPatch(BaseModel):
    id: Optional[int] = None
    firstName: Optional[str] = None
    secondName: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    token: Optional[str] = None


class CategoryCreate(BaseModel):
    id: Optional[int] = None
    name: str


class CategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class CategoryPatch(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None


class MediaContentCreate(BaseModel):
    id: Optional[int] = None
    isActive: bool
    description: Optional[str] = None
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    users_id: Optional[int] = None
    categories_id: Optional[int] = None


class MediaContentResponse(BaseModel):
    id: int
    isActive: bool
    description: str
    createdAt: datetime
    updatedAt: datetime
    users_id: int
    categories_id: int

    class Config:
        from_attributes = True


class MediaContentPatch(BaseModel):
    id: Optional[int] = None
    isActive: Optional[bool] = None
    description: Optional[str] = None
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    users_id: Optional[int] = None
    categories_id: Optional[int] = None


class SourceCreate(BaseModel):
    id: Optional[int] = None
    source: str
    description: Optional[str] = None
    mediaContent_id: Optional[int] = None


class SourceResponse(BaseModel):
    id: int
    source: str
    description: str
    mediaContent_id: int

    class Config:
        from_attributes = True


class SourcePatch(BaseModel):
    id: Optional[int] = None
    source: Optional[str] = None
    description: Optional[str] = None
    mediaContent_id: Optional[int] = None
```

**routes.py**

_Визначаємо маршрути для обробки CRUD-операцій в RESTful API, які працюють з моделями._

```python
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
from datetime import datetime
from models import Role, User, Category, MediaContent, Source
from schemas import (
    RoleCreate, RoleResponse, RolePatch, UserCreate, UserResponse, UserPatch, CategoryCreate, CategoryResponse, CategoryPatch,
    MediaContentCreate, MediaContentResponse, MediaContentPatch, SourceCreate, SourceResponse, SourcePatch
)
from database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_object_or_404(model, object_id: int, db: Session):
    obj = db.query(model).filter(model.id == object_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail=f"{model.__name__} not found")
    return obj


@router.post("/roles", response_model=RoleResponse)
async def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    try:
        db_role = Role(name=role.name)
        db.add(db_role)
        db.commit()
        db.refresh(db_role)
        return db_role
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Role already exists")


@router.get("/roles", response_model=List[RoleResponse])
async def read_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()


@router.get("/roles/{role_id}", response_model=RoleResponse)
async def read_role(role_id: int, db: Session = Depends(get_db)):
    db_role = get_object_or_404(Role, role_id, db)
    return db_role


@router.patch("/roles/{role_id}", response_model=RoleResponse)
async def update_role(role_id: int, role: RolePatch, db: Session = Depends(get_db)):
    db_role = get_object_or_404(Role, role_id, db)
    for key, value in role.dict(exclude_unset=True).items():
        setattr(db_role, key, value)
    db.commit()
    db.refresh(db_role)
    return db_role


@router.delete("/roles/{role_id}", response_model=RoleResponse)
async def delete_role(role_id: int, db: Session = Depends(get_db)):
    db_role = get_object_or_404(Role, role_id, db)
    db.delete(db_role)
    db.commit()
    return db_role


@router.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = User(**user.dict(), createdAt=datetime.utcnow())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Username already exists")


@router.get("/users", response_model=List[UserResponse])
async def read_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/users/{user_id}", response_model=UserResponse)
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_object_or_404(User, user_id, db)
    return db_user


@router.patch("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user: UserPatch, db: Session = Depends(get_db)):
    db_user = get_object_or_404(User, user_id, db)
    for key, value in user.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user



@router.delete("/users/{user_id}", response_model=UserResponse)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_object_or_404(User, user_id, db)
    db.delete(db_user)
    db.commit()
    return db_user


@router.post("/categories", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, db: Session = Depends(get_db)):
    try:
        db_category = Category(name=category.name)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Category already exists")


@router.get("/categories", response_model=List[CategoryResponse])
async def read_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()


@router.get("/categories/{category_id}", response_model=CategoryResponse)
async def read_category(category_id: int, db: Session = Depends(get_db)):
    db_category = get_object_or_404(Category, category_id, db)
    return db_category


@router.patch("/categories/{category_id}", response_model=CategoryResponse)
async def update_category(category_id: int, category: CategoryPatch, db: Session = Depends(get_db)):
    db_category = get_object_or_404(Category, category_id, db)
    db_category.name = category.name
    db.commit()
    db.refresh(db_category)
    return db_category


@router.delete("/categories/{category_id}", response_model=CategoryResponse)
async def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = get_object_or_404(Category, category_id, db)
    db.delete(db_category)
    db.commit()
    return db_category


@router.post("/mediaContent", response_model=MediaContentResponse)
async def create_media_content(media: MediaContentCreate, db: Session = Depends(get_db)):
    db_media = MediaContent(**media.dict(), createdAt=datetime.utcnow())
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media


@router.get("/mediaContent", response_model=List[MediaContentResponse])
async def read_media_contents(db: Session = Depends(get_db)):
    return db.query(MediaContent).all()


@router.patch("/mediaContent/{media_id}", response_model=MediaContentResponse)
async def update_media_content(media_id: int, media: MediaContentPatch, db: Session = Depends(get_db)):
    db_media = get_object_or_404(MediaContent, media_id, db)
    for key, value in media.dict(exclude_unset=True).items():
        setattr(db_media, key, value)
    db_media.updatedAt = datetime.utcnow()
    db.commit()
    db.refresh(db_media)
    return db_media


@router.delete("/mediaContent/{media_id}", response_model=MediaContentResponse)
async def delete_media_content(media_id: int, db: Session = Depends(get_db)):
    db_media = get_object_or_404(MediaContent, media_id, db)
    db.delete(db_media)
    db.commit()
    return db_media


@router.post("/sources", response_model=SourceResponse)
async def create_source(source: SourceCreate, db: Session = Depends(get_db)):
    db_source = Source(**source.dict())
    db.add(db_source)
    db.commit()
    db.refresh(db_source)
    return db_source


@router.get("/sources", response_model=List[SourceResponse])
async def read_sources(db: Session = Depends(get_db)):
    return db.query(Source).all()


@router.get("/sources/{source_id}", response_model=SourceResponse)
async def read_source(source_id: int, db: Session = Depends(get_db)):
    db_source = get_object_or_404(Source, source_id, db)
    return db_source


@router.patch("/sources/{source_id}", response_model=SourceResponse)
async def update_source(source_id: int, source: SourcePatch, db: Session = Depends(get_db)):
    db_source = get_object_or_404(Source, source_id, db)
    for key, value in source.dict(exclude_unset=True).items():
        setattr(db_source, key, value)
    db.commit()
    db.refresh(db_source)
    return db_source
```
