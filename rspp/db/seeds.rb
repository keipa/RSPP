# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Gallery.create(name: "Фотогалерея", type_gallery: "photo")
Gallery.create(name: "Видеогалерея", type_gallery: "video")
User.create(first_name: "Admin", last_name: "Admin", email: "admin@rspp.by", password: "123456789", role: "admin")
Topic.create([{text: "О РСПП", user_id: 1}, {text: "Сотрудничество", user_id: 1}, {text: "Международная деятельность", user_id: 1}, {text: "Законодательство", user_id: 1}, {text: "Аналитика", user_id: 1}])
