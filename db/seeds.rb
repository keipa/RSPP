# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Gallery.create(name: 'Фотогалерея', type_gallery: 'photo', smart_id: 'photos', link: '/galleries/photos')
Gallery.create(name: 'Видеогалерея', type_gallery: 'video', smart_id: 'videos', link: '/galleries/videos')
User.create(first_name: 'Admin', last_name: 'Admin', email: 'admin@rspp.by', password: '123456789')
Topic.create([{ text: 'О РСПП', user_id: 1, smart_id: "orspp", link: "/topics/orspp" },
	{ text: 'Сотрудничество', user_id: 1, smart_id: "sotrudnichestvo", link: "/topics/sotrudnichestvo" },
	{ text: 'Пресс-центр', user_id: 1, smart_id: "presscentr", link: "/topics/presscentr" },
	{ text: 'Законодательство', user_id: 1, smart_id: "zakonodatelstvo", link: "/topics/zakonodatelstvo" },
	{ text: 'Аналитика', user_id: 1, smart_id: "analitics", link: "/topics/analitics" },
	{ text: 'Галереи', user_id: 1, smart_id: 'galleries', link: '/galleries'}])
Topic.find_by('smart_id' => 'galleries').subtopics.create({
		text: 'Фотогалерея', user_id: 1, smart_id: 'photos', link: '/galleries/photos'
})
Topic.find_by('smart_id' => 'galleries').subtopics.create({
		text: 'Видеогалерея',user_id: 1, smart_id: 'videos', link: '/galleries/videos'
})
