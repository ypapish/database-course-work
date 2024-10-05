# Модель прецедентів

## 1. Діаграма прецедентів

@startuml
  actor "Користувач" as user
  actor "Адміністратор" as admin

  usecase "<b>Create Category</b>\nСтворити категорію ресурсу" as UC_1
  usecase "<b>Analyze Sentiment</b>\nПроаналізувати ресурси для отримання тональності контенту" as UC_2
  usecase "<b>Add Resource</b>\nДодати ресурс для аналізу даних" as UC_3
  usecase "<b>Update Resource</b>\nЗмінити відомості про ресурс аналізу даних" as UC_4
  usecase "<b>Delete Resource</b>\nВидалити ресурс аналізу даних" as UC_5
  usecase "<b>Get Data</b>\nОтрмати проаналізовану інформацію" as UC_6

  user -u-> UC_2
  user -u-> UC_6
  admin -u-|> user

  admin -u-> UC_1
  admin -u-> UC_3
  admin -u-> UC_4
  admin -u-> UC_5
@enduml
